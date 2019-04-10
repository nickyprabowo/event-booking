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

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    input EventInput {
        title: String!
        description: String!
        price: Int!
        date: String!
    }

    input UserInput {
        email: String!
        password: String!
    }

    type RootQuery {
        events: [Event!]!
        bookings: [Booking!]!
        users: [User!]!
        login(email: String!, password: String!): AuthData!
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
