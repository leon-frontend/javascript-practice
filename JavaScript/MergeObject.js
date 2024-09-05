// https://juejin.cn/post/7026715822550679583
// http://www.seozhijia.net/javascript/238.html
let obj1 = {
  a: [
    {
      x: 2,
    },
    {
      y: 4,
    },
  ],
  b: 1,
  c: 'bar',
}

let obj2 = {
  a: {
    z: 3,
  },
  b: [2, 3],
  c: 'foo',
}

// --------------- 合并两个对象 ---------------
// 合并后：{ a: [ { x: 2 }, { y: 4 }, { z: 3 } ], b: [ 1, 2, 3 ], c: [ 'bar', 'foo' ] }
const merge = (...objs) => {
  let res = {}
  for (let obj of objs) {
    // Object.entries(obj)只会获得对象本身的属性，不会获得原型链上的属性
    // for...in会遍历原型链上的属性
    for (let [key, value] of Object.entries(obj)) {
      // 如果用 key in obj判断obj是否有key属性，若key属性是obj原型链上的属性，则返回true
      // hasOwnProperty方法只会判断对象自身是否存在该属性
      if (res.hasOwnProperty(key)) res[key] = [].concat(res[key], value)
      else res[key] = value
    }
  }
  return res
}
console.log(merge(obj1, obj2))
