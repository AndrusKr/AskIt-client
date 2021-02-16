// const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
// const am = 2;
//
// async function getArray(arr, am) {
//   const arrResult = arr.reduce((init, next, index) => {
//     if (Number.isInteger(index / am)) {
//       return [...init, [next]];
//     }
//     init[Math.floor(index / am)].push(next);
//     return [...init];
//   }, []);
//
//   let check = [];
//   for (let i = 0; i < arrResult.length; i++) {
//     check.push(
//       await Promise.all(
//         arrResult[i].map((i) => {
//           return new Promise((resolve, reject) => {
//             setTimeout(() => resolve(i * 2), 100)
//           });
//         })
//       )
//     );
//   }
//   console.log("arrResult", arrResult);
//   console.log("check", check);
//   return check;
// }
//
// const start = new Date().getTime();
// console.time("getArray");
// getArray(arr1, am).then((res) => {
//   console.log("res", res);
//   const finish = new Date().getTime();
//   console.timeEnd("getArray");
//
//   console.log("time", finish - start);
// });

const arr1 = [1, 2, 3, 3, 3, 1, 2, 4, 5, 7, 7, 6, 7, 8, 9, 9, 9, 10];

// console.log("arr1", [...new Set(arr1)]);
console.log(
  "arr1",
  arr1.filter((i, idx, arr) => idx === arr.indexOf(i))
);
