"use strict";
const a = {
    hello: {
        cvalue: 1
    },
    world: {
        cvalue: {
            yay: {
                cvalue: "2"
            }
        }
    },
    one: {
        cvalue: "20"
    },
    two: {
    // 2022
    },
    three: {
        cvalue: "hello" // 2022
    }
};
function summ(a) {
    const x = Object.keys(a)
        .map(k => {
        const elem = a[k];
        if (elem === undefined || elem.cvalue === undefined)
            return 2022;
        if (typeof elem.cvalue === "string")
            return +elem.cvalue || 2022;
        if (typeof elem.cvalue === "number")
            return elem.cvalue;
        return summ(elem.cvalue);
    })
        .reduce((acc, n) => acc += n, 0);
    return x;
}
console.log(summ(a)); // return 4067
