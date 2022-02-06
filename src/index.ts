import debugLib from 'debug';
import app from "./app";
import { connectDB } from "./db";

const debug = debugLib('dev:index');

async function main() {
    try {
        await connectDB();
        app.listen(3000);
       debug('Listening on port 3000');
    } catch (error) {
       debug(error);
    }
};

main();
