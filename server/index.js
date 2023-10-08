const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

let DB = process.env.DATABASE.replace(
    '<password>',
    process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB connection successful!'))
    .catch((err) => console.log(err));

const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`App running on http://localhost:${port}`);
});
