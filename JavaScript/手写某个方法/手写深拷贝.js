let obj1 = {
  a: 111,
  b: {
    c: 222
  },
  d: [1, 2, 3, 5, 7]
}
let obj2 = {}
clone(obj2, obj1)
obj1.b.c = 333
obj1.d[2] = 99
console.log(obj1);
console.log(obj2);


function clone(newObj, oldObj) {
  for (const k of Object.keys(oldObj)) {
    if (oldObj[k] instanceof Array) {
      newObj[k] = []
      clone(newObj[k], oldObj[k])
    }else if (oldObj[k] instanceof Object) {
      newObj[k] = {}
      clone(newObj[k], oldObj[k])
    }else newObj[k] = oldObj[k]
  }
}