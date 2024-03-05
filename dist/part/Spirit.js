"use strict";
class Spirit {
    familyName;
    firstName;
    lastName;
    attributes;
    abilities;
    displayType() {
        return "Spirit";
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
//# sourceMappingURL=Spirit.js.map