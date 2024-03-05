class Soul implements IUnit, IPart<Soul> {

    constructor(
        public familyName: string,
        public firstName: string,
        public lastName: string,
        public attributes: AttributesSoul,
        public abilities: IAbility[]
    ) {}

    get_hash(length: number): string {
        throw new Error("Method not implemented.");
    }
}