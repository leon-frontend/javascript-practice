function imgLoad(url) {
  return new Promise((resolve, reject) => {
    // 创建一个img标签
    const img = new Image()
    img.src = url // 给图片设置路径

    // 绑定图片加载成功的事件
    img.onload = function() {
      resolve(img)
    }

    // 绑定加载失败的事件
    img.onerror = function() {
      reject(`${url}无法正常请求`)
    }
  })
}

// 使用示例
imgLoad('path/image.jpg').then(
  (img) => {
    // 给DOM添加img标签
    document.body.appendChild(img)
  }
).catch(err => {
  console.log('失败', err);
})