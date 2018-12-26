const mongoose = require('mongoose');

const server = `${process.env.MONGO_USER}:${
  process.env.MONGO_PASSWORD
}@cluster0-udkhy.mongodb.net`; // '127.0.0.1:27017'; // localhost
const database = `${process.env.MONGO_DB}?retryWrites=true`; // 'test';

mongoose
  .connect(`mongodb+srv://${server}/${database}`)
  .then(() => {
    // eslint-disable-next-line no-console
    console.log(
      'Database successfully connected.\n---------------------------------------'
    );
  })
  .catch(err => {
    // eslint-disable-next-line no-console
    console.error('Database not connected.\n' + err.message);
    process.exit();
  });
