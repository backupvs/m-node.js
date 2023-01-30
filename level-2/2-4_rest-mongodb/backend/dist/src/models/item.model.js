"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
    constructor(text) {
        this.text = text;
        this.checked = false;
    }
    getText() {
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
    toJSON() {
        return {
            text: this.text,
            checked: this.checked
        };
    }
}
exports.Item = Item;
exports.default = Item;
