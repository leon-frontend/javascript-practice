/*
问题：
浏览器在 dragstart 事件期间会创建一个“拖拽影子元素”（Drag Image），而这个影子元素就是我们看到的正在拖动的那个可视化元素。
如果立刻给元素添加类名（比如 .moving），这个类名会同时出现在真实的 DOM 元素上和拖拽影子元素上，这就导致拖拽的元素和它的原始位置都变了样式。
*/

// 使用事件委托
const list = document.querySelector('.list')
let draggingElement

// 给 list 绑定拖拽开始事件，修改元素占位空间的样式
list.addEventListener('dragstart', (e) => {
  e.dataTransfer.effectAllowed = 'move' // 修改拖拽时的鼠标样式
  draggingElement = e.target // 获取正在拖拽的元素
  // 需求：被拖拽的元素样式不变；只改变元素占位空间的样式。可以使用异步的方法解决上述问题
  // 延迟添加类名，让类名只作用于原始 DOM 元素，不影响浏览器生成的拖拽影子元素，从而实现“只改变原位置样式、不改变拖拽元素外观”的效果。
  setTimeout(() => {
    // 给真正触发事件的元素添加 moving 类名，即元素被拖拽时的样式
    e.target.classList.add('moving')
  }, 0)
})

// 实现拖拽排序。当鼠标拖拽着元素，并且进入其他元素时，触发 dragenter 事件。e.target 是进入元素的值。
list.addEventListener('dragenter', (e) => {
  e.preventDefault() // 浏览器默认对哪些元素可以接受“拖放”是有保护机制的，导致拖拽的元素无法真正"放下来"。
  // console.log('e.target: ', e.target) // e.target 包括元素自身和父元素
  if (!draggingElement) return

  const target = e.target

  // 当鼠标进入的元素是父元素或元素自身时，不进行处理
  if (target === list || target === draggingElement) return

  // 将所有拖拽元素创建成一个数组，并获取当前被拖拽元素和当前进入的元素（目标元素）的下标
  const dragIndex = [...list.children].indexOf(draggingElement)
  const targetIndex = [...list.children].indexOf(target)

  // 实现排序
  if (dragIndex < targetIndex) {
    list.insertBefore(draggingElement, target.nextElementSibling)
  } else {
    list.insertBefore(draggingElement, target)
  }
})

list.addEventListener('dragover', (e) => {
  e.preventDefault()
})

// 拖拽完成后需要移除 moving 类名，并恢复元素样式
list.addEventListener('dragend', (e) => {
  // 移除 moving 类名，恢复元素样式
  draggingElement.classList.remove('moving')

  // 清空正在拖拽的元素
  draggingElement = null
})
