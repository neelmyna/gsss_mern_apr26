const first = [2, 4, 6];
const second = [3, 5, 7];

const allNumbers1 = first.concat(second)
console.log('allNumbers1 = ', allNumbers1)

const allNumbers2 = [...first, ...second]
console.log('allNumbers2 = ', allNumbers2)

const allNumbers3 = [...first, second]
console.log('allNumbers3 = ', allNumbers3)
