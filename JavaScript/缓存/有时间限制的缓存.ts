/**
 * 有时间限制的缓存:
 *    编写一个类，它允许获取和设置键-值对，并且每个键都有一个 过期时间 。该类有三个公共方法：
 *    set(key, value, duration) ：接收参数为整型键 key 、整型值 value 和以毫秒为单位的持续时间 duration 。
 *                                一旦 duration 到期后，这个键就无法访问。
 *                                如果相同的未过期键已经存在，该方法将返回 true ，否则返回 false 。
 *                                如果该键已经存在，则它的值和持续时间都应该被覆盖。
 *    get(key) ：如果存在一个未过期的键，它应该返回这个键相关的值。否则返回 -1 。
 *    count() ：返回未过期键的总数。
 *    Link: https://leetcode.cn/problems/cache-with-time-limit/
 */
// 类型声明
type MapEntry = { value: number, timeout: NodeJS.Timeout }

// 定义类，实现"有时间限制的缓存"
class TimeLimitedCache {
  // 使用 ts 时必须显示声明变量类型
  cache: Map<number, MapEntry>

  constructor() {
    // timeout 属性用来保存定时器的 id，用于删除定时器
    this.cache = new Map<number, MapEntry>()
  }

  // 设置键-值对
  set(key: number, value: number, duration: number): boolean {
    // 首先判断 key 是否存在，通过 value 值来判断。
    const valueInCache = this.cache.get(key)

    // 若存在，则清除对应的定时器。
    if (valueInCache) clearTimeout(valueInCache.timeout)

    // 不管 key 是否存在，都开启新的定时器
    const timeout = setTimeout(() => this.cache.delete(key), duration)

    // 更新 cache 中的键-值对
    this.cache.set(key, {value, timeout})

    // 如果相同的未过期键已经存在，该方法将返回 true ，否则返回 false
    return Boolean(valueInCache)
  }

  // get 方法用于根据 key 获取 value 值
  get(key: number): number {
    return this.cache.has(key) ? (this.cache.get(key) as MapEntry).value : -1
  }

  // count 方法用于返回未过期键的总数
  count(): number {
    return this.cache.size
  }
}

// -------------- 测试代码 ---------------
const timeLimitedCache = new TimeLimitedCache() // 创建实例
console.log(timeLimitedCache.set(1, 42, 1000)) // false
console.log(timeLimitedCache.get(1)) // 42
console.log(timeLimitedCache.count()) // 1