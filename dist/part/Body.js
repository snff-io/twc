"use strict";
class Body {
    familyName;
    firstName;
    lastName;
    attributes;
    abilities;
    static Empty() {
        return new Body("", "", "", AttributesBody.Empty(), []);
    }
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
//# sourceMappingURL=Body.js.map