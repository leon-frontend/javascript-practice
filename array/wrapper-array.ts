/**
 * 包装数组问题描述：
 *    创建一个名为 ArrayWrapper 的类，它在其构造函数中接受一个整数数组作为参数。该类应具有以下两个特性：
 *    当使用 + 运算符将两个该类的实例相加时，结果值为两个数组中所有元素的总和。
 *    当在实例上调用 String() 函数时，它将返回一个由逗号分隔的括在方括号中的字符串。例如，[1,2,3] 。
 *    Link: https://leetcode.cn/problems/array-wrapper/
 * 示例 1：
 *    输入：nums = [[1,2],[3,4]], operation = "Add"
 *    输出：10
 *    解释：
 *      const obj1 = new ArrayWrapper([1,2]);
 *      const obj2 = new ArrayWrapper([3,4]);
 *      obj1 + obj2; // 10
 * 示例 2：
 *    输入：nums = [[23,98,42,70]], operation = "String"
 *    输出："[23,98,42,70]"
 *    解释：
 *      const obj = new ArrayWrapper([23,98,42,70]);
 *      String(obj); // "[23,98,42,70]"
 */

class ArrayWrapper {
  // 对于 ts 语法一定要显示声明类中使用到的变量的类型
  nums: number[]

  constructor(nums: number[]) {
    this.nums = nums
  }

  // 使用 reduce 方法求累计和
  valueOf(): number {
    return this.nums.reduce((preSum, cur) => preSum + cur, 0)
  }

  // 使用 join 方法将数组转换为字符串，默认元素中间加','
  toString(): string {
    return '[' + this.nums.join() + ']'
  }
}

// 测试代码只能在 LeetCode 中测试，因为还有一些特殊的处理
// Link: https://leetcode.cn/problems/array-wrapper/