/* Copyright 2019 Eric (VirxEC/Virx) Michael Veilleux
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License
 */
var powermode = !1,
  checks = !0,
  predefone = {
    num: ["1"],
    isNeg: !1,
    decimals: 0
  },
  checkNumberString = obj => {
    obj.forEach((a, i) => {
      if (!a) throw new ReferenceError("Input number " + i + " was null.");
      else if (typeof a == "object") {
        if (!Array.isArray(obj[i].num)) throw new TypeError("Input number " + i + " invalid, property num wasn't an array");
        if (typeof a.isNeg != "boolean") throw new TypeError("Input number " + i + " invalid, property isNeg wasn't a boolean.");
        if (typeof a.decimals != "number") throw new TypeError("Input number " + i + " invalid, property decimals wasn't a number.");
      } else if (typeof a == "string") {
        if (typeof + a != "number") throw new TypeError("Input number " + i + " invalid, it wasn't a number string.");
      } else throw new TypeError("Input number " + i + " was defined but wasn't a number string or object. The type was " + typeof a);
    });
  },
  checkCustom = (items, type) => {
    if (!Array.isArray(items)) items = [items];
    else if (type == "array" && items.length > 1 && Array.isArray(items[0]))
      items.forEach((item) => {
        var itype = typeof item;
        if (!item) throw new ReferenceError("Item was null.");
        else if (type == "numberstring") {
          if (itype == "object" && !Array.isArray(item)) throw new TypeError("The object variation of number strings isn't accepted here.");
          if (itype != "string") throw new TypeError("Item wasn't a number string. It was a(n) " + itype);
          else if (typeof + item != "number") throw new TypeError("Item wasn't a number string. It was a(n)" + itype);
        } else if (type == "array") {
          if (!Array.isArray(item)) throw new TypeError("Item wasn't an array. It was a(n) " + itype);
        } else if (itype != type) throw new TypeError("Item wasn't a(n) " + type + " is was a(n) " + itype);
      });
  },
  parseNums = function(num1pre, num2pre, mode) {
    if (checks) {
      if (1 > mode || mode > 5) throw new RangeError("The mode of the function must be from 1-5\n1: Addition\n2: Subtraction\n3: Multiplication\n4: Division\n5: Exponents");
      checkNumberString([num1pre, num2pre]);
    }
    var num = [null, num1pre, num2pre],
      skip = !1,
      stringMode = [null, !0, !0],
      neg = [!1, !1, !1],
      decimal = [0, 0, 0],
      numpos = [null],
      maxChar, numl, numisplit;
    for (var i = 1; i < 3; i++) {
      if (num[i].num) neg[i] = num[i].isNeg, decimal[i] = num[i].decimals, num[i] = num[i].num, stringMode[i] = !1;
      if (stringMode[i]) {
        numisplit = num[i].split("-");
        if (numisplit.length == 2) num[i] = numisplit[1], neg[i] = !0;
        if (num[i].split(".").length == 2) num[i] = num[i].replace(/\.?0+$/g, '');
        num[i] = num[i].replace(/(,)|(^0+)/g, "");
        if (num[i].length > 1 && num[i].charAt(0) == ".") num[i] = "0" + num[i];
        if (num[i].charAt(num[i].length - 1) == "." || num[i].charAt(0) == ".") num[i] = num[i].replace(".", "");
        num[i] = ["", ".", "-"].indexOf(num[i]) > -1 ? "0" : num[i];
      }
      if (!Array.isArray(num[i])) num[i] = num[i].split("");
      numpos[i] = num[i].indexOf("."), num[i] = num[i].filter(w => w != "."), decimal[i] = numpos[i] != -1 ? num[i].length - numpos[i] : 0;
    }
    if (neg[1] != neg[2] && mode != 1 && mode != 2) neg[0] = !0;
    maxChar = Math.max(num[1].length, num[2].length);
    if (decimal[1] > 0 || decimal[2] > 0) {
      decimal[0] = mode == 1 || mode == 2 ? Math.max(decimal[1], decimal[2]) : mode == 3 ? decimal[1] + decimal[2] : decimal[1] - decimal[2];
      if (decimal[0] < 0) decimal[0] = 0;
    }
    for (i = 0; !skip && (neg[1] || neg[2]) && mode == 1 && num[2].length == maxChar && i < num[1].length; i++)
      if (num[2][i] > num[1][i]) neg[0] = !0, skip = !0;
    if (mode == 2 && num[2].length == maxChar && num[1].length != maxChar) neg[0] = !0;
    for (i = 0; !skip && !neg[0] && mode == 2 && num[2].length == maxChar && i < num[1].length; i++) {
      if (num[1][i] < num[2][i]) neg[0] = !0, skip = !0;
      else skip = num[2][i] != num[1][i];
    }
    if (maxChar == num[2].length && mode == 3) num[1] = [num[2], num[2] = num[1]][0];
    if (decimal[1] != decimal[2] && [1, 2].includes(mode)) {
      if (decimal[1] == decimal[0])
        for (i = 0; i < decimal[1] - decimal[2]; i++) num[1].push("0");
      else if (decimal[2] == decimal[0])
        for (i = 0; i < decimal[2] - decimal[1]; i++) num[0].push("0");
    }
    if (num[1].length != num[2].length && [1, 2].includes(mode)) {
      numl = [num[1].length, num[2].length];
      if (maxChar == numl[0])
        for (i = 0; i < numl[0] - numl[1]; i++) num[1].unshift("0");
      else if (maxChar == numl[1])
        for (i = 0; i < numl[1] - numl[0]; i++) num[0].unshift("0");
    }
    if ([3, 4].indexOf(mode) > -1 && neg[1] && neg[2]) neg[0] = !1;
    return {
      num1: {
        num: num[1],
        isNeg: neg[1],
        decimals: decimal[1]
      },
      num2: {
        num: num[2],
        isNeg: neg[2],
        decimals: decimal[2]
      },
      isNeg: neg[0],
      maxChar: maxChar,
      decimals: decimal[0]
    };
  },
  formatNums = function(final, decimals, neg, array = !0) {
    if (checks) {
      checkCustom(final, "array");
      checkCustom(decimals, "number");
      checkCustom(neg, "array");
    }
    if (!array) final = final.length > 1 ? final.split("") : [final];
    if (array && final.length > 1) final = final.reverse();
    if (decimals > 0) final.splice(decimals, 0, ".");
    final = final.join("");
    if (neg[0]) final = "-" + final;
    if (final.split(".").length == 2) final = final.replace(/\.?0+$/g, '');
    final = final.replace(/^0+/g, '');
    if (final.length > 1 && final.charAt(0) == ".") final = "0" + final;
    if (final.charAt(final.length - 1) == "." || final.charAt(0) == ".") final = final.replace(".", "");
    final = ["", ".", "-"].indexOf(final) > -1 ? "0" : final;
    return final;
  },
  definedToNumber = function(obj) {
    var final = obj.num.join("");
    if (obj.isNeg) final = "-" + final;
    if (obj.decimals > 0) final.splice(obj.decimals, 0, ".");
    return +final;
  };

