function sum(a,b) {
  console.log('excute sum')
  return a+b
}

function memoize(func) {
  let cache = new Map()
  const memoizeFn = function(...args) {
    let key = JSON.stringify(args)
    if (!cache.has(key)) cache.set(key, func.apply(this, args))
    return cache.get(key)
  }
  memoizeFn.deleteCache = function(...args){
    let key = JSON.stringify(args)
    if (cache.has(key)) cache.delete(key)
  }

  return memoizeFn
}

const sumWapper = memoize(sum)
const num1 = sumWapper(1, 2)
console.log("num1 => ", num1);// num1会输出excute sum
console.log('----------------------');
const num2 = sumWapper(1, 2)
console.log("num2 => ", num2); // 不会输出excute sum
console.log('----------------------');
sumWapper.deleteCache(1,2)
const num3 = sumWapper(1, 2)
console.log("num2 => ", num3); // 不会输出excute sum
console.log('----------------------');



