// function Person() {
//   this.name = 'Bob'
// }
// // 在原型链上添加方法
// Person.prototype.getName = function() {
//   return this.name
// }

// const bob = new Person()
// console.log(bob);
// const name = bob.getName()
// console.log(name);

// -------------- 使用原型链实现继承 --------------
// function Student(){

// }
// // 将子类的原型对象指向父类的实例对象
// Student.prototype = new Person()
// // 将原型对象的constructor指向Student构造函数
// Student.prototype.constructor = Student

// // test => 创建Student的原型对象
// const stu = new Student()
// console.log(stu.name);
// console.log(stu.getName());


// -------------- 使用构造函数实现继承 --------------
// function Person(name) {
//   this.name = name
// }
// // 在原型链上添加方法
// // 此方法无法访问到父类原型链上的方法
// Person.prototype.getName = function() {
//   return this.name
// }

// // 让父类的构造函数将属性和方法挂在子类身上
// function Student() {
//   Person.apply(this,arguments)
// }

// let stu = new Student('stu')
// console.log(stu.name);
// console.log(stu.getName());

// -------------- 使用组合式继承实现继承 --------------
// function Person(name, age) {
//   this.name = name
//   this.age = age
// }

// Person.prototype.getName = function(){
//   return this.name
// }

// // 使用构造函数继承
// function Man() {
//   Person.apply(this, arguments)
// }

// // 使用原型链继承
// Man.prototype = new Person()
// Man.prototype.constructor = Man

// // test => 创建Man实例
// let m = new Man('man', 20)
// console.log(m.age);
// console.log(m.getName());

// -------------- 使用寄生式继承实现继承 --------------
function Person(name, age){
  this.name = name
  this.age = age
}
Person.prototype.getName = function(){
  return this.name
}

// 使用构造函数继承
function Man() {
  Person.apply(this, arguments)
}
// 使用寄生式继承
Man.prototype = Object.create(Person.prototype)
Man.prototype.constructor = Man

// test => 创建Man实例
let man = new Man('gril', 22)
console.log(man.getName(), man.age);