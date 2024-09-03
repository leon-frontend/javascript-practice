// 合并两个有序的数组
const merge = (nums, left, mid, right) => {
  // 创建一个临时的数组用于保存排序结果
  const tmp = Array(right - left + 1)
  let i = left, j = mid + 1, k = 0
  while (i <= mid && j <= right) {
    if (nums[i] <= nums[j]) tmp[k++] = nums[i++]
    else tmp[k++] = nums[j++]
  }
  
  while (i <= mid) tmp[k++] = nums[i++]
  while (j <= right) tmp[k++] = nums[j++]
  
  // 将临时的数组赋值给原数组
  for (let k = 0; k < tmp.length; k++) nums[left+k] = tmp[k]
}

// const nums = [4, 5, 6, 1, 2, 3]
// merge(nums, 0, 2, nums.length - 1)
// console.log(nums)

const mergeSort = (nums, left, right) => {
  if (left >= right) return 
  let mid = Math.floor(left + (right - left) / 2)
  
  mergeSort(nums, left, mid)
  mergeSort(nums, mid + 1, right)
  merge(nums, left, mid , right)
}

const nums = [4, 7, 5, 2, 6, 11, 9, 3]
mergeSort(nums, 0, nums.length - 1)
console.log(nums)