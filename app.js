const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const { buildSchema } = require('graphql');

const config = require('./config');
const Event = require('./models/event');

// Init App
const app = express();

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
        return Event.find()
          .then(events => {
            return events.map(event => {
              return { ...event._doc, _id: event.id }; // same as event._doc._id.toString()
            });
          })
          .catch(err => {
            throw err;
          });
      },
      createEvent: args => {
        const event = new Event({
          title: args.eventInput.title,
          description: args.eventInput.description,
          price: +args.eventInput.price,
          date: new Date(args.eventInput.date),
        });
        return event
          .save()
          .then(result => {
            console.log(result);
            return { ...result._doc, _id: result._doc._id.toString() };
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      },
    },
    graphiql: true,
  })
);

// Set Port
app.set('port', process.env.PORT || 3000);

// eslint-disable-next-line no-unused-vars
const server = app.listen(app.get('port'), () => {
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
