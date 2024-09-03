// 红绿灯输出函数
function red() {
  console.log('red');
}
function green() {
  console.log('green');
}
function yellow() {
  console.log('yellow');
}

// 使用Promise + 延时器
const light = (fn, timer) => {
  return new Promise((resolve, reject) => {
    fn()
    setTimeout(() => {
      resolve()
    }, timer)
  })
}

const step = () => {
  Promise.resolve().then(() => {
    return light(red, 3000)
  }).then(() => {
    return light(yellow, 2000)
  }).then(() => {
    return light(green, 3000)
  }).then(() => {
    step()
  })
}

step()