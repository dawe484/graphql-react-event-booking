import express from 'express';
import bodyParser from 'body-parser';
import graphqlHttp from 'express-graphql';
import { buildSchema } from 'graphql';

// Init App
const app = express();

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
      type RootQuery {
        events: [String!]
      }

      type RootMutation {
        createEvent(name: String): String
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      events: () => {
        return [
          'Nerdy Nummies Cookbook',
          'Baking All Year Round',
          'Culture Code',
        ];
      },
      createEvent: args => {
        const eventName = args.name;
        return eventName;
      },
    },
    graphiql: true,
  })
);

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
      '\nPress Ctrl-C to terminate.' +
      '\n---------------------------------------'
  );
});
