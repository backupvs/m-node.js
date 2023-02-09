type Key = string | number | symbol;

function mapObject<Value, Result>(
    object: Record<Key, Value>,
    func: (value: Value) => Result
): Record<Key, Result> {

    const keys = Object.keys(object);
    let newObject: Record<Key, Result> = {};

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const element = object[key];
        newObject[key] = func(element);
    }

    return newObject;
}


const newObj = mapObject({ "roma": 5, "vasya": 2 }, (x) => x > 2); // { "roma": true, "vasya": false }
