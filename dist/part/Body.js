"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Body {
    familyName;
    firstName;
    lastName;
    attributes;
    abilities;
    displayType() {
        return "Body";
    }
    static Empty() {
        return new Body("", "", "", AttributesBody.Empty(), []);
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
    Key = [Pair.None];
    Aura = [Pair.None];
    get_hash(length) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=Body.js.map