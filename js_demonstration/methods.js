let valReturn;

let value1 = 1;
const value2 = 2;
if (true) {
  let value3 = 3;
  const value4 = 4;
  createInElementById("value3", value3);
  createInElementById("value4", value4);
  var value5 = 5;
  value6 = 6;
}
//ссылочный тип данных
let named = "people";
let user = {
  name: "John",
  hi() {
    return this.name;
  },
};

let admin = {
  name: "Ivan",
  hi: user.hi,

  hi_this: () => {
    return named;
  },
};

let variableForCycle;
let arr;
const arrConst = ["с", "ч", "а", "с", "т", "ь", "е"];

let users;
resetArr();

function resetArr() {
  arr = [1, 2, 3, 4, 5];
  valReturn = [];
  users = [
    { id: 1, name: "Вася" },
    { id: 2, name: "Петя" },
    { id: 3, name: "Маша" },
    { id: 4, name: "Вася" },
  ];
  variableForCycle = 5;
  outputValue();
}

function outputValue() {
  createInElementById("value1", value1);
  createInElementById("value2", value2);
  createInElementById("value5", value5);
  createInElementById("value6", value6);
  createInElementById("variableForCycle", variableForCycle);
  createInElementById("valueArr", arr);
  createInElementById("valueArrConst", arrConst);
  createInElementById("valueReturn", valReturn);
  createInElementById("valueUsers", users);
  valReturn = [];
}

function createInElementById(id, array) {
  var destinationArr = document.getElementById(id);
  destinationArr.textContent = "";
  if (!Array.isArray(array)) {
    const span = document.createElement("span");
    span.textContent = JSON.stringify(array);
    const divIndex = document.createElement("div");
    divIndex.textContent = typeof array;
    destinationArr.appendChild(span);
    span.appendChild(divIndex);
  } else {
    destinationArr.classList.add("items_array");
    destinationArr.innerHTML = "&nbsp;[";
    array.forEach((item, index) => {
      const divIndex = document.createElement("div");
      divIndex.textContent = index;

      const span = document.createElement("span");

      span.textContent = JSON.stringify(item);

      destinationArr.appendChild(span);

      span.appendChild(divIndex);
      destinationArr.innerHTML += ";";
    });
    destinationArr.innerHTML += "&nbsp;]";
  }
}

// объявление переменных и их свойства
function visibility(value) {
  valReturn = value;
  outputValue();
}
function assignment(value) {
  try {
    switch (value) {
      case "value1":
        valReturn = value1 *= 2;
        break;
      case "value2":
        valReturn = value2 *= 2;
        break;
      case "value3":
        valReturn = value3 *= 2;
        break;
      case "value4":
        valReturn = value4 *= 2;
        break;
      case "value5":
        valReturn = value5 *= 2;
        break;
      case "value6":
        valReturn = value6 *= 2;
        break;
    }
  } catch (err) {
    valReturn = `Ошибка ${err.message}`;
  }
  outputValue();
}

function deleteValue(value) {
  try {
    switch (value) {
      case "value1":
        valReturn = delete value1;
        break;
      case "value2":
        valReturn = delete value2;
        break;
      case "value3":
        valReturn = delete value3;
        break;
      case "value4":
        valReturn = delete value4;
        break;
      case "value5":
        valReturn = delete value5;
        break;
      case "value6":
        valReturn = delete value6;
        break;
    }
  } catch (err) {
    console.log(err);
    valReturn = `Ошибка ${err.message}`;
  }

  outputValue();
}
// типы данных
function typeOfValue(value) {
  valReturn = typeof value;
  outputValue();
}
// ссылочный тип данных
function getUser() {
  valReturn = user.hi();
  outputValue();
}
function getAdmin() {
  valReturn = admin.hi();
  outputValue();
}

function getAdminThis() {
  valReturn = admin.hi_this();
  outputValue();
}

// циклы
function cycleFor() {
  for (variable = 5; variable >= 0; variable--) {
    variableForCycle = variable;
    valReturn.push(variable);
  }
  outputValue();
}
function cycleWhile() {
  while (variableForCycle >= 0) {
    valReturn.push(variableForCycle);
    variableForCycle -= 1;
  }
  outputValue();
}
function cycleDoWhile() {
  do {
    valReturn.push(variableForCycle);
    variableForCycle -= 1;
  } while (variableForCycle >= 0);
  outputValue();
}

// Методы массивов, функций, объектов, коллекций
function methodArrPush() {
  valReturn = arr.push("new");
  outputValue();
}

function methodArrPop() {
  valReturn = arr.pop();

  outputValue();
}

function methodArrShift() {
  valReturn = arr.shift();
  outputValue();
}

function methodArrUnshift() {
  valReturn = arr.unshift("new");
  outputValue();
}

function methodArrSplise(...items) {
  valReturn = arr.splice(...items);
  outputValue();
}

function methodArrSlice(...items) {
  valReturn = arrConst.slice(...items);
  console.log(...items);
  outputValue();
}

function methodArrConcat() {
  valReturn = arrConst.concat(arr);
  outputValue();
}

