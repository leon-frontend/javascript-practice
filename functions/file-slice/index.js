import { cutFile } from './cut-file.js'

const fileInput = document.querySelector('input[type="file"]')

fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0] // 获取文件
  console.time('cutFile')
  const chunks = await cutFile(file)
  console.timeEnd('cutFile')
  console.log(chunks)
})
