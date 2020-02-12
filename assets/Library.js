/**
 * Copyright 2020 Eric (VirxEC/Virx) Michael Veilleux
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and limitations under the License
 * 
 * This is the Javascript release of https://github.com/VirxEC/CalcPlus and https://www.virxcase.ga
 */
var powermode = false, // Feel free to change this, or use togglePowerMode();
  checks = true, // Feel free to change this, or use toggleAntiCheck();
  maxNumber = Number.MAX_SAFE_INTEGER, // Feel free to change this, or use setMaxSafeInteger(maxSafeInteger);
  minNumber = Number.MIN_SAFE_INTEGER, // Feel free to change this, but it doesn't do anything right now
  maxDecimal = maxNumber; // Feel free to change this, or use setMaxDecimalLength(maxDecimalLength);
console.varinfo = (v, x = Object.keys(v)[0]) => console.log(x,JSON.stringify(v[x])); // For debugging, this isn't exported

const Define = class {
  constructor(num, isNeg, decimals) {
    this.prototype = (new Object).prototype;
    if (checks) {
      if (Array.isArray(num)) {
        if (typeof isNeg == "boolean") {
          if (typeof decimals == "number") {
            this.num = num;
            this.isNeg = isNeg;
            this.decimals = decimals;
          } else throw new TypeError("Invalid argument for the property decimals, it must be a number");
        } else throw new TypeError("Invalid argument for the property isNeg, it must be a boolean");
      } else throw new TypeError("Invalid argument for the property num, it must be an array");
    } else {
      this.num = num;
      this.isNeg = isNeg;
      this.decimals = decimals;
    }
  }

  set() {
    let a = [...arguments];
    if (checks) {
      if (a[0] == "isNeg") {
        if (typeof a[1] == "boolean") this.isNeg = a[1];
        else throw new TypeError("Invalid argument for the property isNeg, it must be a boolean");
      } else if (a[0] == "num") {
        if (a.length == 2) {
          if (Array.isArray(a[1])) this.num = a[1];
          else throw new TypeError("Invalid argument for the property num, it must be an array");
        } else if (a.length == 3) {
          if (typeof a[1] == "number" && this.num[a[1]] != null) {
            if (typeof a[2] == "string") {
              if (a[2].length == 1) this.num[a[1]] = a[2];
              else throw new TypeError("Invalid argument for the property num, the string must be only 1 character");
            } else throw new TypeError("Invalid argument for the property num, the element must be a string");
          } else throw new TypeError("Invalid argument for the property num, the second argument must be a number that refers to a spot in the array");
        } else throw new TypeError("Invalid amount of arguments for the property num");
      } else if (a[0] == "decimals") {
        if (typeof a[1] == "number") this.decimals = a[1];
        else throw new TypeError("Invalid arugment of the property decimals, it must be a number");
      } else throw new TypeError(`Invalid argument for the property, must be "num", "isNeg", or "decimals". It was ${JSON.stringify(a[0])} instead.`);
    } else {
      if (a.length == 2) this[a[0]] = a[1];
      else this.num[a[1]] == a[2];
    }
    return this;
  }

  getNumber() {
    return +formatNums(this.num, this.deicmals, this.isNeg);
  }
};

Number.prototype.getNumber = function() {
  return Number(this);
};
String.prototype.getNumber = function() {
  return Number(this);
};
let predefone = new Define(["1"], false, 0);

function checkNumberString(obj) {
  if (typeof obj == "string") obj = [obj]
  obj.forEach((a, i) => {
    if (!a) throw new ReferenceError(`Invalid argument #${i} (${JSON.stringify(a)}), was null`);
    else if (typeof a == "object") {
      if (!(a instanceof Define)) throw new TypeError(`Invalid argument #${i} (${JSON.stringify(a)}), property wasn't an instance of the class Define`);
    } else if (typeof a == "string") {
      if (typeof + a != "number") throw new TypeError(`Invalid argument #${i} (${JSON.stringify(a)}), it wasn't a number string.`);
    } else throw new TypeError(`Invalid argument #${i} (${JSON.stringify(a)}) was defined but wasn't a number string or object. The type was ` + typeof a);
  });
}

