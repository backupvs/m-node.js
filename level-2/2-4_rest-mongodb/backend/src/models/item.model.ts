// Temp id
const generateId = ((init?: number) => {
    let stupidId = init || 1;
    return () => {
        return stupidId++;
    }
})();

class Item {
    private id: number;
    private text: string;
    private checked: boolean;

    constructor(text: string) {
        this.id = generateId();
        this.text = text;
        this.checked = false;
    }

    public getId(): number {
        return this.id;
    }

    public get getText() {
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
}

export default Item;