function toggleAntiCheck() {
  if (checks) console.warn("Enabled Anti-Check. This disables all input checks to save computer resources.", "To disable checks forever, change the second variable on the line 7 to 'false' in the program file. It will bypass these messages.", "Anti-Check may have unintended concequences.");
  else console.warn("Disabled Anti-Check.", "For large tasks, noticably more computer resources may be needed.");
  checks = !checks;
}

function togglePowerMode() {
  if (powermode) console.warn("Disabled power mode. Recommended for debugging only.");
  else console.warn("Enabled power mode. This will make it so the library will only activate if the sum/difference is over Number.MAX_SAFE_INTEGER.", "To enable power mode forever, change the first variable on line 7 to true.");
  powermode = !powermode;
}

function add() {
  var tempadd = function(num1, num2) {
    if (!powermode || (powermode && num1 + num2 >= Number.MAX_SAFE_INTEGER)) {
      if (checks) checkNumberString([num1, num2]);
      var parsedNums = parseNums(num1, num2, 1),
        neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
        decimal = [parsedNums.decimals, parsedNums.num1.decimals, parsedNums.num2.decimals],
        num = [null, parsedNums.num1.num, parsedNums.num2.num],
        final = [],
        carry = "0",
        finali, time;
      if (neg[2]) return sub(parsedNums.num1, {
        num: num[2],
        isNeg: !1,
        decimals: decimal[1]
      });
      else if (neg[1]) return sub(parsedNums.num[2], {
        num: num[1],
        isNeg: !1,
        decimals: decimal[2]
      });
      for (var i = parsedNums.maxChar - 1; i >= 0; i--) {
        finali = parsedNums.maxChar - i - 1;
        if (time != i + 1) carry = "0";
        final[finali] = String(+num[1][i] + (+num[2][i]) + (+carry));
        if (+final[finali] > 9) {
          var temp = final[finali].split('');
          final[finali] = temp[1], carry = temp[0], time = i;
          if (i - 1 < 0) final.push(carry);
        }
      }
      return formatNums(final, decimal[0], neg);
    } else {
      if (checks) {
        checkNumberString(num1);
        checkNumberString(num2);
      }
      if (typeof num1 == "object") num1 = definedToNumber(num1);
      if (typeof num2 == "object") num2 = definedToNumber(num2);
      return num1 + num2;
    }
  };
  var permfinal, a = {...arguments};
  if (Array.isArray(a[0])) a = a[0];
  permfinal = tempadd(a[0], a[1]);
  for (var i = 2; i < a.length; i++) permfinal = tempadd(permfinal, a[i]);
  return permfinal;
}

