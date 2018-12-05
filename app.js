import express from 'express';
import bodyParser from 'body-parser';

// Init App
const app = express();

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send('Hello World!');
});

// Set Port
app.set('port', process.env.PORT || 3000);
// eslint-disable-next-line no-unused-vars
let server = app.listen(app.get('port'), () => {
  // eslint-disable-next-line no-console
  console.log(
    '---------------------------------------\n' +
      'Web server is running in ' +
      app.get('env') +
      ' on port ' +
      app.get('port') +
      '\nPress Ctrl-C to terminate.'
    + '\n---------------------------------------');
});
