// 实现一个方法，清除字符串前后的空格。
let str = '   AAAA  BBBB '
// console.log(str.trim());
const myTrim = (str: string) => {
  const reg = /^\s* | \s*&/g
  return str.replace(reg, '')
}
console.log(myTrim(str))
