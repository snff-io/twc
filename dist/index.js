"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
require("./topology");
const container = new inversify_1.Container();
//container.bind<IHasher>('IHasher').to(Hasher);
var g = new Grid();
g.init();
//# sourceMappingURL=index.js.map