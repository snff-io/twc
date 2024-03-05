import { injectable, inject, Container } from 'inversify';

const container = new Container();

container.bind<IHasher>('IHasher').to(Hasher);