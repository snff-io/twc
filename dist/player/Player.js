"use strict";
// import { inject } from 'inversify';
Object.defineProperty(exports, "__esModule", { value: true });
// class Player implements IUnit, IPlayer {
//     displayType(): string {
//         return "Player"
//     }
//     constructor(
//         @inject('IHasher') hasher: IHasher,
//     ) {
//         this.hasher = hasher;
//         this._id = Buffer.from(firstName+lastName).toString('base64');
//     }
//     _id: string;
//     firstName!: string;
//     lastName!: string;
//     hash!: string;
//     awareness!: {
//         connection: number;
//         communication: number;
//         energy: number; 
//         vibration: number;
//         environment: number;
//         perception: number;
//         navigation: number; 
//         automation: number;
//     };
//     items!: { 
//         name: string;
//         quality: number; }[];
//     body!: {
//         location: {
//             x: number;
//             y: number;
//             z: number;
//         };
//         parts: {
//             type: string;
//             belongsTo: string;
//             found: boolean; 
//             onLoan: boolean;
//             onLoanTo: string; 
//             gameName: string;
//             givenName: string; 
//             intentions: string[];
//             memories: string[];
//         }[];
//     };
//     hasher: IHasher
//     get_hash(length: number) {
//         if (this.hash == "") {
//             this.hash = this.hasher.get_hash(this.firstName + this.lastName).substring(0,length);
//         }
//         return this.hash;
//     }
// }
//# sourceMappingURL=Player.js.map