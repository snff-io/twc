import { inject } from 'inversify';

class Player implements IUnit, IPlayer {
    constructor(
        @inject('IHasher') hasher: IHasher,
    ) {

        this.hasher = hasher;
    }

    firstName!: string;
    lastName!: string;
    hash!: string;
    awareness!: {
        connection: number;
        communication: number;
        energy: number; 
        vibration: number;
        environment: number;
        perception: number;
        navigation: number; 
        automation: number;
    };
    items!: { 
        name: string;
        quality: number; }[];
    body!: {
        location: {
            x: number;
            y: number;
            z: number;
        };
        parts: {
            type: string;
            belongsTo: string;
            found: boolean; 
            onLoan: boolean;
            onLoanTo: string; 
            gameName: string;
            givenName: string; 
            intentions: string[];
            memories: string[];
        }[];
    };

    hasher: IHasher
    get_hash(length: number) {

        if (this.hash == "") {
            this.hash = this.hasher.get_hash(this.firstName + this.lastName).substring(0,length);
        }
        return this.hash;
    }


}