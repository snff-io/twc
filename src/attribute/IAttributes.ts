interface IAttributes {
    roll(against: string[]) : number[]
    get(): { [key: string]: number };     
}