import dotenv from 'dotenv';
import path from 'path';
import url from 'url';

const filename = url.fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

dotenv.config({ path: path.join(dirname, '../../.env') });

export default {
    MONGO_URI: process.env.MONGO_URI,
    NODE_ENV: process.env.NODE_ENV,
}