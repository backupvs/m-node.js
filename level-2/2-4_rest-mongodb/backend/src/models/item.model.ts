import { ObjectId } from "mongodb";

export class Item {
    _id: ObjectId
    text: string;
    checked: boolean;

    constructor(text: string) {
        this._id = new ObjectId();
        this.text = text;
        this.checked = false;
    }
}

export default Item;