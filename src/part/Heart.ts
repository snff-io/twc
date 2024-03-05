class Heart implements IUnit, IPart<Heart> {
    displayType(): string {
        return "Heart"
    }

    constructor(
        public familyName: string,
        public firstName: string,
        public lastName: string,
        public attributes: AttributesHeart,
        public abilities: IAbility[]
    ) {
        this._id = (firstName + "_" + lastName).replace(" ", "-")
    }
    _id: string;
 
    get_hash(length: number): string {
        throw new Error("Method not implemented.");
    }
}