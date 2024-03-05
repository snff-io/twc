class AttributesSpirit implements IAttributes {

    constructor(
        public energy: number,
        public vibration: number
    ) {}

    get(): { [key: string]: number; } {
        throw new Error("Method not implemented.");
    }
    
    roll(against: string[]): number[] {
        throw new Error("Method not implemented.");
    }
}