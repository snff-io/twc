class Spirit implements IUnit, IPart<Spirit> {

    displayType(): string {
        return "Spirit"
    }

    constructor(
        public familyName: string,
        public firstName: string,
        public lastName: string,
        public attributes: AttributesSpirit,
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