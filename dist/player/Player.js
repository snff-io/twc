"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
let Player = class Player {
    constructor(hasher) {
        this.hasher = hasher;
    }
    firstName;
    lastName;
    hash;
    awareness;
    items;
    body;
    hasher;
    get_hash(length) {
        if (this.hash == "") {
            this.hash = this.hasher.get_hash(this.firstName + this.lastName).substring(0, length);
        }
        return this.hash;
    }
};
Player = __decorate([
    __param(0, (0, inversify_1.inject)('IHasher'))
], Player);
//# sourceMappingURL=Player.js.map