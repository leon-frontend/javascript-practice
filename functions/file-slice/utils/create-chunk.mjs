// import SparkMD5 from './spark-md5.mjs' // 引入本地经过处理的 UMD 库
// import SparkMD5 from './spark-md5-es.mjs' // 引入本地支持 ESM 的库
import SparkMD5 from 'https://esm.sh/spark-md5' // 导入线上支持 ESM 的 CDN

// createChunk 函数用于读文件中的分片数据，并返回每一个分片信息
export const createChunk = (file, index, chunkSize) => {
  //  new Promise(...) 中代码是同步构造的，但它用于封装 异步逻辑
  return new Promise((resolve, _) => {
    const start = index * chunkSize // 该分片在原文件中的起始字节位置
    const end = Math.min(start + chunkSize, file.size) // 计算切片的结束字节位置

    // 返回一个新的 Blob 对象，表示从 file 的 start 字节到 end 字节（不包括 end）之间的那段二进制数据。
    // Blob 是 Binary Large Object（二进制大对象）的缩写。用于表示不可变的、原始二进制数据的一段数据。
    const blob = file.slice(start, end) // 创建一个文件切片

    /*
      MD5（Message Digest Algorithm 5）是一种 不可逆的哈希函数。
      ArrayBuffer 方法专门处理二进制数据，如文件、Blob、ArrayBuffer
      作用：给每个分片生成一个哈希（hash），可用于服务端去重、断点续传或校验完整性。
    */
    const spark = new SparkMD5.ArrayBuffer()

    // 浏览器原生的文件读取器，用来读取 Blob 或 File 对象中的二进制数据。
    const fileReader = new FileReader() // 创建一个文件读取器

    // load 事件：当 readAsArrayBuffer 完成后触发，可在回调中拿到 e.target.result（一个 ArrayBuffer）。
    fileReader.addEventListener('load', (e) => {
      // 通过 append() 将当前分片的二进制数据追加到 MD5 计算器中，再通过 end() 输出分片的唯一哈希值。
      spark.append(e.target.result) // 虽然该回调函数是异步的，但是它会排队等候主线程，最终在主线程中执行。该任务是一个 CPU 密集型任务，计算消耗非常大。
      resolve({
        start,
        end,
        index, // 分片序号，方便客户端排序、重传时定位。
        hash: spark.end(), // 分片哈希，用于完整性校验或断点续传判断。
        blob, // 实际的二进制分片数据，用于上传。
      })
    })

    /*
      readAsArrayBuffer 方法用来将文件内容读取为二进制的 ArrayBuffer。
      它是一个 异步操作，文件读取完成后会自动触发 load 事件，结果会保存在 fileReader.result 中。
    */
    fileReader.readAsArrayBuffer(blob)
  })
}
