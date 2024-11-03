// Методы массивов, функций, объектов, коллекций
let arr = [1, 2, 3, 4, 5];
const arrConst = ["с", "ч", "а", "с", "т", "ь", "е"];
let valReturn = [];
outputValue();

function createElement(id, array) {
  var destinationArr = document.getElementById(id);
  destinationArr.textContent = "";

  array.forEach((item, index) => {
    const divIndex = document.createElement("div");
    divIndex.textContent = index;

    const span = document.createElement("span");

    span.textContent = item;

    destinationArr.appendChild(span);
    span.appendChild(divIndex);
  });
}

function outputValue() {
  createElement("valueArr", arr);
  createElement("valueArrConst", arrConst);
  createElement("valueReturn", valReturn);
}

function methodArrPush() {
  arr.push("new");
  outputValue();
}

function methodArrPop() {
  arr.pop();
  outputValue();
}

function methodArrShift() {
  arr.shift();
  outputValue();
}

function methodArrUnshift() {
  arr.unshift("new");
  outputValue();
}

function methodArrSplise(...items) {
  arr.splice(...items);
  outputValue();
}

function methodArrSlice(start = 1, end = 6) {
  valReturn = arrConst.slice(start, en);
  outputValue();
}

function methodArrConcat() {
  valReturn = arrConst.concat(arr);
  outputValue();
}

function methodArrForEach() {
  arrConst.forEach((item, index) => console.log("iter", index, "->", item));
  outputValue();
}

function methodArrIndexOf() {
  console.log('indexOf("с") ', arrConst.indexOf("с"));
  console.log('lastIndexOf("с") ', arrConst.lastIndexOf("с"));
  console.log('includes("с") ', arrConst.includes("с"));
  outputValue();
}
//find и findIndex/findLastIndex
//filter
//map
//sort(fn)
//reverse
//split и join
//reduce/reduceRight
//Array.isArray
