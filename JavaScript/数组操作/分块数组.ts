/**
 * 分块数组问题描述：
 *    给定一个数组 arr 和一个块大小 size ，返回一个 分块 的数组。
 *    分块 的数组包含了 arr 中的原始元素，但是每个子数组的长度都是 size 。
 *    如果 arr.length 不能被 size 整除，那么最后一个子数组的长度可能小于 size 。
 *    你可以假设该数组是 JSON.parse 的输出结果。换句话说，它是有效的JSON。
 *    请你在不使用 lodash 的函数 _.chunk 的情况下解决这个问题。
 *    Link: https://leetcode.cn/problems/chunk-array/description/
 * 示例：
 *    输入：arr = [1,2,3,4,5], size = 1
 *    输出：[[1],[2],[3],[4],[5]]
 *    解释：数组 arr 被分割成了每个只有一个元素的子数组。
 * 使用场景：
 *    在 Web 应用程序中实现分页时，通常需要将大型项目列表分成较小的块或页面。
 */

// 使用数组的 slice 方法解题
function chunk(arr: number[], size: number): number[][] {
  // 声明返回的结果数组
  const res: number[][] = []

  // 声明索引值
  let index: number = 0

  // 遍历数组，使用 slice 方法进行分块
  while (index < arr.length) {
    res.push(arr.slice(index, index + size)) // 分块
    index += size // 更新索引值
  }

  return res
}

// ----------------------- 测试代码 ------------------------
const arr = [1, 2, 3, 4, 5]
const size = 2
console.log(chunk(arr, size))
