// // 不准用 parseInt() 和
// const stringToNum = (str) => {
//   const reg = /^\d+$/
//   if (!reg.test(str)) throw new Error('该字符串无法转换为数字类型')
//   let res = 0
//   for (let s of str) {
//     // 使用字符的ASCII码值减去'0'的ASCII码值来得到数字
//     let digit = s.charCodeAt(0) - '0'.charCodeAt(0)
//     res = res * 10 + digit
//   }
//   return res
// }

let num = stringToNum('294735')
console.log(num, typeof num)
// let num2 = stringToNum('')

function stringToNum(str) {
  // const reg = /^\d+$/
  // if (!reg.test(str)) throw new Error('字符串不能转换为数字类型')
  if (isNaN(str)) throw new Error('字符串不能转换为数字类型!!!')
  let res = 0
  for (let s of str) {
    let digit = s.charCodeAt(0) - '0'.charCodeAt(0)
    res = res * 10 + digit
  }
  return res
}
