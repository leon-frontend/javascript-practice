// ------------------- 数组扁平化 -------------------
// https://fe.ecool.fun/topic/b828c477-4689-4a3d-ab51-e41d76bd62e2?orderBy=updateTime&order=desc&tagId=26
let arr = [1, 2, [3, 4, [5, 6], 7], 8, [9, [10, [11, 12, [13]]]]]

// 1. 递归
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
// console.log(flat(arr));

// 2. join
// let arr2 = [1,2,[3,4,['a',6],7],8,[9,[10,[11,12,['b']]]]]
// const flat = (arr) => {
//   let res = arr.join().split(',')
//   return res
// }
// console.log(flat(arr2));

// 3. 展开运算符
let arr3 = [1, 2, [3, 4, ['a', 6], 7], 8, [9, [10, [11, 12, ['b']]]]]
const flat = (arr) => {
  // 只要arr中有一个元素是数组，就执行循环
  while (arr.some((item) => Array.isArray(item))) arr = [].concat(...arr)
  return arr
}
console.log(flat(arr3))
