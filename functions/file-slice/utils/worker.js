import { createChunk } from './create-chunk.mjs'

onmessage = async (e) => {
  const { file, CHUNK_SIZE, startChunkIndex, endChunkIndex } = e.data
  // 使用模板字符串打印
  console.log(
    `正在创建文件切片，文件名：${file.name}，文件大小：${CHUNK_SIZE}，开始位置：${startChunkIndex}，结束位置：${endChunkIndex}`
  )

  // 创建多个 Promise 对象，用于并行执行分片任务
  const promises = []

  // 循环创建文件切片
  for (let i = startChunkIndex; i < endChunkIndex; i++) {
    // 第一个参数表示文件，第二个参数表示读取的起始位置，第三个参数表示读取的长度
    // ! 注意：Promise.all() 等方式收集结果时，结果数组的顺序与原始 Promise 顺序一致，与实际完成顺序无关。
    promises.push(createChunk(file, i, CHUNK_SIZE)) // 同步执行，将每个文件切片创建成一个 Promise 对象，并保存到数组中
  }
  const results = await Promise.all(promises) // 异步执行

  postMessage(results) // 将结果发送给主线程
}
