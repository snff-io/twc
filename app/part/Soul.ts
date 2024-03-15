class Soul implements IUnit, IPart<Soul> {

    displayType(): string {
        return "Soul"
    }

    constructor(
        public familyName: string,
        public firstName: string,
        public lastName: string,
        public attributes: AttributesSoul,
        public abilities: IAbility[]
    ) {
        this._id = (firstName + "_" + lastName).replace(" ", "-")
    }
    _id: string;
    Key: Pair[] = [Pair.None]
    Aura: Pair[] = [Pair.None]

    get_hash(length: number): string {
        throw new Error("Method not implemented.");
    }
}