function checkCustom(items, type) {
  if (!Array.isArray(items)) items = [items];
  else if (type == "array" && items.length > 1 && Array.isArray(items[0]))
    items.forEach((item) => {
      let itype = typeof item;
      if (!item) throw new ReferenceError("Item was null.");
      else if (type == "numberstring") {
        if (itype == "object" && !Array.isArray(item)) throw new TypeError(`The object variation of number strings isn't aepted here. (${JSON.stringify(item)})`);
        if (itype != "string") throw new TypeError(`Item wasn't a number string. It was a(n) ${itype} (${JSON.stringify(item)})`);
        else if (typeof + item != "number") throw new TypeError(`Item wasn't a number string. It was a(n) ${itype} (${JSON.stringify(a)})`);
      } else if (type == "array") if (!Array.isArray(item)) throw new TypeError(`Item wasn't an array. It was a(n) ${itype} (${JSON.stringify(item)})`);
      else if (itype != type) throw new TypeError(`Item wasn't a(n) ${type} is was a(n) ${itype} (${JSON.stringify(item)})`);
    });
}

function parseNums(num1, num2, mode) {
  if (checks) {
    if (1 > mode || mode > 5) throw new RangeError("The mode of the function must be from 1-5\n1: Addition\n2: Subtraction\n3: Multiplication\n4: Division\n5: Exponents");
    checkNumberString([num1, num2]);
  }
  let neg = [false, false, false],
    decimal = [0, 0, 0],
    num = [
      [], num1, num2
    ];
  for (let i = 1; i < 3; i++) {
    if (num[i] instanceof Define) neg[i] = num[i].isNeg, decimal[i] = num[i].decimals, num[i] = [...num[i].num];
    else {
      let numisplit = num[i].split("-");
      if (numisplit.length == 2) num[i] = numisplit[1], neg[i] = true;
      num[i] = num[i].replace(/,/g, "");
      if (num[i].split(".").length == 2) num[i] = num[i].replace(/$0+/g, "");
      if (num[i].length > 1 && num[i].charAt(0) == ".") num[i] = "0" + num[i];
      num[i] = ["", ".", "-"].includes(num[i]) ? "0" : num[i];
      if (!Array.isArray(num[i])) num[i] = num[i].split("");
      let numpos = num[i].indexOf(".");
      num[i] = num[i].filter(w => w != "."), decimal[i] = numpos != -1 ? num[i].length - numpos : 0;
    }
  }
  if (mode != 5) {
    if (neg[1] != neg[2] && [3, 4].includes(mode)) neg[0] = true;
    let maxChar = Math.max(num[1].length, num[2].length);
    if (decimal[1] > 0 || decimal[2] > 0) {
      decimal[0] = mode == 1 || mode == 2 ? Math.max(decimal[1], decimal[2]) : mode == 3 ? decimal[1] + decimal[2] : decimal[1] - decimal[2];
      if (decimal[0] < 0) decimal[0] = 0;
    }
    for (let i = 0; !neg[0] && (neg[1] || neg[2]) && mode == 1 && num[2].length == maxChar && i < num[1].length; i++)
      if (num[2][i] > num[1][i]) neg[0] = true;
    if (mode == 2 && num[2].length - decimal[2] == maxChar && num[1].length - decimal[1] != maxChar) neg[0] = true;
    if (maxChar == num[2].length && mode == 3) num[1] = [num[2], num[2] = num[1]][0];
    
    if (decimal[1] != decimal[2] && [1, 2].includes(mode)) {
      if (decimal[1] == decimal[0])
        for (let i = 0; i < decimal[1] - decimal[2]; i++) num[2].push("0");
      else if (decimal[2] == decimal[0])
        for (let i = 0; i < decimal[2] - decimal[1]; i++) num[1].push("0");
    }

    if (num[1].length != num[2].length && [1, 2, 4].includes(mode)) {
      while (num[1].length - num[2].length > 0) num[2].unshift("0");
      while (num[2].length - num[1].length > 0) num[1].unshift("0");
    }
    let negCalc = num[2].length == maxChar;
    for (let i = 0; !neg[0] && mode == 2 && negCalc && !(num[1][i] > num[2][i]) && i < num[1].length; i++)
      if (num[1][i] < num[2][i]) neg[0] = true;
  }
  if ([3, 4].includes(mode) && neg[1] && neg[2]) neg[0] = false;
  if ([3, 4].includes(mode)) neg[1] = false, neg[2] = false;
  for (let i = 0; mode == 4 && i < num[2].length; i++) {
    num[1].push("0");
    decimal[0]++;
  }
  return {
    num1: new Define(num[1], neg[1], decimal[1]),
    num2: new Define(num[2], neg[2], decimal[2]),
    isNeg: neg[0],
    maxChar: Math.max(num[1].length, num[2].length),
    decimals: decimal[0]
  };
}

