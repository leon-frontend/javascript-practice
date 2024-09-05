// const arr = [1, 1, '1', 17, true, true, false, false, 'true', 'a', {}, {}];

// 1. set
// console.log(new Set(arr));

// 2. 使用splice在指定位置删除元素
// const deleteDuplicate = (arr) => {
//   let len = arr.length
//   for (let i = 0; i < len; i++) {
//     for (let j = i + 1; j < len; j++) {
//       if (arr[i] === arr[j]) {
//         arr.splice(j, 1)
//         len--
//         j--
//       }
//     }
//   }
// }
// deleteDuplicate(arr)
// console.log(arr);

// 3. 使用 indexOf() 方法返回数组中第一次出现给定元素的下标，如果不存在则返回 -1。
// const deleteDuplicate = (arr) => {
//   const res = []
//   for (let i = 0; i < arr.length; i++) {
//     if (res.indexOf(arr[i]) === -1) res.push(arr[i])
//   }
//   return res
// }
// console.log(deleteDuplicate(arr));

// --------------------- 有序数组去重 --------------------------
const nums = [1, 1, 2, 2, 2, 3, 4, 4, 4, 5]
function deleteDuplicate(nums: number[]) {
  if (!nums.length || nums.length === 1) return nums

  let slow = 0,
    fast = 1
  while (fast < nums.length) {
    if (nums[slow] !== nums[fast]) {
      slow++
      ;[nums[slow], nums[fast]] = [nums[fast], nums[slow]]
    }
    fast++
  }

  nums.splice(slow + 1)
  return nums
}
console.log(deleteDuplicate(nums))
