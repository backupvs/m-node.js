"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Temp id
const IdGenerator = ((init) => {
    let stupidId = init || 1;
    return () => {
        return stupidId++;
    };
})(); // TODO NEW ID GENERATOR
class Item {
    constructor(text) {
        this.id = IdGenerator();
        this.text = text;
        this.checked = false;
    }
    getId() {
        return this.id;
    }
    get getText() {
        return this.text;
    }
    setText(text) {
        this.text = text;
    }
    getChecked() {
        return this.checked;
    }
    setChecked(checked) {
        this.checked = checked;
    }
}
exports.default = Item;
