const CHUNK_SIZE = 1024 * 1024 * 5 // 切片大小

// 开启多线程计算 createChunk() 函数中的 MD5 哈希值，降低主线程的计算压力。线程数量最好与浏览器的 CPU 内核数量一致
const THREAD_COUNT = navigator.hardwareConcurrency || 4 // 定义线程数量，与 CPU 内核数量一致

export const cutFile = async (file) => {
  return new Promise((resolve, _) => {
    const result = []
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE) // 计算切片数量
    const chunkPerThread = Math.ceil(chunkCount / THREAD_COUNT) // 计算每个线程能够分到多少个分片
    let completedThreadCount = 0 // 记录线程的完成数量

    // 循环给每个线程分配任务
    for (let i = 0; i < THREAD_COUNT; i++) {
      // 创建一个线程并分配任务。注意，Worker 中的路径不是相对于当前 JS 文件，而是相对于页面（HTML）或模块加载器的上下文。
      const worker = new Worker('./utils/worker.js', {
        type: 'module',
      })

      // 计算当前线程需要处理的分片的结束索引范围
      let startChunkIndex = i * chunkPerThread
      let endChunkIndex =
        (i + 1) * chunkPerThread > chunkCount ? chunkCount : (i + 1) * chunkPerThread

      // 让线程开始工作，主线程给 worker 线程发送信息
      worker.postMessage({
        file,
        CHUNK_SIZE,
        startChunkIndex,
        endChunkIndex,
      })

      // 监听 worker 线程中的信息
      worker.onmessage = (e) => {
        // 监听线程的消息，将结果按照之前的顺序保存到数组中
        for (let i = startChunkIndex; i < endChunkIndex; i++) {
          result[i] = e.data[i - startChunkIndex]
        }
        worker.terminate() // 线程执行完毕，终止线程
        completedThreadCount++

        if (completedThreadCount === THREAD_COUNT) {
          resolve(result) // 所有线程执行完毕，返回结果
        }
      }

      worker.onerror = (err) => {
        console.error('Worker 报错:', err)
      }
    }
  })
}

//#region ----------------------------- 使用主线程执行分片任务 -----------------------------
// // 创建多个 Promise 对象，用于并行执行分片任务
// const promises = []

// // 循环创建文件切片
// for (let i = 0; i < chunkCount; i++) {
//   // 第一个参数表示文件，第二个参数表示读取的起始位置，第三个参数表示读取的长度
//   // 注意：Promise.all() 等方式收集结果时，结果数组的顺序与原始 Promise 顺序一致，与实际完成顺序无关。
//   promises.push(createChunk(file, i, CHUNK_SIZE)) // 将每个切片创建成一个 Promise 对象，并保存到数组中
// }
// const results = await Promise.all(promises)

// return results
// }
//#endregion ----------------------------- 使用主线程执行分片任务 -----------------------------
