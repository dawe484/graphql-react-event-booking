import express from 'express';
import bodyParser from 'body-parser';
import graphqlHttp from 'express-graphql';
import { buildSchema } from 'graphql';

// Init App
const app = express();

const events = [];

app.use(bodyParser.json());

app.use(
  '/graphql',
  graphqlHttp({
    schema: buildSchema(`
      type Event {
        _id: ID!
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      input EventInput {
        title: String!
        description: String!
        price: Float!
        date: String!
      }

      type RootQuery {
        events: [Event!]!
      }

      type RootMutation {
        createEvent(eventInput: EventInput): Event
      }

      schema {
        query: RootQuery
        mutation: RootMutation
      }
    `),
    rootValue: {
      events: () => {
        return events;
      },
      createEvent: args => {
        const event = {
          _id: Math.random().toString(),
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: args.eventInput.date,
        };
        events.push(event);
        return event;
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
