/**
 * 记忆函数:
 *    请你编写一个函数 fn，它接收另一个函数作为输入，并返回该函数的 记忆化 后的结果。
 *    记忆函数 是一个对于相同的输入永远不会被调用两次的函数。相反，它将返回一个缓存值。
 *    你可以假设有 3 个可能的输入函数：sum 、fib 和 factorial 。
 *      1. sum 函数接收两个整型参数 a 和 b ，并返回 a + b 。假设如果参数 (b, a) 已经缓存了值，其中 a != b，它不能用于参数 (a, b)。
 *          例如，如果参数是 (3, 2) 和 (2, 3)，则应进行两个单独的调用。
 *      2. fib 函数接收一个整型参数 n ，如果 n <= 1 则返回 1，否则返回 fib (n - 1) + fib (n - 2)。
 *      3. factorial 函数接收一个整型参数 n ，如果 n <= 1 则返回  1 ，否则返回 factorial(n - 1) * n 。
 * Link：https://leetcode.cn/problems/memoize/description/
 */

// 定义 TS 类型
type Fn = (...params: number[]) => number

// 实现记忆函数
const memoize = (fn: Fn): Fn => {
  // 使用 Map 缓存函数参数和函数值的映射关系，并且使用闭包缓存 Map
  // Map 的键是由 ...params 转换成的字符串，值是函数的返回值
  const cache = new Map<string, number>()

  return function (...args) {
    // 将传递进来的参数转换为字符串，作为 cache 的 key
    const keyInCache = JSON.stringify(args)

    // 访问 cache ，检查传递的参数是否作为 cache 的 key 存在。
    // 当前传递的参数不存在于 cache 中，则给 cache 添加键值对，并调用函数。
    if (!cache.has(keyInCache)) cache.set(keyInCache, fn(...args))

    /**
     * 两种情况：
     *    1. 当前传递的参数存在于 cache 中，直接通过 key 返回对应值；
     *    2. 不存在于 cache 中时，此时也通过 set 方法设置了相应的键值对，也可以通过 get 方法返回结果。
     */
    return cache.get(keyInCache) as number
  }
}

// ------------------ 测试代码 ----------------------
let callCount = 0
const memoizedFn = memoize(function (a, b) {
  console.log('函数被调用了！！！！')
  callCount += 1
  return a + b
})
console.log(memoizedFn(2, 3)) // 5，调用函数
console.log('-------------------------')
console.log(memoizedFn(2, 3)) // 5，未调用函数
console.log('-------------------------')
console.log(callCount) // 1