function sub() {
  var tempsub = function(num1, num2) {
    if (!powermode || (powermode && num1 + num2 >= Number.MAX_SAFE_INTEGER)) {
      if (checks) checkNumberString([num1, num2]);
      var parsedNums = parseNums(num1, num2, 2),
        neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
        decimal = [parsedNums.decimals, parsedNums.num1.decimals, parsedNums.num2.decimals],
        num = [null, parsedNums.num1.num, parsedNums.num2.num],
        final = [],
        finali, fans;
      if (neg.indexOf(!0) > -1) {
        if ((neg[0] && !neg[1] && !neg[2]) || (neg[1] && neg[2])) num[1] = [num[2], num[2] = num[1]][0];
        else if (neg[2] && !neg[1]) return add(parsedNums.num1, {
          num: num[2],
          isNeg: !1,
          decimals: decimal[2]
        });
        else if (neg[1] && !neg[2]) return "-" + add({
          num: num[1],
          isNeg: !1,
          decimals: decimal[1]
        }, parsedNums.num2);
      }
      for (var i = parsedNums.maxChar - 1; i >= 0; i--) {
        finali = parsedNums.maxChar - i - 1, fans = num[1][i] - num[2][i];
        if (fans < 0 && i != 0) {
          var j = i - 1;
          final[finali] = String(fans + 10), num[1][j] = String(num[1][j] - 1);
          while (num1[j] < 0 && j != 0) num[1][j] = String((+num[1][j]) + 10), j = j - 1, num[1][j] = String(num[1][j] - 1);
        } else if (fans <= 0 && i == 0) final[finali] = String(fans).split("-").length > 1 ? String(fans).split("-")[1] : String(fans);
        else final[finali] = fans;
      }
      return formatNums(final, decimal[0], neg);
    } else {
      if (checks) {
        checkNumberString(num1);
        checkNumberString(num2);
      }
      if (typeof num1 == "object") num1 = definedToNumber(num1);
      if (typeof num2 == "object") num2 = definedToNumber(num2);
      return num1 + num2;
    }
  };
  var permfinal, a = {...arguments};
  if (Array.isArray(a[0])) a = a[0];
  permfinal = tempsub(a[0], a[1]);
  for (var i = 2; i < a.length; i++) permfinal = tempsub(permfinal, a[i]);
  return permfinal;
}

function isLessThan() {
  var templessthan = function(num1, num2) {
    var num = sub(num2, num1);
    if (num.split("-").length == 1 && num != 0) return !0;
    return !1;
  };
  var permfinal, a = {...arguments};
  if (Array.isArray(a[0])) a = a[0];
  permfinal = templessthan(a[0], a[1]);
  for (var i = 2; i < a.length; i++) permfinal = templessthan(permfinal, a[i]);
  return permfinal;
}

function isGreaterThan() {
  var tempgreaterthan = function(num1, num2) {
    var num = sub(num1, num2);
    if (num.split("-").length == 1 && num != 0) return !0;
    return !1;
  };
  var permfinal, a = {...arguments};
  if (Array.isArray(a[0])) a = a[0];
  permfinal = tempgreaterthan(a[0], a[1]);
  for (var i = 2; i < a.length; i++) permfinal = tempgreaterthan(permfinal, a[i]);
  return permfinal;
}

function isLessThanEqual() {
  var templessthanequal = function(num1, num2) {
    if (sub(num2, num1).split("-").length == 1) return !0;
    return !1;
  };
  var permfinal, a = {...arguments};
  if (Array.isArray(a[0])) a = a[0];
  permfinal = templessthanequal(a[0], a[1]);
  for (var i = 2; i < a.length; i++) permfinal = templessthanequal(permfinal, a[i]);
  return permfinal;
}

