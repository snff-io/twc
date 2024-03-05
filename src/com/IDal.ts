interface IDal<T> {
    
    items: T[];

    load(path: string): void;
    reload(item: T): T

    saveAll(): void
    save(item: T): void

}