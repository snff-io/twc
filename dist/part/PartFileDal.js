"use strict";
class PartFileDal {
    items;
    constructor() {
        this.items = [];
    }
    getFileName() {
        return "/storage/${T.name}.data";
    }
    load(path) {
        throw new Error("Method not implemented.");
    }
    reload(item) {
        throw new Error("Method not implemented.");
    }
    saveAll() {
    }
    save(item) {
    }
}
//# sourceMappingURL=PartFileDal.js.map