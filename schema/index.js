const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Booking {
        id: ID!
        event: Event!
        user: User!
        created_at: String!
        updated_at: String!
    }

    type User {
        id: ID!
        email: String!
        password: String
        createdEvents: [Event!]
    }    

    type Event {
        id: ID!
        title: String!
        description: String!
        price: Int!
        date: String!
        creator: User!
    }

    input EventInput {
        title: String!
        description: String!
        price: Int!
        date: String!
        created_by: String!
    }

    input UserInput {
        email: String!
        password: String!
    }

    type RootQuery {
        events: [Event!]!
        bookings: [Booking!]!
        users: [User!]!
    }

    type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
        createBooking(eventId: ID!): Booking!
        cancelBooking(bookingId: ID!): Event!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
