class Body implements IUnit, IPart<Body> {

    displayType(): string {
        return "Body"
    }

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
    ) {
        this._id = (firstName + "_" + lastName).replace(" ", "-")
    }
    _id: string;

    get_hash(length: number): string {
        throw new Error("Method not implemented.");
    }
}