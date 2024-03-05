class Spirit implements IUnit, IPart<Spirit> {

    constructor(
        public familyName: string,
        public firstName: string,
        public lastName: string,
        public attributes: AttributesSpirit,
        public abilities: IAbility[]
    ) {}

    get_hash(length: number): string {
        throw new Error("Method not implemented.");
    }
}