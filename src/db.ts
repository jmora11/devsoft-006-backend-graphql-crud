import debugLib from 'debug';
import { createConnection } from 'typeorm';
import * as config from './config';
import { Users } from './Entities/Users';

const debug = debugLib('dev:db');

export const connectDB = async () => {
    await createConnection({
        type: 'mysql',
        username: config.DB_USERNAME,
        password: config.DB_PASSWORD,
        port: Number(config.DB_PORT),
        host: config.DB_HOST,
        database: config.DB_DATABASE,
        entities: [
            Users
        ],
        synchronize: false,
        ssl: false
    }).then(_connection => {
       debug('DB conected successfully');
    }).catch(error => debug(error));
};
