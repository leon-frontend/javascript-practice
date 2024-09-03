// 使用块级作用域实现
// function count(){
//   for (let i=0; i<5; i++) {
//       setTimeout(() => console.log(i), 1000*i)
//   }
// }
// count()

// 使用闭包实现
function count() {
  for (var i = 1; i < 5; i++) {
    (function(i){
      setTimeout(() => {
        console.log(i);
      }, 1000*i);
    })(i)
  }
}
count()