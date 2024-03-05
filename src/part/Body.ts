class Body implements IUnit, IPart<Body> {

    static Empty(): Body {
        return new Body(
            "",
            "",
            "",
            AttributesBody.Empty(),
            []
        )
    }

    constructor(
        public familyName: string,
        public firstName: string,
        public lastName: string,
        public attributes: AttributesBody,
        public abilities: IAbility[]
    ) {}

    get_hash(length: number): string {
        throw new Error("Method not implemented.");
    }
}