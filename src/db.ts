import { createConnection } from 'typeorm';
import { Users } from './Entities/Users';

export const connectDB = async () => {
    await createConnection({
        type: 'mysql',
        username: 'root',
        password: '1234',
        port: 3306,
        host: 'localhost',
        database: 'usersdb',
        entities: [
            Users
        ],
        synchronize: false,
        ssl: false
    }).then(connection => {
       console.log('DB conected successfully');
    }).catch(error => console.log(error));
};
