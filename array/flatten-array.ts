//#region -------------------- 1. 普通的数组扁平化 ---------------------------
// https://fe.ecool.fun/topic/b828c477-4689-4a3d-ab51-e41d76bd62e2?orderBy=updateTime&order=desc&tagId=26
// let arr = [1, 2, [3, 4, [5, 6], 7], 8, [9, [10, [11, 12, [13]]]]]

// 1.1 方法 1：使用递归求解
// const flat = (arr) => {
//   let res = []
//   const recursion = (arr) => {
//     for (let i = 0; i < arr.length; i++) {
//       if (Array.isArray(arr[i])) recursion(arr[i])
//       else res.push(arr[i])
//     }
//   }
//   recursion(arr)
//   return res
// }
// console.log(flat(arr))

// 1.2 使用数组的 join 方法求解
// let arr2 = [1, 2, [3, 4, ['a', 6], 7], 8, [9, [10, [11, 12, ['b']]]]]
// const flat = (arr) => {
//   let res = arr.join().split(',')
//   return res
// }
// console.log(flat(arr2))

// 1.3 使用展开运算符求解
let arr3 = [1, 2, [3, 4, ['a', 6], 7], 8, [9, [10, [11, 12, ['b']]]]]
const flat = (arr: any) => {
  // 只要arr中有一个元素是数组，就执行循环
  while (arr.some((item: any) => Array.isArray(item))) arr = [].concat(...arr)
  return arr
}
console.log(flat(arr3))
//#endregion ------------------- 1. 普通的数组扁平化 --------------------------

//#region -------------------- 2. 带"层级"要求的数组扁平化 -------------------------
/**
 * 扁平化嵌套数组（带层级要求）：
 *    请你编写一个函数，它接收一个 多维数组 arr 和它的深度 n ，并返回该数组的 扁平化 后的结果。
 *    多维数组 是一种包含整数或其他 多维数组 的递归数据结构。
 *    数组扁平化是对数组的一种操作，定义是将原数组部分或全部子数组删除，并替换为该子数组中的实际元素。
 *    第一层数组中元素的深度被认为是 0。
 *    请在没有使用内置方法 Array.flat 的前提下解决这个问题。
 *    Link：https://leetcode.cn/problems/flatten-deeply-nested-array/description/
 * 理解：
 *    只有当嵌套的数组深度大于 0 并且 小于等于 n 时，才应该执行扁平化操作。
 */

type MultiDimensionalArray = (number | MultiDimensionalArray)[]

const flatWithLayer = (
  arr: MultiDimensionalArray,
  n: number
): MultiDimensionalArray => {
  // 特殊情况处理：当嵌套的深度等于0时，返回原数组
  if (!n) return arr

  // 定义返回的结果数组
  const res: MultiDimensionalArray = []

  // 定义递归函数，使用递归求解
  const recursion = (nums: MultiDimensionalArray, layer: number) => {
    // 遍历数组中的每个元素
    nums.forEach((num) => {
      // 如果当前遍历的元素是一个数组，并且当前的 layer 层级要大于 0 和小于等于 n
      if (Array.isArray(num) && layer > 0 && layer <= n)
        recursion(num, layer - 1)
      else res.push(num)
    })
  }

  // 调用递归函数
  recursion(arr, n)

  return res
}

// 测试代码
const arr2 = [1,2,3,[4,5,6],[7,8,[9,10,11],12],[13,14,15]]
const n = 1
console.log('带"层级"要求的数组扁平化：', flatWithLayer(arr2, n))
//#endregion ----------------- 2. 带"层级"要求的数组扁平化 -------------------------
