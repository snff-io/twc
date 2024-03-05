"use strict";
class Soul {
    familyName;
    firstName;
    lastName;
    attributes;
    abilities;
    constructor(familyName, firstName, lastName, attributes, abilities) {
        this.familyName = familyName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.attributes = attributes;
        this.abilities = abilities;
    }
    get_hash(length) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=Soul.js.map