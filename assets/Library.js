// Copyright 2019 Eric Michael Veilleux - Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
var clone = o => JSON.parse(JSON.stringify(o));

function parseNums(num1pre, num2pre, mode) {
 if (["string", "object"].indexOf(typeof num1pre) == -1) throw new TypeError("The first number wasn't a string (or object). It has to be a string (or object). Note that an object input is ment to submit a pre-parsed number.");
 if (["string", "object"].indexOf(typeof num2pre) == -1) throw new TypeError("The second number wasn't a string (or object). It has to be a string (or object). Note that an object input is ment to submit a pre-parsed number.");
 if (typeof mode != "number" || [1, 2, 3, 4, 5].indexOf(mode) == -1) throw new TypeError("The mode must be a number from 1-5.");
 var num1 = num1pre,
  num2 = num2pre,
  skip = false,
  stringMode1 = true,
  stringMode2 = true,
  neg = [false, false, false],
  decimal = 0,
  decimal1 = 0,
  decimal2 = 0,
  num1pos, num2pos, maxChar, numl;
 if (num1.num != undefined) neg[1] = num1pre.isNeg, decimal1 = num1pre.decimals, num1 = num1pre.num, stringMode1 = false;
 if (num2.num != undefined) neg[2] = num2pre.isNeg, decimal2 = num2pre.decimals, num2 = num2pre.num, stringMode2 = false;
 if (stringMode1 && num1.split("-").length == 2) num1 = num1.split("-")[1], neg[1] = true;
 if (stringMode2 && num2.split("-").length == 2) num2 = num2.split("-")[1], neg[2] = true;
 if (neg[1] != neg[2] && mode != 1 && mode != 2) neg[0] = true;
 if (stringMode1) num1 = num1.split('').filter(w => w != ",");
 if (stringMode2) num2 = num2.split('').filter(w => w != ",");
 num1pos = num1.indexOf("."), decimal1 = num1pos != -1 ? num1.filter(w => w != ".").length - num1pos : 0, num2pos = num2.indexOf("."), decimal2 = num2pos != -1 ? num2.filter(w => w != ".").length - num2pos : 0, decimal = mode == 1 || mode == 2 ? Math.max(decimal1, decimal2) : mode == 3 ? decimal1 + decimal2 : decimal1 - decimal2, maxChar = Math.max(num1.length, num2.length);
 if (decimal < 0) decimal = 0;
 for (var i = 0; !skip && ((neg[1] || neg[2]) && mode == 1) && num2.length == maxChar && i < num1.length; i++)
  if (+num2[i] > +num1[i]) neg[0] = true, skip = true;
 for (var i = 0; !skip && mode == 2 && num2.length == maxChar && i < num1.length; i++) {
  if (num1[i] < num2[i]) neg[0] = true, skip = true;
  else skip = !(num2[i] == num1[i]);
 }
 if (num2.length == maxChar && num2.length != maxChar) neg[0] = true;
 if (maxChar == num2.length && mode == 3) num1 = [num2, num2 = num1][0]
 if (decimal1 != decimal2 && [1, 2].indexOf(mode) > -1) {
  if (decimal1 == decimal)
   for (var i = 0; i < decimal1 - decimal2; i++) num2.push("0");
  else if (decimal2 == decimal)
   for (var i = 0; i < decimal2 - decimal1; i++) num1.push("0");
 }
 if (num1.length != num2.length && [1, 2].indexOf(mode) > -1) {
  numl = [num1.length, num2.length];
  if (maxChar == numl[0])
   for (var i = 0; i < numl[0] - numl[1]; i++) num2.unshift("0");
  else if (maxChar != num1[0])
   for (var i = 0; i < numl[1] - numl[0]; i++) num1.unshift("0");
 }
 if (mode == 3 && neg.every(e => (e == true))) neg[0] = false;
 return {
  num1: {
   num: num1,
   isNeg: neg[1],
   decimals: decimal1
  },
  num2: {
   num: num2,
   isNeg: neg[2],
   decimals: decimal2
  },
  isNeg: neg[0],
  maxChar: maxChar,
  decimals: decimal
 };
}

function formatNums(final, decimals, neg) {
 if (typeof final == "string") {
  if (decimals > 0) {
   final = final.split("");
   final.splice(final.length - decimals, 0, ".");
   final = final.join("");
  }
 } else if (typeof final == "object") {
  if (decimals > 0) {
   final = final.reverse();
   final.splice(final.length - decimals, 0, ".");
   final = final.join("");
  } else final = final.reverse().join("");
 }
 final = neg[0] ? "-" + final : final;
 final = ["", ".", "-"].indexOf(final) > -1 ? "0" : final;
 return final;
}

