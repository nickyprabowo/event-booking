const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const { buildSchema } = require('graphql')
const createEvent = require('./event/controllers/create-event')

const app = express()

const events = []

app.use(bodyParser.json())

app.use(
    '/graphql', 
    graphqlHttp({
        schema: buildSchema(`
            type Event {
                id: ID!
                title: String!
                description: String!
                price: Int!
                date: String!
            }

            input EventInput {
                title: String!
                description: String!
                price: Int!
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
                return events
            },
            createEvent: async args => {
                const savedEvent = await createEvent(args);
                return savedEvent;
            }
        },
        graphiql: true
    })
)

app.listen(3000)
