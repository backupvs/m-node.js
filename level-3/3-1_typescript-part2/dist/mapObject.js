"use strict";
function mapObject(object, func) {
    const keys = Object.keys(object);
    let newObject = {};
    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const element = object[key];
        newObject[key] = func(element);
    }
    return newObject;
}
const newObj = mapObject({ "roma": 5, "vasya": 2 }, (x) => x > 2); // { "roma": true, "vasya": false }
console.log(newObj);