function formatNums(final, decimals, neg, array = true, reverse = true) {
  if (checks) {
    checkCustom(final, "array");
    checkCustom(decimals, "number");
    checkCustom(neg, "array");
  }
  if (!array) final = final.length > 1 ? final.split("") : [final];
  if (reverse && final.length > 1) final = final.reverse();
  if (decimals > 0) final.splice(final.length - decimals, 0, ".");
  final = final.join("");
  if (final.split(".").length == 2) final = final.replace(/\.?0+$/g, '');
  final = final.replace(/^0+/g, '');
  if (final.length > 1 && final.charAt(0) == ".") final = "0" + final;
  if (neg[0]) final = "-" + final;
  if (final.charAt(final.length - 1) == "." || final.charAt(0) == ".") final = final.replace(".", "");
  final = ["", ".", "-", "-0"].includes(final) ? "0" : final;
  return final;
}

function toggleAntiCheck() {
  if (checks) console.info("Enabled Anti-Check. This disables all input checks to save computer resources.", "To disable checks forever, change the variable on the line 11 to 'false' in the program file. It will bypass these messages.", "Anti-Check may have unintended concequences.");
  else console.info("Disabled Anti-Check.", "For large tasks, noticably more computer resources may be needed.");
  checks = !checks;
}

function togglePowerMode() {
  if (!powermode) console.info("Disabled power mode. Recommended for debugging only.");
  else console.info(`Enabled power mode. This will make it so the library will only activate if the sum/difference is over maxNumber (${maxNumber}).`, "To enable power mode forever, change the first variable on line 10 to true.");
  powermode = !powermode;
}

function setMaxSafeInteger(maxSafeInteger) {
  if (powermode) {
    if (maxSafeInteger == "default") maxNumber = Number.MAX_SAFE_INTEGER, minNumber = Number.MIN_SAFE_INTEGER;
    else maxNumber = maxSafeInteger, minNumber = maxSafeInteger * -1;
    console.info(`To set the max safe number back to the default value of ${Number.MAX_SAFE_INTEGER}, do setMaxSafeInteger('default');`, "To change the value forever, change the variable on lines 12 (maximum) & 13 (minimum).");
  } else console.warn("You must turn on Power Mode before you can set the max safe number.");
}

function setMaxDecimalLength(maxDecimalLength) {
  if (maxDecimalLength == "default") maxDecimal = maxNumber;
  else maxDecimal = maxDecimalLength;
  console.info(`To set the max decimal length back to the default value of ${maxNumber}, do setMaxDecimalLength('default');`, "To change teh value forever, change the variable on line 14.");
}

function shouldRun(num1, num2) {
  if (num1.length >= String(maxNumber).length || num2.length >= String(maxNumber).length) return true;
  let maxstr = String(maxNumber),
    maxChar = Math.max(num1.length, num2.length),
    num = maxChar == num1.length ? num1 : num2;
  for (let i = Math.max(num1.length, num2.length); i > 0; i++)
    if (+num[i] > +maxstr[i]) return true;
  return false;
}

function add() {
  let tempadd = function(num1, num2) {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
      if (checks) checkNumberString([num1, num2]);
      let parsedNums = parseNums(num1, num2, 1),
        neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
        decimal = [parsedNums.decimals, parsedNums.num1.decimals, parsedNums.num2.decimals],
        num = [null, parsedNums.num1.num, parsedNums.num2.num],
        final = [],
        carry = "0",
        finali, time;
      if (neg[2]) return sub(parsedNums.num1, parsedNums.num2.set("isNeg", false));
      else if (neg[1]) return sub(parsedNums.num2, parsedNums.num1.set("isNeg", false));
      for (let i = parsedNums.maxChar - 1; i >= 0; i--) {
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
      return String(num1.getNumber() + num2.getNumber());
    }
  };
  let permfinal, a = [...arguments];
  if (Array.isArray(a[0])) a = a[0];
  permfinal = tempadd(a[0], a[1]);
  for (let i = 2; i < a.length; i++) permfinal = tempadd(permfinal, a[i]);
  return permfinal;
}

