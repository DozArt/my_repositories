
if (true) {
  var valVar = 3; // видимость переменной выходит за пределы блока
  val = 4; // так тоже возможно
}

try {
  valLet *= 10;
  valVar *= 10;
  val *= 10;
  valConst *= 10;
} catch (err) {
  console.log(err); // ошибка изменения константы
}

console.log(valLet);
console.log(valConst);
console.log(valVar);
console.log(val);

// примитивы, объекты и ссылочный тип данных

console.log(
  typeof undefined, // "undefined"
  typeof 0, // "number"
  typeof 1n, // "bigint"
  typeof true, // "boolean"
  typeof "foo", // "string"
  typeof Symbol(), // "symbol"
  typeof {}, // "object"
  typeof null, // "object"  (1)
  typeof function () {} // "function"  (2)
);

// ссылочный тип данных
let user = {
  name: "John",
  hi() {
    console.log(this.name);
  }, // функция вывода значения массива через this
};

let admin = {
  name: "Ivan",
  hi: user.hi, // тащим функцию из user
};

user.hi(); // John
admin.hi(); // Ivan потому что user.hi ссылочный тип данных

// добавление свойства примитиву
let str = "Привет";

console.log((str.test = 5)); // 5 и создается object

console.log(str.test); // undefined потому-что у примитивов object со своими свойствами удаляется

let variable = 0;
console.log("variable =", variable);

function setVar3() {
  variable = 3;
  console.log("variable =", variable);
}

function whileDem() {
  console.log("while");
  while (variable >= 0) {
    console.log(variable);
    variable--;
  }
}

function doWhileDem() {
  console.log("do while");
  do {
    console.log(variable);
    variable--;
  } while (variable >= 0);
}

function forDem() {
  console.log("for");
  for (variable = 3; variable >= 0; variable--) {
    console.log(variable);
  }
}
