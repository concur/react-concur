// a function that can be executed with sum(2,3) or sum(2)(3)
function sum(a, b) {
  if (b) {
    return a + b;
  } else {
    return (b) => a + b;
  }
}
module.exports = sum;