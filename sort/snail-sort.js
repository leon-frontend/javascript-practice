/**
 * 蜗牛排序:
 *    请你编写一段代码为所有数组实现  snail(rowsCount，colsCount) 方法，该方法将 1D 数组转换为以蜗牛排序的模式的 2D 数组。
 *    无效的输入值应该输出一个空数组。当 rowsCount * colsCount !==nums.length 时。这个输入被认为是无效的。
 *    蜗牛排序从左上角的单元格开始，从当前数组的第一个值开始。
 *    然后，它从上到下遍历第一列，接着移动到右边的下一列，并从下到上遍历它。
 *    将这种模式持续下去，每列交替变换遍历方向，直到覆盖整个数组。
 * 示例：
 *    例如，当给定输入数组  [19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15] ，
 *    当 rowsCount = 5 且 colsCount = 4 时，需要输出矩阵如下图所示。
 *    19  17  16  15
 *    10  1   14  4
 *    3   2   12  20
 *    7   5   18  11
 *    9   8   6   13
 *    遍历顺序如下：
 *        第一列：从上到下（19 → 10 → 3 → 7 → 9）
 *        第二列：从下到上（8 → 5 → 2 → 1 → 17）
 *        第三列：从上到下（16 → 14 → 12 → 18 → 6）
 *        第四列：从下到上（13 → 11 → 20 → 4 → 15）
 */

// 实现蜗牛排序
Array.prototype.snail = function (rowsCount, colsCount) {
  const oneDLength = this.length

  // 如果行数和列数的乘积不等于数组长度，返回空数组
  if (rowsCount * colsCount !== oneDLength) return []

  // 创建一个二维数组，所有元素初始化为 0
  const res = Array.from({ length: rowsCount }, () => Array(colsCount).fill(0))

  let oneDIndex = 0 // 1D 数组的索引

  for (let col = 0; col < colsCount; col++) {
    if (col % 2 === 0) {
      // 从上到下遍历列
      for (let row = 0; row < rowsCount; row++) {
        res[row][col] = this[oneDIndex++]
      }
    } else {
      // 从下到上遍历列
      for (let row = rowsCount - 1; row >= 0; row--) {
        res[row][col] = this[oneDIndex++]
      }
    }
  }

  return res
}

// ---------------- 测试代码 ----------------
const arr = [
  19, 10, 3, 7, 9, 8, 5, 2, 1, 17, 16, 14, 12, 18, 6, 13, 11, 20, 4, 15,
]
console.log(arr.snail(5, 4))
