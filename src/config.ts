export default {
    dbusername: process.env.DB_USERNAME || 'root',
    dbpassword: process.env.DB_PASSWORD || '1234',
    dbhost: process.env.DB_HOST || 'localhost',
    dbdatabase: process.env.DB_DATABASE || 'usersdb',
    dbport: process.env.DB_PORT || '3306'
};
