// ----------------- 类数组对象的转换 --------------------
let obj = {
  0:"tom",
  1:"terry",
  length: 2
}

// console.log(obj);
// obj[Symbol.iterator] = [][Symbol.iterator]
// for (let i of obj) console.log(i);

// ----------------- 普通对象的转换 --------------------
let obj2 = {
  a: 'AAA',
  b: 'BBB',
  // 使用
  [Symbol.iterator]: function* (){
    // 获取所有的属性名
    const keys = Object.keys(this)
    for (const key of keys) {
      yield [key, this[key]]
    }
  }
}



// for (const [key, value] of obj2) {
//   console.log(key);
// }
const [a, b] = obj2
console.log(a, b);

