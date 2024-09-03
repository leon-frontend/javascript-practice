// ---------------------------- 手写 instanceof 关键字 ------------------------------
function myInstanceof(L: any, R: any) {
  L = L.__proto__
  while (L) {
    if (L === R.prototype) return true
    L = L.__proto__
  }
  return false
}

// 测试代码
const arr1 = [1, 2, 3, 4]
console.log('myInstanceof 输出结果：', myInstanceof(arr1, Number))

// ------------------------------------------------------------------------------
/**
 * 检查是否是类的对象实例
 * 请你编写一个函数，检查给定的值是否是给定类或超类的实例。
 * 可以传递给函数的数据类型没有限制。例如，值或类可能是 undefined 。
 * Link：https://leetcode.cn/problems/check-if-object-instance-of-class/description/
 *
 * 示例 1：
 *    输入：func = () => checkIfInstance(new Date(), Date)
 *    输出：true
 *    解释：根据定义，Date 构造函数返回的对象是 Date 的一个实例。
 */
// 方法 1：使用原型链进行查找，通过手写 instanceof 关键字实现
function checkIfInstanceOf1(obj: any, classFunction: any): boolean {
  if (
    obj === null ||
    obj === undefined ||
    classFunction === null ||
    classFunction === undefined
  )
    return false

  // 原型链查找
  while (obj.__proto__ && obj.__proto__ !== classFunction.prototype)
    obj = obj.__proto__

  return obj.__proto__ === classFunction.prototype
}

// 方法 2：使用原型链进行查找，使用 instanceof 关键字实现
function checkIfInstanceOf2(obj: any, classFunction: any): boolean {
  /**
   * !(classFunction instanceof Function) 是用来检查 classFunction 是否是一个构造函数。
   * 如果 classFunction 不是一个函数，那么就不能用它来检查 obj 是否是该类的实例。
   */
  if (obj === null || obj === undefined || !(classFunction instanceof Function))
    return false

  /**
   * 题目要求在 instanceof 的基础上支持基本类型，但是 instanceof 本身不支持基础类型，所以需要处理
   * 使用Object(obj)即可将基本类型转为引用类型
   */
  return Object(obj) instanceof classFunction
}

// 测试代码
console.log(
  'checkIfInstanceOf2 输出结果：',
  checkIfInstanceOf2(new Date(), Date)
)