function add() {
 function tempadd(num1, num2) {
  var parsedNums = parseNums(num1, num2, 1),
   neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
   maxChar = parsedNums.maxChar,
   decimal = [parsedNums.decimals, parsedNums.num1.decimals, parsedNums.num2.decimals],
   num1 = parsedNums.num1.num,
   num2 = parsedNums.num2.num,
   time, final = [],
   carry = "0",
   finali;
  if (neg[2]) return sub(parsedNums.num1, {
   num: num2,
   isNeg: false,
   decimals: decimal[1]
  });
  else if (neg[1]) return sub(parsedNums.num2, {
   num: num1,
   isNeg: false,
   decimals: decimal[2]
  });
  for (var i = maxChar - 1; i >= 0; i--) {
   finali = maxChar - i - 1;
   if (time != i + 1) carry = "0";
   final[finali] = String(+num1[i] + (+num2[i]) + (+carry));
   if (+final[finali] > 9) {
    var temp = final[finali].split('');
    final[finali] = temp[1], carry = temp[0], time = i;
    if (i - 1 < 0) final.push(carry);
   }
  }
  return formatNums(final, decimal[0], neg);
 }
 var permfinal, a = clone(arguments);
 if (Array.isArray(a[0])) a = a[0];
 permfinal = tempadd(a[0], a[1]);
 for (var i = 2; i < a.length; i++) permfinal = tempadd(permfinal, a[i]);
 return permfinal;
}

function sub() {
 function tempsub(num1pre, num2pre) {
  var parsedNums = parseNums(num1pre, num2pre, 2),
   neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
   maxChar = parsedNums.maxChar,
   decimal = [parsedNums.decimals, parsedNums.num1.decimals, parsedNums.num2.decimals],
   num1 = parsedNums.num1.num,
   num2 = parsedNums.num2.num,
   final = [],
   finali, fans;
  if (neg.indexOf(true) > -1) {
   if (neg[0] && !neg[1] && !neg[2]) num1 = [num2, num2 = num1][0];
   else if (neg[1] && neg[2]) num1 = [num2, num2 = num1][0];
   else if (neg[2] && !neg[1]) return add(parsedNums.num1, {
    num: num2,
    isNeg: false,
    decimals: decimal[2]
   });
   else if (neg[1] && !neg[2]) return "-" + add({
    num: num1,
    isNeg: false,
    decimals: decimal[1]
   }, parsedNums.num2);
  }
  for (var i = maxChar - 1; i >= 0; i--) {
   finali = maxChar - i - 1, fans = num1[i] - num2[i];
   if (fans < 0 && i != 0) {
    var j = i - 1;
    final[finali] = String(fans + 10), num1[j] = String(num1[j] - 1);
    while (num1[j] < 0 && j != 0) num1[j] = String((+num1[j]) + 10), j = j - 1, num1[j] = String(num1[j] - 1);
   } else if (fans < 0 && i == 0) final[finali] = String(fans).split("-")[1];
   else final[finali] = fans;
  }
  return formatNums(final, decimal[0], neg);
 }
 var permfinal, a = clone(arguments);
 if (Array.isArray(a[0])) a = a[0];
 permfinal = tempsub(a[0], a[1]);
 for (var i = 2; i < a.length; i++) permfinal = tempsub(permfinal, a[i]);
 return permfinal;
}

function isLessThan() {
 function templessthan(num1, num2) {
  var num = sub(num2, num1);
  if (num.split("-").length == 1 && num != 0) return true;
  return false;
 }
 var permfinal, a = clone(arguments);
 if (Array.isArray(a[0])) a = a[0];
 permfinal = templessthan(a[0], a[1]);
 for (var i = 2; i < a.length; i++) permfinal = templessthan(permfinal, a[i]);
 return permfinal;
}

function isGreaterThan() {
 function tempgreaterthan(num1, num2) {
  var num = sub(num1, num2);
  if (num.split("-").length == 1 && num != 0) return true;
  return false;
 }
 var permfinal, a = clone(arguments);
 if (Array.isArray(a[0])) a = a[0];
 permfinal = tempgreaterthan(a[0], a[1]);
 for (var i = 2; i < a.length; i++) permfinal = tempgreaterthan(permfinal, a[i]);
 return permfinal;
}

function isLessThanEqual() {
 function templessthanequal(num1, num2) {
  if (sub(num2, num1).split("-").length == 1) return true;
  return false;
 }
 var permfinal, a = clone(arguments);
 if (Array.isArray(a[0])) a = a[0];
 permfinal = templessthanequal(a[0], a[1]);
 for (var i = 2; i < a.length; i++) permfinal = templessthanequal(permfinal, a[i]);
 return permfinal;
}

