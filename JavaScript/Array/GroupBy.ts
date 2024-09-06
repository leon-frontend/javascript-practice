/**
 * 分组:
 *    请你编写一段可应用于所有数组的代码，使任何数组调用 array. groupBy(fn) 方法时，它返回对该数组 分组后 的结果。
 *    数组 分组 是一个对象，其中的每个键都是 fn(arr[i]) 的输出的一个数组，该数组中含有原数组中具有该键的所有项。
 *    提供的回调函数 fn 将接受数组中的项并返回一个字符串类型的键。
 *    每个值列表的顺序应该与元素在数组中出现的顺序相同。任何顺序的键都是可以接受的。
 *    请在不使用 lodash 的 _.groupBy 函数的前提下解决这个问题。
 *
 * 示例：
 *    输入：array = [{"id":"1"}, {"id":"1"}, {"id":"2"}],
 *         fn = function (item) { return item.id; }
 *    输出：
 *      { "1": [{"id": "1"}, {"id": "1"}], "2": [{"id": "2"}] }
 */

export {} // 在文件的顶部，添加一行 export {}，这样就能让 TypeScript 识别该文件为一个模块

// declare global 只能在 外部模块（external modules）中使用.
declare global {
  interface Array<T> {
    groupBy(fn: (item: T) => string): Record<string, T[]>
  }
}

Array.prototype.groupBy = function <T>(
  fn: (item: T) => string
): Record<string, T[]> {
  // 声明一个 对象 作为返回的结果对象
  const res: Record<string, T[]> = {}

  // 遍历数组中的每一个元素
  this.forEach((item: T) => {
    // 调用 fn 函数，得到 res 中的 key 值
    const key: string = fn(item)

    // 判断 key 是否存在于 res 中
    res.hasOwnProperty(key) ? res[key].push(item) : (res[key] = [item])
  })

  return res
}

// --------------- 测试代码 ---------------
const list = [{ id: '1' }, { id: '1' }, { id: '2' }]
const fn = (item: Record<string, string>) => item.id
console.log(list.groupBy(fn))
