class AttributesMind implements IAttributes {

    constructor(
        public navigation: number,
        public automation: number
    ) { }
    
    get(): { [key: string]: number; } {
        throw new Error("Method not implemented.");
    }

    roll(against: string[]): number[] {
        throw new Error("Method not implemented.");
    }

}
