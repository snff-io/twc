
import { injectable, inject, Container } from 'inversify';
import { asEnumerable } from 'linq-ts';
require("./topology")

const container = new Container();

//container.bind<IHasher>('IHasher').to(Hasher);

var g = new Grid();
g.init();


