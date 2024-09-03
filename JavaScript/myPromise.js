// 声明构造函数
function MyPromise(executor) { 
  // 添加Promise对象中的属性
  this.PromiseState = 'pending' // 创建时为pending
  this.PromiseResult = null // 初始值为 null 
  this.callback = [] // 保存then方法中的回调函数

  // 预先保存实例对象的 this 值
  const self = this  

  // resolve函数
  // 调用方式 resolve() => this 指向window
  function resolve(data) {
    // console.log(this); //window    
    // Promise的状态只修改一次
    if (self.PromiseState !== 'pending') return
    // 1. 修改对象状态(promiseState)
    self.PromiseState = 'fulfilled' 
    // 2. 设置对象结果值(promiseResult)
    self.PromiseResult = data
    // 如果callback中有onResolved回调函数，说明promise状态为pending
    // 则 需要在promise状态改变之后调用onResolved回调函数
    // 通过遍历callback数组执行每一个回调函数
    // 让then中的回调函数异步执行
    setTimeout(() => {
      self.callback.forEach(item => item.onResolved(data))
    })
  }

  // reject函数
  function reject(err) {
    // Promise的状态只修改一次
    if (self.PromiseState !== 'pending') return
    // 1. 修改对象状态(promiseState)
    self.PromiseState = 'rejected' 
    // 2. 设置对象结果值(promiseResult)
    self.PromiseResult = err
    // 如果callback中有onRejected回调函数，说明promise状态为pending
    // 则 需要在promise状态改变之后调用onRejected回调函数
    // if (self.callback.onRejected)
    //   self.callback.onRejected(err)

    // 让then中的回调函数异步执行
    setTimeout(() => {
      self.callback.forEach(item => item.onRejected(err))
    })
  }

  // 执行器函数执行resolve函数/reject函数
  // 执行器函数是同步调用的
  // 使用 try..catch 包裹，处理throw异常
  try {
    executor(resolve, reject)    
  } catch (error) {
    reject(error)
  }  
}

// 添加 then 方法
// 该方法由Promise实例对象调用，则this指向Promise实例
// 要实现then方法的返回结果是一个promise对象
// 并且这个promise的状态随回调函数的返回值改变
MyPromise.prototype.then = function(onResolved, onRejected) {
  let self = this
  // 允许不传onRejected参数
  if (typeof onRejected !== 'function') {
    onRejected = err => { throw err }
  }
  // 允许不传onResolved参数
  if (typeof onResolved !== 'function') {
    onRejected = data => data
  }

  return new MyPromise((resolve, reject) => {
    // 封装设置promise返回状态的函数
    function callback(fnType) {
      try {
        // promise的状态随回调函数的返回值改变
        // 获取回调函数的返回值，注意this指向
        let result = fnType(self.PromiseResult)
        // 对返回值进行判断
        if (result instanceof MyPromise) {
          // 返回结果是一个Promise值，调用then方法
          result.then((data) => resolve(data), (err) => reject(err))
        }else {
          // 非Promise值，状态设置为 fulfilled
          resolve(result)
        }        
      } catch (error) {
        // 如果报错则状态修改为 reject
        reject(error)
      }
    }

    // 根据PromiseState的值调用不同的回调函数
    
    if (this.PromiseState === 'fulfilled') {
      // 让then中的回调函数异步执行
      setTimeout(() => {
        callback(onResolved)
      })
      
    }
    
    // 当promiseState的值为rejected时，调用onRejected
    if(this.PromiseState === 'rejected') {
      // 让then中的回调函数异步执行
      setTimeout(() => {
        callback(onRejected)
      })
    }  
  
    // 若Promise构造函数中的任务是一个异步任务
    // 则在执行then方法时，PromiseState值为pending
    if (this.PromiseState === 'pending') {
      // 保存then方法中的两个回调函数
      // 在promise状态发生改变时执行回调函数
      // 即 要在resolve和reject方法中执行回调函数
      // this.callback.push({onResolved, onRejected})

      // 在异步任务中，想让Promise的状态变为fulfilled / rejected
      // 必须在这里执行 resolve / reject 方法
      this.callback.push({
        onResolved: function(){
          callback(onResolved)
        }, 
        onRejected: function(){
          callback(onRejected)
        }
      })
    }
  })
}

// 添加catch方法
MyPromise.prototype.catch = function(onRejected) {
  return this.then(undefined, onRejected)
}

// 添加resolve静态方法 => 返回一个promise对象
MyPromise.resolve = function(data) {
  return new MyPromise((resolve, reject) => {
    // 对返回值进行判断
    if (data instanceof MyPromise) {
      // 返回结果是一个Promise值，调用then方法
      result.then((data) => resolve(data), (err) => reject(err))
    }else {
      // 非Promise值，状态设置为 fulfilled
      resolve(data)
    }
  })
}

// 添加reject静态方法 => 返回一个promise对象
// 返回的永远是rejected状态
MyPromise.reject = function(err) {
  return new MyPromise((resolve, reject) => {
    reject(err)
  })
}

// 添加all静态方法
// 参数是一个由promise对象组成的数组
MyPromise.all = function(promises) {
  return new MyPromise((resolve, reject) => {
    // 声明变量记录fulfilled状态的promise对象
    let count = 0
    // 声明数组，当所有promise对象都是fulfilled时保存promises对象
    let arr = []

    // 遍历promises数组
    for (let i = 0; i < promises.length; i++) {
      // 判断每一个promise对象的状态
      promises[i].then(
        data => {
          // 如果状态是fulfilled，则会执行这段代码
          // 只要所有的promise对象都是fulfilled，才能调用resolve()
          count++
          // 不使用push，是因为保证返回数组中的顺序与参数中的顺序一样
          arr[i] = data 
          if (count === promises.length) resolve(arr)
        },
        err => {
          // 如果状态是rejected，则会执行这段代码
          // 只要有一个失败，所有的Promise状态设置为rejected
          reject(err) // 可以直接调用MyPromise参数中的reject方法
        }
      )
    }
  })
}

// 添加race静态方法
// promise对象的状态只能被改变一次
MyPromise.race = function(promises) {
  return new MyPromise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(
        data => {
          // 谁先走到这里谁就改变大Promise的状态
          resolve(data)
        },
        err => {
          // 谁先走到这里谁就改变大Promise的状态
          reject(err)
        }
      )
    }
  })
}

