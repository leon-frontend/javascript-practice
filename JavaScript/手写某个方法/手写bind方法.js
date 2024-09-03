// 手写bind
Function.prototype.myBind = function (context, ...args1) {
  // 判断mybind只能被函数调用
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }

  const fn = this

  const fnBind = function (...args2) {
    // 拼接两次传递的参数
    const argsSum = [...args1, ...args2]
    // 使用apply方法调用函数
    // 如果说调用myBind的是一个构造函数，且fnBind在调用时是通过new操作符调用的
    // 则需要对new操作符做特殊处理
    // 通过new操作符调用的话，fnBind中的this肯定指向fnBind的实例对象
    // 如果this是new调用的，则让fn的this指向fn的实例，此时应忽略传入的context
    // new 操作符的优先级要高于 bind
    return fn.apply(this instanceof fnBind ? this : context, argsSum)
  }

  // 新函数要继承原函数的原型对象
  fnBind.prototype = fn.prototype

  return fnBind
}

// ---------- 测试普通函数的调用 ------------
function fn(...args) {
  console.log(this.name, this.age, ...args)
}

let obj = {
  name: 'Alice',
  age: 20,
}

let obj2 = {
  name: 'Bob',
}

// 方式一：只在bind中传递函数参数
fn.myBind(obj, 1, 2)()
// 方式二：在bind中传递函数参数，也在返回函数中传递参数
const f1 = fn.myBind(obj, 1)(2)
const f2 = f1.myBind(obj2, 5)
console.log(f2)

// ---------- 测试构造函数的调用 ------------
function Person(name, age) {
  this.name = name
  this.age = age
  console.log(this.name, 'and', this.age)
}

// 构造函数调用bind方法
const PersonBind = Person.myBind(obj, 'Bob', 12)
// 创建PersonBind的实例对象，其实是创建Person的实例
const bob = new PersonBind()
console.log(bob)
