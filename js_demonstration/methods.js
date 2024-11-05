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

// console.log(value3)
let arr;
const arrConst = ["с", "ч", "а", "с", "т", "ь", "е"];

let users
let valReturn;
resetArr();

function resetArr(){
  arr = [1, 2, 3, 4, 5];
  valReturn = [];
  users = [
    {id: 1, name: "Вася"},
    {id: 2, name: "Петя"},
    {id: 3, name: "Маша"},
    {id: 4, name: "Вася"}
  ];
  outputValue();
}

function outputValue() {
  createInElementById("value1", value1);
  createInElementById("value2", value2);
  createInElementById("value5", value5);
  createInElementById("value6", value6);
  createInElementById("valueArr", arr);
  createInElementById("valueArrConst", arrConst);
  createInElementById("valueReturn", valReturn);
  createInElementById("valueUsers", users);
  valReturn = []
}

function createInElementById(id, array) {
  var destinationArr = document.getElementById(id);
  destinationArr.textContent = "";
  if (!Array.isArray(array)){
    const span = document.createElement("span");
    span.textContent = JSON.stringify(array);
    const divIndex = document.createElement("div");
    divIndex.textContent = typeof array;
    destinationArr.appendChild(span);
    span.appendChild(divIndex);
  }
  else{
    destinationArr.classList.add("items_array")
    destinationArr.innerHTML = '&nbsp;['
    array.forEach((item, index) => {
      const divIndex = document.createElement("div");
      divIndex.textContent = index;

      const span = document.createElement("span");

      span.textContent = JSON.stringify(item);

      destinationArr.appendChild(span);
      
      span.appendChild(divIndex);
      destinationArr.innerHTML += ';';
    });
    destinationArr.innerHTML += '&nbsp;]'
  }
}

function visibility(value) {
  valReturn = value
  outputValue();
}
function assignment(value) {
  try {
    switch (value){
      case "value1":
          value1 *= 2;
          break
      case "value2":
        value2 *= 2;
        break
      case "value3":
        value3 *= 2;
        break
      case "value4":
        value4 *= 2;
        break
      case "value5":
        value5 *= 2;
        break
      case "value6":
        value6 *= 2;
        break
    }
  } catch (err) {
    console.log(err)
    valReturn = `Ошибка ${err.message}`;
  }
  
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
  outputValue();
}

function methodArrConcat() {
  valReturn = arrConst.concat(arr);
  outputValue();
}

function methodArrForEach() {
  valReturn = arr.forEach((item,index) => {
    arr[index] = item *2 ;
  });
  outputValue();
}
function methodArrReduce() {
  valReturn = arr.reduce((sum, current) => sum + current, 0)
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
  valReturn = arrConst.join('');
  outputValue();
}


function usersFind(){
  valReturn = users.find(item => item.id == 1);
  outputValue();
}
function usersFindIndex(){
  valReturn = users.findIndex(item => item.name == "Вася");
  outputValue();
}
function usersFindLastIndex(){
  valReturn = users.findLastIndex(item => item.name == "Вася");
  outputValue();
}
function usersFilter(){
  valReturn = users.filter(item => item.id < 3);
  outputValue();
}
function usersFilter(){
  valReturn = users.filter(item => item.name == "Вася");
  outputValue();
}
function usersMap(){
  valReturn = users.map(item => item.name.toUpperCase());
  outputValue();
}
function usersSort(){
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
function usersReverse(){
  valReturn = users.reverse();
  outputValue();
};

function usersSplit(){
  valReturn = users[0].name.split('');
  outputValue();
};
