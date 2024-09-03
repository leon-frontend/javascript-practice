function Person(name, age) {
  ;(this.name = name), (this.age = age)
}

// let person = new Person('AAA')
// console.log(person);

// 手写new
function myNew(fn, ...args) {
  let obj = {}
  // 将实例对象的对象原型指向构造函数的的原型对象
  obj.__proto__ = fn.prototype
  // 将构造函数的this指向实例对象，并执行构造函数
  const result = fn.apply(obj, args)
  // 判断构造函数的返回值是否是一个对象
  return result instanceof Object ? result : obj
}

// test
let person = myNew(Person, 'AAA', 18)
console.log(person)
