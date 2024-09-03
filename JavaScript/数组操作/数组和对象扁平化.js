// ------------------- 对象扁平化 -------------------
// https://fe.ecool.fun/topic/aea31e8b-4929-4a02-8fe5-8eb27fd663bf?orderBy=updateTime&order=desc&tagId=26
// const obj = {
// 	a: {
//   	b: 1,
// 		c: 2,
// 		d: {
// 			e: 5
// 		}
//   },
//   b: [1, 3, {a: 2, b: 3}],
//   c: 3
// }
// 输入格式 => 数组用[]，对象用.
// {
//   'a.b': 1,
//   'a.c': 2,
//   'a.d.e': 5,
//   'b[0]': 1,
//   'b[1]': 3,
//   'b[2].a': 2,
//   'b[2].b': 3
//    c: 3
// }

// function objFlatten(obj = {}) {
//   const res = {} // 声明返回的对象
//   // preKey 用于累积父级键的前缀，默认为空字符串
//   function flat(obj, preKey = '') {
//     for (let [key, value] of Object.entries(obj)) {   
//       // 若当前遍历的值就是一个普通数据类型
//       let newKey
//       // 判断当前遍历的 对象 是否是数组，从而确定键的前缀
//       // 如果当前遍历的obj是数组，则前缀使用[]
//       if (Array.isArray(obj)) {
//         // 如果preKey为空，说明在第一层，则不用加前缀
//         newKey = preKey ? `${preKey}[${key}]` : key
//       }else { // 当前对象不是数组而是一个普通对象        
//         // 如果preKey为空，说明在第一层，则不用加前缀
//         newKey = preKey ? `${preKey}.${key}` : key
//       }

//       // 根据当前遍历对象中的value类型，判断是否递归遍历
//       if (value && typeof value === 'object') {
//         flat(value, newKey)
//       }else {
//         res[newKey] = value
//       }
//     }
//   }

//   flat(obj)
//   return res
// }

// console.log(objFlatten(obj));



// ------------------- 数组扁平化 -------------------
// https://fe.ecool.fun/topic/b828c477-4689-4a3d-ab51-e41d76bd62e2?orderBy=updateTime&order=desc&tagId=26
let arr = [1,2,[3,4,[5,6],7],8,[9,[10,[11,12,[13]]]]]

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
let arr3 = [1,2,[3,4,['a',6],7],8,[9,[10,[11,12,['b']]]]]
const flat = (arr) => {
  // 只要arr中有一个元素是数组，就执行循环
  while (arr.some(item => Array.isArray(item))) arr = [].concat(...arr)
  return arr
}
console.log(flat(arr3));
