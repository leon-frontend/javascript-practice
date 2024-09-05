// 1. 给你一个字符串 'aaa {{b}} ccc {{d}}' 和一个对象{b:bbb, c: ccc, d: ddd}，输出'aaa bbb ccc ddd'
// 给定的字符串和对象
// const str = 'aaa {{b}} ccc {{d}}'
// const obj = { b: 'bbb', c: 'ccc', d: 'ddd'}

// const replaceStr = (str, obj) => {
//   // 用正则表达式匹配字符串
//   const reg = /{{(\w+)}}/g
//   // match 为匹配到的字符串
//   const resStr = str.replace(reg, (match, key) => {
//     if (obj.hasOwnProperty(key)) return obj[key]
//     return match
//   })
//   return resStr
// }
// console.log(replaceStr(str, obj));

// 2. 一段文章text有若干个句子,长度为len,文本中不含标点符号但有空格,其中存在着许多单词"coder”,请统计该单词出现过多少次?
// （不区分单词中每个字母的大小写)，使用将大写转换为小写的方法，用js实现这个问题。
const text = 'you have coderson in coder li COder coder icoder'

const countSum = (text) => {
  const lowerText = text.toLowerCase()
  const reg = /\bcoder\b/g
  const matchArr = lowerText.match(reg)
  console.log(matchArr)
  return matchArr ? matchArr.length : 0
}
console.log(countSum(text))
