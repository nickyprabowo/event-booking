const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type Booking {
        id: ID!
        event: Event!
        user: User!
        created_at: String!
        updated_at: String!
    }

    type BookingList {
        bookings: [Booking!]!
        total: Int!
    }

    "A type that describes the user"
    type User {
        "should have an ID which is UUID"
        id: ID!
        "should have a valid email"
        email: String!
        "should have a password encrypted by bcrypt"
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

    type EventList {
        events: [Event!]!
        total: Int!
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    input EventQuery {
        id: ID
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
        allEvents(page: Int): EventList!
        getEventById(id: String!): Event!
        allBookings(page: Int, userId: String!): BookingList!
        users: [User!]!
        login(email: String!, password: String!): AuthData!
    }

    type RootMutation {
        createEvent(eventInput: EventInput): Event
        createUser(userInput: UserInput): User
        createBooking(eventId: ID!, userId:ID!): Booking!
        cancelBooking(bookingId: ID!): Event!
    }

    schema {
        query: RootQuery
        mutation: RootMutation
    }
`);
