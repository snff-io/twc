class PlayerFileDal<IPlayer> implements IDal<IPlayer> {
    
    items: IPlayer[];
    
    constructor() {
        this.items = []
    }

    load(path: string): void {
        throw new Error("Method not implemented.");
    }
    
    reload(item: IPlayer): IPlayer {
        throw new Error("Method not implemented.");
    }
    
    saveAll(): void {

    }
    
    save(item: IPlayer): void {
        
    }
  
    




}