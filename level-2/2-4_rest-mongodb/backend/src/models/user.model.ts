import { ObjectId } from "mongodb";
import Item from "./item.model";

export class User {
    _id: ObjectId
    login: string
    pass: string
    items: Item[]

    constructor(login: string, pass: string) {
        this._id = new ObjectId();
        this.login = login;
        this.pass = pass;
        this.items = [];
    }
}

export default User;