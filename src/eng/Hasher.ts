import { injectable } from 'inversify';
import crypto from 'crypto';

@injectable()
class Hasher implements IHasher {    
    get_hash(value: string): string {
        return crypto.createHash('sha1').update(value).digest('hex'); 
    }
}