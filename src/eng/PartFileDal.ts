class PartFileDal<T> implements IDal<T> {
    

    items: T[];

    constructor() {
        this.items = [];
    }

    getFileName():string {
        return "/storage/${T.name}.data";
    }

    load(path: string): void {
        throw new Error("Method not implemented.");
    }
    reload<T>(item: T): T {
        throw new Error("Method not implemented.");
    }
    saveAll(): void {

    }

    save(item: T): void {
        
    }

}