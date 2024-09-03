// 元素交换
const swap = (nums, i , j) => {
  [nums[i], nums[j]] = [nums[j], nums[i]]
}

// 快速排序算法
// 特点 1 => 只保证左边的元素小于哨兵元素，右边的元素大于哨兵元素
//          不保证左右两边的元素有序 => 需要递归排
// 特点 2 => 如果哨兵元素是nums[left]，则在每次查找时要先从右往左查找
// 特点 3 => 要返回哨兵元素交换后的位置
const partition = (nums, left, right) => {
  let i = left, j = right // 声明左右指针

  while (i < j) {
    // 将nums[left]作为哨兵元素
    // 从左往右找到第一个大于哨兵元素的元素
    while (i < j && nums[i] >= nums[right]) i++    
    // 从右往左找到第一个小于哨兵元素的元素
    while (i < j && nums[j] <= nums[right]) j--
    
    // 将两个元素交换位置
    swap(nums, i, j)
  }

  // 循环退出时，i === j, 交换i和left的位置
  swap(nums, i, right)
  return i // 返回哨兵元素的索引
}

const quickSort = (nums, left, right) => {
  // 当数组长度是小于等于1时，中止递归
  if (left >= right) return 
  const pivot = partition(nums, left, right)
  // 递归排序左边的元素
  quickSort(nums, left, pivot - 1)
  // 递归排序右边的元素
  quickSort(nums, pivot + 1, right)
}

// test
const arr = [2,4,1,9,5,18,0,3,5]
quickSort(arr, 0, arr.length-1)
console.log(arr);

const nums = [5,2,8,25,5,0,6,22]
quickSort(nums, 0, nums.length-1)
console.log(nums);