export class LoaderUnit implements IUnit {
    displayType(): string {
        return this.displayTypeString;
    }

    _id: string;    
    displayTypeString = ""

    constructor(
        public firstName: string,
        public lastName: string,
        
        displayTypeString: string
    ) {
        this._id = (firstName + "_" + lastName).replace(" ", "-")
        this.displayTypeString = displayTypeString;

    }

    get_hash(length: number): string {
        throw new Error("Method not implemented.");
    }

}