function sub() {
  let tempsub = function(num1, num2) {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
      if (checks) checkNumberString([num1, num2]);
      let parsedNums = parseNums(num1, num2, 2),
        neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
        decimal = [parsedNums.decimals, parsedNums.num1.decimals, parsedNums.num2.decimals],
        num = [null, parsedNums.num1.num, parsedNums.num2.num],
        final = [],
        finali, fans;

      if (neg.includes(true)) {
        if ((neg[0] && !neg[1] && !neg[2]) || (neg[1] && neg[2])) num[1] = [num[2], num[2] = num[1]][0];
        else if (neg[2] && !neg[1]) return add(parsedNums.num1, parsedNums.num2.set("isNeg", false));
        else if (neg[1] && !neg[2]) return "-" + add(parsedNums.num1.set("isNeg", false), parsedNums.num2);
      }
      for (let i = parsedNums.maxChar - 1; i >= 0; i--) {
        finali = parsedNums.maxChar - i - 1, fans = num[1][i] - num[2][i];
        if (fans < 0 && i != 0) {
          let j = i - 1;
          final[finali] = String(fans + 10), num[1][j] = String(num[1][j] - 1);
          while (num1[j] < 0 && j != decimal[1]) num[1][j] = String((+num[1][j]) + 10), j = j - 1, num[1][j] = String(num[1][j] - 1);
          if (decimal[1] > 0 && j == decimal[1])
            while (num1[j] < 0 && j != 0) num[1][j] = String((+num[1][j]) + 10), j = j - 1, num[1][j] = String(num[1][j] + 1);
        } else if (fans <= 0 && i == 0) final[finali] = String(fans).split("-").length > 1 ? String(fans).split("-")[1] - 1 : String(fans);
        else final[finali] = fans;
      }
      return formatNums(final, decimal[0], neg);
    } else {
      if (checks) {
        checkNumberString(num1);
        checkNumberString(num2);
      }
      return String(num1.getNumber() - num2.getNumber());
    }
  };
  let permfinal, a = [...arguments];
  if (Array.isArray(a[0])) a = a[0];
  permfinal = tempsub(a[0], a[1]);
  for (let i = 2; i < a.length; i++) permfinal = tempsub(permfinal, a[i]);
  return permfinal;
}

function isLessThan() {
  let templessthan = function(num1, num2) {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
      let num = sub(num2, num1);
      if (num.split("-").length == 1 && num != 0) return true;
      return false;
    } else {
      if (checks) {
        checkNumberString(num1);
        checkNumberString(num2);
      }
      return String(num1.getNumber() < num2.getNumber());
    }
  };
  let permfinal, a = [...arguments];
  if (Array.isArray(a[0])) a = a[0];
  permfinal = templessthan(a[0], a[1]);
  for (let i = 2; i < a.length; i++) permfinal = templessthan(permfinal, a[i]);
  return permfinal;
}

function isGreaterThan() {
  let tempgreaterthan = function(num1, num2) {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
      let num = sub(num1, num2);
      if (num.split("-").length == 1 && num != 0) return true;
      return false;
    } else {
      if (checks) {
        checkNumberString(num1);
        checkNumberString(num2);
      }
      return String(num1.getNumber() > num2.getNumber());
    }
  };
  let permfinal, a = [...arguments];
  if (Array.isArray(a[0])) a = a[0];
  permfinal = tempgreaterthan(a[0], a[1]);
  for (let i = 2; i < a.length; i++) permfinal = tempgreaterthan(permfinal, a[i]);
  return permfinal;
}

function isLessThanEqual() {
  let templessthanequal = function(num1, num2) {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
      if (sub(num2, num1).split("-").length == 1) return true;
      return false;
    } else {
      if (checks) {
        checkNumberString(num1);
        checkNumberString(num2);
      }
      return String(num1.getNumber() <= num2.getNumber());
    }
  };
  let permfinal, a = [...arguments];
  if (Array.isArray(a[0])) a = a[0];
  permfinal = templessthanequal(a[0], a[1]);
  for (let i = 2; i < a.length; i++) permfinal = templessthanequal(permfinal, a[i]);
  return permfinal;
}

