"use strict";
class Soul {
    familyName;
    firstName;
    lastName;
    attributes;
    abilities;
    displayType() {
        return "Soul";
    }
    constructor(familyName, firstName, lastName, attributes, abilities) {
        this.familyName = familyName;
        this.firstName = firstName;
        this.lastName = lastName;
        this.attributes = attributes;
        this.abilities = abilities;
        this._id = (firstName + "_" + lastName).replace(" ", "-");
    }
    _id;
    get_hash(length) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=Soul.js.map