class Heart implements IUnit, IPart<Heart> {

    constructor(
        public familyName: string,
        public firstName: string,
        public lastName: string,
        public attributes: AttributesHeart,
        public abilities: IAbility[]
    ) {}

    get_hash(length: number): string {
        throw new Error("Method not implemented.");
    }
}