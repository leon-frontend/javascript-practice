// 拼接url，实现jsonp,params是一个对象
// https://www.zhangxinxu.com/wordpress/2019/08/js-url-urlsearchparams/
const jsonp = ({ url, params, callbackName }) => {
  const completeURL = () => {
    // 使用URLSearchParams方法将 params 对象变为 xxx&xxx 格式
    // var searchParams = new URLSearchParams({"s": "url", "someId": 2});
    // console.log(searchParams.toString()); // 输出 => s=url&someId=2
    let urlParams = new URLSearchParams(params)
    urlParams.append('callback', callbackName)
    return `${url}?${urlParams.toString()}`
  }

  return new Promise((resolve, reject) => {
    // 动态生成 script 标签
    const scriptNode = document.createElement('script')
    // 给 script 标签的 src 属性赋值 completeURL
    scriptNode.src = completeURL()

    // 成功获取数据
    window[callbackName] = data => {
      resolve(data)
      scriptNode.remove() // 获取完数据后，就移除创建的script节点
    }

    // 获取数据失败
    scriptNode.onerror = () => {
      reject(new Error('JSONP request failed'))
      scriptNode.remove() // 获取完数据后，就移除创建的script节点
    }

    // 将生成的 script 标签插入 DOM 中 => 相当于发请求
    document.body.appendChild(scriptNode)
  })
}