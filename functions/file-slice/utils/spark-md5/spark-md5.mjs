// TODO UMD 规范的文件中没有 ES 模块语法，需要进行处理，让 UMD 规范的库支持 ESM 语法
import './spark-md5-umd.mjs' // 会挂载到 window / self
export default self.SparkMD5 // 在浏览器或 Worker 环境中
