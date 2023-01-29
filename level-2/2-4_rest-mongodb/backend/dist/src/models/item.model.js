"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Item = void 0;
class Item {
    /*private*/ constructor(/*id: number,*/ text) {
        // this.id = id;
        this.text = text;
        this.checked = false;
    }
    // public static async create(text: string) {
    //     let generatedId = await generateId();
    //     console.log("GENERATED ID:", generatedId);
    //     return new Item(generatedId, text);
    // }
    // public getId(): number {
    //     return this.id;
    // }
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
            // id: this.id,
            text: this.text,
            checked: this.checked
        };
    }
}
exports.Item = Item;
exports.default = Item;