function methodArrForEach() {
  valReturn = arr.forEach((item, index) => {
    arr[index] = item * 2;
  });
  outputValue();
}
function methodArrReduce() {
  valReturn = arr.reduce((sum, current) => sum + current, 0);
  outputValue();
}

function methodArrIndexOf() {
  valReturn = arrConst.indexOf("с");
  outputValue();
}
function methodArrlastIndexOf() {
  valReturn = arrConst.lastIndexOf("с");
  outputValue();
}
function methodArrIncludes() {
  valReturn = arrConst.includes("с");
  outputValue();
}
function methodJoin() {
  valReturn = arrConst.join("");
  outputValue();
}

function usersFind() {
  valReturn = users.find((item) => item.id == 1);
  outputValue();
}
function usersFindIndex() {
  valReturn = users.findIndex((item) => item.name == "Вася");
  outputValue();
}
function usersFindLastIndex() {
  valReturn = users.findLastIndex((item) => item.name == "Вася");
  outputValue();
}
function usersFilter() {
  valReturn = users.filter((item) => item.id < 3);
  outputValue();
}
function usersFilter() {
  valReturn = users.filter((item) => item.name == "Вася");
  outputValue();
}
function usersMap() {
  valReturn = users.map((item) => item.name.toUpperCase());
  outputValue();
}
function usersSort() {
  valReturn = users.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name.toLowerCase() > b.name.toLowerCase()) {
      return 1;
    }
    return 0;
  });
  outputValue();
}
function usersReverse() {
  valReturn = users.reverse();
  outputValue();
}

function usersSplit() {
  valReturn = users[0].name.split("");
  outputValue();
}



// function foo() {
//   const x = 10;
  
//   return {
//     x: 20,
//     bar: function () {
//       console.log(this.x);
//     },
//     baz: () => {
//       console.log(this.x);
//     },
//   };
// }

// const obj = foo();

// obj.bar(); // 20
// obj.baz(); // undefined

// const obj2 = foo.call({ x: 30 });

// obj2.bar(); // 20
// obj2.baz(); // 30

// const x = obj2.bar;
// const y = obj2.baz;

// x(); // undefined
// y(); // 30

/*
Обычная функция получает констекст выполнения:
1. вызывается как метод у объекта (контекст этот объект)
2. вызывается по средствам bind, call, apply (первый параметр, переданный в методы, будет контекстом)
*/


// wtf
// function applyAll(func, ...arg){
//   return func(...arg);
// }

// function applyAll(func) {
//   return func.apply(this, [].slice.call(arguments, 1));
// }

// alert( applyAll(Math.min, 2, -2, 3) ); // -2



/*
Все объявления в корне файла это объявление методов и свойств у глобального объекта (window, globalThis)
Вызов просто функции (не как метод) это вызов функции как метод у глобального объекта

Обычная функция получает контекст выполнения в момент вызова:
1. как метод у объекта (контекст выполнения будет этот объект, методом которого функция вызывалась)
2. по средствам bind, call, apply (первый параметр, переданный в методы, будет контекстом выполнения)

Стрелочная функция запоминает контекст выполнения при создании из функции, которая ее создавала
*/

// const window = globalThis;

// function f() {
//   console.log('f', this === window);
// }

// f();

// const f2 = function() {
//   console.log('f2', this === window);
// }

// f2();

// const f3 = () => {
//   console.log('f3', this);
// }

// f3();


// function makeF4() {
//   console.log('make f4', this === window)
//   return () => {
//     console.log('f4', this === window)
//   }
// };

// const f4 = makeF4();

// f4();

// function makeF5() {
//   console.log('make f5', this === window)
//   return function() {
//     console.log('f5', this === window)
//   }
// };

// const f5 = makeF5();

// f5();

// function makeF6() {
//   console.log('make f6', this)
//   return () => {
//     console.log('f6', this)
//   }
// };

// const f6 = makeF6.call({ name: 'not-global' });
// f6();

// function makeF7() {
//   console.log('make f7', this)
//   return function() {
//     console.log('f7', this)
//   }
// };

// const f7 = makeF7.call({ name: 'not-global' });
// f7();

/*
Все объявления в корне файла это объявление методов и свойств у глобального объекта (window, globalThis)
Вызов просто функции (не как метод) это вызов функции как метод у глобального объекта

Обычная функция получает контекст выполнения в момент вызова:
1. как метод у объекта (контекст выполнения будет этот объект, методом которого функция вызывалась)
2. по средствам bind, call, apply (первый параметр, переданный в методы, будет контекстом выполнения)

Стрелочная функция запоминает контекст выполнения при создании из функции, которая ее создавала
*/

// function foo() {
//   const x = 10;
//   console.log(this)
//   return {
//     x: 20,
//     bar: function () {
//       console.log(this)
//       console.log(this.x);
//     },
//     baz: () => {
//       console.log(this)
//       console.log(this.x);
//     },
//   };
// }

// const obj = foo();

// obj.bar();
// obj.baz();

// const obj2 = foo.call({ x: 30 });

// obj2.bar();
// obj2.baz();

// const x = obj2.bar;
// const y = obj2.baz;

// x();
// y();


