const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

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
