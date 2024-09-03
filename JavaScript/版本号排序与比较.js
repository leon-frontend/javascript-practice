// let s = undefined
// console.log(+s); // NaN

let version1 = "1.01", version2 = "1.002"

// 方法 1 => 将两个版本号拆分成两个数组，从前往后比较每个元素
// let compareVersion = function(version1, version2) {
//   // 将字符串拆分成数组，每个元素是字符类型
//   const arr1 = version1.split('.')
//   const arr2 = version2.split('.')

//   while (arr1.length || arr2.length) {
//     let a1 = +arr1.shift() || 0
//     let a2 = +arr2.shift() || 0
//     if (a1 > a2) return 1
//     if (a1 < a2) return -1
//   }
//   return 0
// };

// console.log(compareVersion(version1, version2));

// 方法 2 => 使用两个指针遍历两个版本号，边遍历边比较
// let compareVersion = function(version1, version2) {
//   // 使用两个指针遍历两个版本号，边遍历边比较
//   let v1 = 0, v2 = 0

//   while (v1 < version1.length || v2 < version2.length) {
//     // 遍历version1，以.为分割存值
//     let val1 = 0 // 如果v1遍历完了，那么比较的就是0
//     for (; v1 < version1.length && version1[v1]!== '.'; v1++) val1 += (+version1[v1]) + val1 * 10
//     v1++ // 跳过.

//     let val2 = 0
//     for (; v2 < version2.length && version2[v2] !== '.'; v2++) val2 += (+version2[v2]) + val2 * 10
//     v2++   

//     if (val1 > val2) return 1
//     if (val1 < val2) return -1
//   }
//   return 0
// };

// ----------------------- 版本号排序 --------------------------------
const versions1 = ['2.1.0.1', '0.402.1', '10.2.1', '5.1.2', '1.0.4.5']
const versions2 = ['10.2.1', '5.1.2', '2.1.0.1', '1.0.4.5', '0.402.1']
const versions3 =['0.5.1', '0.1.1', '2.3.3', '0.302.1', '4.2', '4.3.5', '4.3.4.5']
function sortVersions(versions) {
  versions.sort((version1, version2) => {
    const arr1 = version1.split('.')
    const arr2 = version2.split('.')

    while (arr1.length || arr2.length) {
      let val1 = +arr1.shift() || 0
      let val2 = +arr2.shift() || 0
      if (val1 > val2) return -1
      if (val1 < val2) return 1
    }
    return 0
  })

  return versions
}
console.log(sortVersions(versions3));