function isGreaterThanEqual() {
  let tempisgreaterthanequal = function(num1, num2) {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
      if (sub(num1, num2).split("-").length == 1) return true;
      return false;
    } else {
      if (checks) {
        checkNumberString(num1);
        checkNumberString(num2);
      }
      return String(num1.getNumber() >= num2.getNumber());
    }
  };
  let permfinal, a = [...arguments];
  if (Array.isArray(a[0])) a = a[0];
  permfinal = tempisgreaterthanequal(a[0], a[1]);
  for (let i = 2; i < a.length; i++) permfinal = tempisgreaterthanequal(permfinal, a[i]);
  return permfinal;
}

function round() {
  let a = [...arguments][0];
  if (!powermode || (powermode && shouldRun(a, "0"))) {
    a = a.split(".");
    if (a.length > 1 && a[1].split("")[0] > 4) return add(a[0], predefone);
    return a[0];
  } else {
    if (checks) checkNumberString(a);
    return String(Math.round(a.getNumber()));
  }
}

function roundDown() {
  let a = [...arguments][0];
  if (!powermode || (powermode && shouldRun(a, "0"))) {
    a = a.split(".");
    return a[0][0] == "-" ? sub(a[0], predefone) : a[0];
  } else {
    if (checks) checkNumberString(a);
    return String(Math.floor(a.getNumber()));
  }
}

function roundUp() {
  let a = [...arguments][0];
  if (!powermode || (powermode && shouldRun(a, "0"))) {
    a = a.split(".");
    return a.length == 2 ? a[0][0] == "-" ? a[0] : add(a[0], predefone) : a;
  } else {
    if (checks) checkNumberString(a);
    return String(Math.ceil(a.getNumber()));
  }
}

function multi() {
  let tempmulti = function(num1, num2) {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
      if (checks) checkNumberString([num1, num2]);
      let parsedNums = parseNums(num1, num2, 3),
        neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
        decimals = parsedNums.decimals,
        num = [null, parsedNums.num1.num, parsedNums.num2.num],
        final = [],
        carry = 0,
        product = "",
        f=[],
        time;

      for (let f2 = num[2].length - 1; f2 >= 0; f2--) {
        let f2i = num[2].length - f2 - 1;
        final[f2i] = [];
        if (f2 != num[2].length - 1) f.push("0");
        for (let f1 = num[1].length - 1; f1 >= 0; f1--) {
          let f1i = num[1].length - f1 - 1;
          if (time != f1 + 1) carry = 0;
          if (num[2][f2] != 0 && num[1][f2] != 0) {
            final[f2i][f1i] = String((+num[2][f2]) * (+num[1][f1]) + carry);
            if (final[f2i][f1i] > 9) {
              let temp = final[f2i][f1i].split('');
              final[f2i][f1i] = temp[1], carry = +temp[0], time = f1;
              if (f1 == 0) final[f2i].push(String(carry));
            }
          } else final[f2i][f1i] = "0";
        }
        final[f2i] = formatNums(f.concat(final[f2i]), decimals, false);
      }
      product = final[0];
      for (let i = 1; i < final.length; i++) product = add(product, final[i]);
      if (neg[0] == true) return "-"+product;
      return (neg[0] ? "-":"")+product;
    } else {
      if (checks) {
        checkNumberString(num1);
        checkNumberString(num2);
      }
      return String(num1.getNumber() * num2.getNumber());
    }
  };
  let permfinal, a = [...arguments];
  if (Array.isArray(a[0])) a = a[0];
  permfinal = tempmulti(a[0], a[1]);
  for (let i = 2; i < a.length; i++) permfinal = tempmulti(permfinal, a[i]);
  return permfinal;
}

