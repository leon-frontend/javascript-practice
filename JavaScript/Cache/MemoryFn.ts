type Fn = (...params: number[]) => number

function memoize(fn: Fn): Fn {
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
