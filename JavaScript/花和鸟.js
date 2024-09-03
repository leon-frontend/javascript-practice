// // 有一种花， 两种鸟，花定时开放，鸟看到花开会叫，鸟的叫声不一样，用代码来实现这样一种场景
const FLOWER_TIME = 3000

const flowerOpen = () => {
  console.log('花开了！！！！！！')
  // 鸟叫
  birdSing()
}
const birds = ['AAA', 'BBB']

const birdSing = () => {
  // 随机选一个鸟
  let random = Math.floor(Math.random() * birds.length)
  console.log(birds[random]) // 鸟叫
}

flowerOpen()
setInterval(flowerOpen, FLOWER_TIME)
