class Mind implements IUnit, IPart<Mind> {

    constructor(
        public familyName: string,
        public firstName: string,
        public lastName: string,
        public attributes: AttributesMind,
        public abilities: IAbility[]
    ) {}

    get_hash(length: number): string {
        throw new Error("Method not implemented.");
    }
}