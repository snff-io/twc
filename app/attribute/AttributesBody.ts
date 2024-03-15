class AttributesBody implements IAttributes {

    static Empty(): AttributesBody {
        return new AttributesBody(
            0,0,0,0,0,0,0,0
        )
    }

    constructor(
        public connection: number,
        public communication: number,
        public environment: number,
        public perception: number,
        public energy: number,
        public vibration: number,
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