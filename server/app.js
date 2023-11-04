const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('./fabric/initDB.js');
dotenv.config({ path: './config.env' });

const envVars = [
    'DATABASE',
    'DATABASE_PASSWORD',
    'PORT',
    'JWT_SECRET',
    'JWT_EXPIRES_IN',
    'JWT_COOKIE_EXPIRES_IN',
    'IPFS_ADD_DOC_API',
    'IPFS_GET_DOC_API',
    'EMAIL',
    'EMAIL_PASSWORD',
    'ADMIN_ID',
    'ADMIN_PASSWORD',
];

envVars.forEach((envVar) => {
    if (!process.env[envVar]) {
        throw new Error(`${envVar} is not found in config.env`);
    }
});

const DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);

let count = 0;
const handleDisconnect = async () => {
    count++;
    console.log('Trying to connect to mongo. Attempt : ' + count);

    await mongoose
        .connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('MongoDB connected'))
        .catch((err) => {
            if (count >= 5) {
                console.log('Mongo ERROR');
                console.error(err);
                process.exit(1);
            } else {
                setTimeout(handleDisconnect, 1000);
            }
        });
};

exports.connect = async () => {
    await mongoose
        .connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.log(err));
    mongoose.connection.on('error', handleDisconnect);
};