function div() {
  let tempdiv = function(num1, num2, maxD, i, getDec) {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
      if (checks) checkNumberString([num1, num2]);
      let parsedNums = parseNums(num1, num2, 4),
        neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
        num = [parsedNums.num1, parsedNums.num2],
        decimals = {...parsedNums}.decimals,
        final = "0";
      if (num[0] == "0") return "0";
      if (isLessThanEqual(num[1], num[0])) while (isLessThanEqual(num[1], num[0])) num[0] = sub(num[0], num[1]), final = add(final, predefone);
      else final = "0";
      if (maxD > decimals && !isLessThanEqual(num[1], num[0]) && num[0] != "0" && sub(num[0], num[1]) != "0") {
        if (num[0] != "0") num[0] = num[0]+"0";
        if (num[1].num[0] != "0" && num[1].length != 1) num[1].num.push("0");
        final = final.split("").reverse().join("");
        if (!i) i = 1;
        else i++;
        decimals++;
        decimal = tempdiv(num[0], num[1], maxD-decimals, i, true);
        decimals += decimal.decimal - parsedNums.decimals;
        decimal = decimal.final.replace(".", "");
        for(let j = 0; j < i; j++) decimal += "0";
        final = add(final, decimal).split("");
      } else {
        final = final.split("");
      }
      while (decimals > final.length) final.push("0");
      final = formatNums(final, decimals, neg);
      return getDec ? { final, decimal:decimals } : final;
    } else {
      if (checks) {
        checkNumberString(num1);
        checkNumberString(num2);
      }
      return String(num1.getNumber() / num2.getNumber());
    }
  };
  let a = [...arguments];
  if (Array.isArray(a[0])) a = a[0];
  let maxD = typeof a[a.length-1] == "number" ? a[a.length-1] : maxDecimal,
    permfinal = tempdiv(a[0], a[1], maxD);
  for (let i = 2; i < a.length-1; i++) permfinal = tempdiv(permfinal, a[i], maxD);
  return permfinal;
}

function expo() {
  let tempexpo = function(num1, num2, maxD) {
    if (!powermode || (powermode && shouldRun(num1, num2))) {
      if (checks) checkNumberString([num1, num2]);
      let parsedNums = parseNums(num1, num2, 5),
        num = [null, parsedNums.num1, parsedNums.num2],
        decimals = [parsedNums.decimals, parsedNums.num2.decimals],
        neg = [parsedNums.isNeg, parsedNums.num1.isNeg, parsedNums.num2.isNeg],
        final = "";

      if (decimals[1] > 0) {
        // root_of_decimal2*10(num1)**(num2*(10*decimal2))
        throw new TypeError("Decimal exponents aren't supported yet");
      } else {
        if (num[2].num.length == 1 && num[2].num[0] == "1" && !neg[2]) return formatNums(num[1].num, decimals[0], false, true, false);
        else if ((num[2].num.length == 1 && num[2].num[0] == "0") || (num[1].num.length == 1 && num[1].num[0] == "1" && !neg[1])) return "1";
        else if (neg[2]) return div("1", tempexpo(num[1], num[2].set("isNeg", false), maxD));
        else {
          if (num[1].num[0] == "-") num[1].num.shift();
          final = multi(num[1], num[1]);
          for (let i = "2"; isLessThan(new Define(i.split(""), false, 0), num[2]); i = add(new Define(i.split(""), false, 0), predefone)) final = multi(final, num[1]);
          return final;
        }
      }
    } else {
      if (checks) {
        checkNumberString(num1);
        checkNumberString(num2);
      }
      return String(num1.getNumber() ** num2.getNumber());
    }
  };
  let a = [...arguments];
  if (Array.isArray(a[0])) a = a[0];
  let maxD = typeof a[a.length-1] == "number" ? a[a.length-1] : maxDecimal,
    permfinal = tempexpo(a[0], a[1]);
  for (let i = 2; i < a.length; i++) permfinal = tempexpo(permfinal, a[i], maxD);
  return permfinal;
}

function fact() {
  let a = [...arguments][0];
  if (checks) {
    checkNumberString(a)
    if (a.split(".").length > 1) throw new TypeError("The function fact() (or f()) doesn't support decimal inputs");
  }
  let tempfact = (n, a) => isLessThan(n, "0") ? tempfact(add(n, predefone), multi(n, a)) : n == "0" ? a : tempfact(sub(n, predefone), multi(n, a));
  return tempfact(a, predefone);
}

function calcplus_info() {
  return {
    name: "CalcPlus Beta Library",
    major: 0,
    minor: 4,
    bugFix: 0
  };
}

var a = add,
  s = sub,
  m = multi,
  d = div,
  e = expo,
  f = fact,
  l = isLessThan,
  g = isGreaterThan,
  le = isLessThanEqual,
  ge = isGreaterThanEqual,
  r = round,
  ru = roundUp,
  rd = roundDown,
  subtract = sub,
  multiply = multi,
  divide = div,
  exponent = expo,
  factorial = fact,
  ceil = roundUp,
  floor = roundDown;
