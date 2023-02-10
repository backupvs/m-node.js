"use strict";
// 3
class Rectangle {
}
class Circle {
}
function produce(someClass, count) {
    return Array.from(Array(count), () => new someClass());
}
let r = produce(Rectangle, 10);
let c = produce(Circle, 20);
console.log(r);
console.log(c);
