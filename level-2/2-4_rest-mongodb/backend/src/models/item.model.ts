export class Item {
    private text: string;
    private checked: boolean;

    constructor(text: string) {
        this.text = text;
        this.checked = false;
    }

    public getText() {
        return this.text;
    }

    public setText(text: string) {
        this.text = text;
    }

    public getChecked() {
        return this.checked;
    }

    public setChecked(checked: boolean) {
        this.checked = checked;
    }

    public toJSON() {
        return {
            text: this.text,
            checked: this.checked
        }
    }
}

export default Item;