function myInstanceof(L, R) {
  L = L.__proto__
  while (L) {
    if (L === R.prototype) return true
    L = L.__proto__
  }
  return false
}

const arr = [1,2,3,4]
console.log(myInstanceof(arr, Number));