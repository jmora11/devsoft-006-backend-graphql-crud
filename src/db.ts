import debugLib from 'debug';
import { createConnection } from 'typeorm';
import config from './config';
import { Users } from './Entities/Users';

const debug = debugLib('dev:db');

export const connectDB = async () => {
    await createConnection({
        type: 'mysql',
        username: config.dbusername,
        password: config.dbpassword,
        port: +config.dbport,
        host: config.dbhost,
        database: config.dbdatabase,
        entities: [
            Users
        ],
        synchronize: false,
        ssl: false
    }).then(_connection => {
       debug('DB conected successfully');
    }).catch(error => debug(error));
};
