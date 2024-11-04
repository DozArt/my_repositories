// Методы массивов, функций, объектов, коллекций
let arr = [1, 2, 3, 4, 5];
const arrConst = ["с", "ч", "а", "с", "т", "ь", "е"];

let users = [
  {id: 1, name: "Вася"},
  {id: 2, name: "Петя"},
  {id: 3, name: "Маша"},
  {id: 4, name: "Вася"}
];

let valReturn = [];
outputValue();

function resetArr(){
  arr = [1, 2, 3, 4, 5];
  valReturn = [];
  outputValue();
}

function createElement(id, array) {
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
    array.forEach((item, index) => {
      const divIndex = document.createElement("div");
      divIndex.textContent = index;

      const span = document.createElement("span");

      span.textContent = JSON.stringify(item);

      destinationArr.appendChild(span);
      span.appendChild(divIndex);
    });
  }
  
}

function outputValue() {
  createElement("valueArr", arr);
  createElement("valueArrConst", arrConst);
  createElement("valueReturn", valReturn);
  createElement("valueUsers", users);
  valReturn = []
}

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
//map
//sort(fn)
//reverse
//split и join
//reduce/reduceRight
//Array.isArray
