declare type T = { id: string };

// 1
declare function construct(
    data: Partial<T>,
    adder: (data2: Partial<T>) => T
): void;

// 2
declare function construct2(
    data: T | Omit<T, "id">,
    adder: (data2: T | Omit<T, "id">) => T
): void;

// 3
class Rectangle {
    w!: number;
    h!: number;
}
class Circle {
    radius!: number;
}

function produce<Class>(someClass: new (...args: any[]) => Class, count: number): Class[] {
    return Array.from(Array(count), () => new someClass());
}

let r: Rectangle[] = produce(Rectangle, 10);
let c: Circle[] = produce(Circle, 20);

console.log(r);
console.log(c);