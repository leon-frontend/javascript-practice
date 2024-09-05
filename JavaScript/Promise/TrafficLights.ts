// 红绿灯输出函数
const red = (): void => {
  console.log('red')
}
const green = (): void => {
  console.log('green')
}
const yellow = (): void => {
  console.log('yellow')
}

// 使用 Promise + 延时器
const light = (fn: () => void, timer: number): Promise<void> => {
  return new Promise((resolve) => {
    fn()
    setTimeout(() => {
      resolve()
    }, timer)
  })
}

// --------- 实现红绿灯交替输出 ---------
const step = (): void => {
  Promise.resolve()
    .then(() => light(red, 3000))
    .then(() => light(yellow, 2000))
    .then(() => light(green, 1000))
    .then(() => step()) // 再次调用 step 以形成循环
}

// 调用函数
step()
