import debugLib from 'debug';
import app from "./app";
import {APP_PORT} from './config';
import { connectDB } from "./db";

const debug = debugLib('dev:index');

async function main() {
    try {
        await connectDB();
        app.listen(APP_PORT);
        debug('Listening on port:', APP_PORT);
    } catch (error) {
        debug(error);
    }
};

main();
