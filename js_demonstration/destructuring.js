function destructuringOneTwoOther(variables) {
  let [one, two, ...other] = variables;
  console.log(one, two, other);

  let { name: n = "dont people" } = one;
  console.log(n);
}