function isGreaterThanEqual() {
  var tempisgreaterthanequal = function(num1, num2) {
    if (sub(num1, num2).split("-").length == 1) return !0;
    return !1;
  };
  var permfinal, a = {...arguments};
  if (Array.isArray(a[0])) a = a[0];
  permfinal = tempisgreaterthanequal(a[0], a[1]);
  for (var i = 2; i < a.length; i++) permfinal = tempisgreaterthanequal(permfinal, a[i]);
  return permfinal;
}

function round() {
  var num = arguments[0].split(".");
  if (num.length > 1 && num[1].split("")[0] > 4) return add(num[0], predefone);
  return num[0];
}

function roundDown() {
  return arguments[0].split(".")[0];
}

function roundUp() {
  return add(arguments[0].split(".")[0], predefone);
}

function multi() {
  var tempmulti = function(num1, num2) {
    if (checks) checkNumberString([num1, num2]);
    var parsedNums = parseNums(num1, num2, 3),
      neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
      final = "",
      decimals = parsedNums.decimals,
      num = [null, parsedNums.num1, parsedNums.num2];
    if (num[2].num.length == 1 && num[2].num[0] == "1") return formatNums(num[2].num, decimals, neg);
    else if (num[2].length == 1 && num[2][0] == "0") return "1";
    else {
      final = add(num[1], num[1]);
      for (var i = "2"; isLessThan(i, num[2]); i = add({
          num: i.split(""),
          isNeg: !1,
          decimals: 0
        }, predefone)) final = add(final, num[1]);
    }
    return formatNums(final, decimals, neg, !1);
  };
  var permfinal, a = {...arguments};
  if (Array.isArray(a[0])) a = a[0];
  permfinal = tempmulti(a[0], a[1]);
  for (var i = 2; i < a.length; i++) permfinal = tempmulti(permfinal, a[i]);
  return permfinal;
}

function expo() {
  var tempexpo = function(num1, num2) {
    if (checks) checkNumberString([num1, num2]);
    var parsedNums = parseNums(num1, num2, 5),
      num = [null, parsedNums.num1, parsedNums.num2],
      decimals = [parsedNums.decimals, parsedNums.num2.decimals],
      neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
      final = "";
    if (neg[1]) num[1].num.unshift("-");
    if (neg[2]) num[2].num.unshift("-");
    if (decimals[1] > 0) {
      // root_of_decimal2*10(num1)**(num2*(10*decimal2))
      throw new TypeError("Decimal exponents aren't supported yet");
    } else {
      if (num[2].num.length == 1 && num[2].num[0] == "1") return formatNums(num[2].num, decimals[0], !1);
      else if (num[2].num.length == 1 && num[2].num[0] == "0") return "1";
      else {
        final = multi(num[1], num[1]);
        for (var i = "2"; isLessThan(i, num[2]); i = add({
            num: i.split(""),
            isNeg: !1,
            decimals: 0
          }, predefone)) final = multi(final, num[1]);
        return final;
      }
      if (neg[2]) return div("1", final);
    }
  };
  var permfinal, a = {...arguments};
  if (Array.isArray(a[0])) a = a[0];
  permfinal = tempexpo(a[0], a[1]);
  for (var i = 2; i < a.length; i++) permfinal = tempexpo(permfinal, a[i]);
  return permfinal;
}

function div() {
  var tempdiv = function(num1, num2) {
    if (checks) checkNumberString([num1, num2]);
    var parsedNums = parseNums(num1, num2, 4),
      neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
      num = [parsedNums.num1, parsedNums.num1, parsedNums.num2],
      decimals = parsedNums.decimals,
      final = "0";
    while (isLessThanEqual(num[2], num[0])) {
      num[0] = sub(num[0], num[2]), final = add(final, predefone);
    }
    return formatNums(final.split(""), decimals, neg, !1);
  };
  var permfinal, maxDecimal, a = {...arguments};
  if (Array.isArray(a[0])) maxDecimal = a[1], a = a[0];
  else maxDecimal = a[2];
  permfinal = tempdiv(a[0], a[1], maxDecimal);
  for (var i = 2; i < a.length; i++) permfinal = tempdiv(permfinal, a[i], maxDecimal);
  return permfinal;
}

function calcplus_info() {
  return {
    name: "CalcPlus Beta Library",
    major: 0,
    minor: 2,
    bugFix: 0
  };
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