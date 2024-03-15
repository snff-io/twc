class AttributesSoul implements IAttributes {

    constructor(
        public environment: number,
        public perception: number
    ) { }

    get(): { [key: string]: number; } {
        throw new Error("Method not implemented.");
    }
    roll(against: string[]): number[] {
        throw new Error("Method not implemented.");
    }
}