"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AttributesBody {
    connection;
    communication;
    environment;
    perception;
    energy;
    vibration;
    navigation;
    automation;
    static Empty() {
        return new AttributesBody(0, 0, 0, 0, 0, 0, 0, 0);
    }
    constructor(connection, communication, environment, perception, energy, vibration, navigation, automation) {
        this.connection = connection;
        this.communication = communication;
        this.environment = environment;
        this.perception = perception;
        this.energy = energy;
        this.vibration = vibration;
        this.navigation = navigation;
        this.automation = automation;
    }
    get() {
        throw new Error("Method not implemented.");
    }
    roll(against) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=AttributesBody.js.map