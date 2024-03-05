class AttributesHeart implements IAttributes {

    constructor(
        public connection: number,
        public communication: number
    ) { }
    
    get(): { [key: string]: number; } {
        throw new Error("Method not implemented.");
    }

    roll(against: string[]): number[] {
        throw new Error("Method not implemented.");
    }
}


