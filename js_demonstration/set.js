var people = new Set();

let john = { name: "John" };
let pete = { name: "Pete" };
let mary = { name: "Mary" };

function typeofSet() {
  console.log(people);
  console.log("typeof", typeof people);
}

function addPeople() {
  console.log(people.add(john));
  console.log(people.add(pete));
  console.log(people.add(mary));
}

function hasPeople(value) {
  console.log(people.has(value));
}

function deletePeople(value) {
  console.log(people.delete(value));
}

function clearPeople() {
  console.log(people.clear());
}

function sizePeople() {
  console.log(people.size);
}
