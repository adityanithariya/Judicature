const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

let DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);

exports.connect = async () => {
    await mongoose
        .connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('DB connected'))
        .catch((err) => console.log(err));
};

let count = 0;
 exports.handleDisconnect = async () => {
    
    count++;
    console.log('Trying to connect to mongo. Attempt : ' + count);

    await mongoose
        .connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('DB connected'))
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