function isGreaterThanEqual() {
 function tempisgreaterthanequal(num1, num2) {
  if (sub(num1, num2).split("-").length == 1) return true;
  return false;
 }
 var permfinal, a = clone(arguments);
 if (Array.isArray(a[0])) a = a[0];
 permfinal = tempisgreaterthanequal(a[0], a[1]);
 for (var i = 2; i < a.length; i++) permfinal = tempisgreaterthanequal(permfinal, a[i]);
 return permfinal;
}

function round(num) {
 num = num.split("."), num[1] = num[1].split("");
 if (isGreaterThanEqual(num[1][0], {
   num: ["5"],
   isNeg: false,
   decimals: 0
  })) return add(num[0], {
  num: ["1"],
  isNeg: false,
  decimals: 0
 });
 return num[0];
}

function roundDown(num) {
 return num.split(".")[0];
}

function roundUp(num) {
 return add(num.split(".")[0], {
  num: ["1"],
  isNeg: false,
  decimals: 0
 });
}

function multi() {
 function tempmulti(num1pre, num2pre) {
  var parsedNums = parseNums(num1pre, num2pre, 3),
   neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
   final = "",
   decimals = parsedNums.decimals,
   numArray = [],
   num2 = parsedNums.num2,
   num1 = parsedNums.num1;
  if (num2.num.length == 1 && num2.num[0] == "1") return formatNums(num2.num, decimals, neg);
  else if (num2.length == 1 && num2[0] == "0") return "1";
  else {
   final = add(num1, num1);
   for (var i = "2"; isLessThan(i, num2); i = add({
     num: i.split(""),
     isNeg: false,
     decimals: 0
    }, {
     num: ["1"],
     isNeg: false,
     decimals: 0
    })) final = add(final, num1);
  }
  return formatNums(final, decimals, neg);
 }
 var permfinal, a = clone(arguments);
 if (Array.isArray(a[0])) a = a[0];
 permfinal = tempmulti(a[0], a[1]);
 for (var i = 2; i < a.length; i++) permfinal = tempmulti(permfinal, a[i]);
 return permfinal;
}

function expo() {
 function tempexpo(num1pre, num2pre) {
  var parsedNums = parseNums(num1pre, num2pre, 5),
   num1 = parsedNums.num1,
   num2 = parsedNums.num2,
   decimals = parsedNums.decimals,
   decimal2 = parsedNums.num2.decimals,
   neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
   numArray = [],
   final = "";
  if (neg[1]) num1.num.unshift("-");
  if (neg[2]) num2.num.unshift("-");
  if (decimal2 > 0) {
   // root_of_decimal2*10(num1)**(num2*(10*decimal2))
   alert("Decimal exponents aren't supported yet");
   throw new TypeError("Decimal exponents aren't supported yet");
  } else {
   if (num2.num.length == 1 && num2.num[0] == "1") return formatNums(num2.num, decimals, false);
   else if (num2.num.length == 1 && num2.num[0] == "0") return "1";
   else {
    final = multi(num1, num1);
    for (var i = "2"; isLessThan(i, num2); i = add({
      num: i.split(""),
      isNeg: false,
      decimals: 0
     }, {
      num: ["1"],
      isNeg: false,
      decimals: 0
     })) final = multi(final, num1);
    return final;
   }
   //Need to fix div -> if (neg[2]) return div("1", final);
  }
 }
 var permfinal, a = clone(arguments);
 if (Array.isArray(a[0])) a = a[0];
 permfinal = tempexpo(a[0], a[1]);
 for (var i = 2; i < a.length; i++) permfinal = tempexpo(permfinal, a[i]);
 return permfinal;
}

function div() {
 function tempdiv(num1, num2) {
  var parsedNums = parseNums(num1, num2, 4),
   neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
   num1 = parsedNums.num1,
   num2 = parsedNums.num2,
   num = sub(num1, num2),
   final = "1";
  while (isLessThanEqual(num2, num)) {
   num = sub(num, num2), final = add(final, {
    num: ["1"],
    isNeg: false,
    decimals: 0
   });
   log(num)
  }
  return final;
 }
 var permfinal, maxDecimal, a = clone(arguments);
 if (Array.isArray(a[0])) maxDecimal = a[1], a = a[0];
 else maxDecimal = a[2];
 permfinal = tempdiv(a[0], a[1], maxDecimal);
 for (var i = 2; i < a.length; i++) permfinal = tempdiv(permfinal, a[i], maxDecimal);
 return permfinal;
}
var a = add,
 s = sub,
 m = multi,
 d = div,
 e = expo,
 l = isLessThan,
 g = isGreaterThan,
 le = isLessThanEqual,
 ge = isGreaterThanEqual,
 r = round,
 ru = roundUp,
 rd = roundDown;
