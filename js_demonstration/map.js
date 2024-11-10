var sayings = new Map();

function typeofMap() {
  console.log(sayings);
  console.log("typeof", typeof sayings);
}

function setSayings(key, value) {
  console.log(sayings.set(key, value));
}

function getSayings(key) {
  console.log(sayings.get(key));
}

function keysSayings() {
  console.log(sayings.keys());
}

function valuesSayings() {
  console.log(sayings.values());
}

function hasSayings(key) {
  console.log(sayings.has(key));
}

function deleteSayings(key) {
  console.log(sayings.delete(key));
}

function clearSayings() {
  console.log(sayings.clear());
}

function sizeSayings() {
  console.log(sayings.size);
}
