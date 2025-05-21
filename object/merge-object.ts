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

// 定义 merge 方法中的对象的 TS 类型
type MergeObj = Record<string, any>

/**
 * @description merge 方法用于合并两个对象
 * @returns 返回 { a: [ { x: 2 }, { y: 4 }, { z: 3 } ], b: [ 1, 2, 3 ], c: [ 'bar', 'foo' ] }
 */
const mergeFn = (...objs: MergeObj[]): MergeObj => {
  // 声明返回的结果对象
  let res: MergeObj = {}

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
console.log(mergeFn(obj1, obj2))
