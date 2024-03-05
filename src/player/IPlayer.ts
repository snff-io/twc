interface IPlayer extends IUnit {
    firstName: string;
    lastName: string;
    hash: string;
    awareness: {
        connection: number;
        communication: number;
        energy: number;
        vibration: number;
        environment: number;
        perception: number;
        navigation: number;
        automation: number;
    };
    items: {
        name: string;
        quality: number;
    }[];
    body: {
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
}
