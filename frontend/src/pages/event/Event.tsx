import React, { Component, Fragment } from 'react';

import { AppContext } from "../../context/auth-context";
import moment from "moment";

import Spinner from "../../components/spinner/Spinner";
import AddEvent from "./AddEvent";
import EventItem from "./EventItem";
import EventDetail from "./EventDetail";
import ReactPaginate from "react-paginate";

import "./Event.css";

interface events {
    id: string,
    title: string,
    price: number,
    description: string,
    date: string,
    creator: {
        id: string
    }
}

interface eventProps{}

interface eventState {
    addEvent: boolean,
    detailEvent: boolean,
    selectedEvent: any,
    events: Array<events>,
    title: string,
    price: number,
    description: string,
    date: string,
    page: number,
    loading: boolean,
    totalPage: number
}

export default class Event extends Component<eventProps, eventState> {
    constructor(props: eventProps){
        super(props)
        this.state = {
            addEvent: false,
            detailEvent: false,
            selectedEvent: {},
            events: [],
            title: "",
            price: 0,
            description: "",
            date: "",
            page: 0,
            loading: false,
            totalPage: 0
        };
    }

    static contextType = AppContext;
    context!: React.ContextType<typeof AppContext>;


    componentDidMount = () => {
        const { page } = this.state;
        this.getEvents(page);
    }

    onAddEvent = () => {
        this.setState({
            addEvent: true
        })
    }

    onDismissAddEvent = () => {
        this.setState({
            addEvent: false,
            title: "",
            price: 0,
            description: "",
            date: ""
        })
    }

    onToggleDetailEvent = () => {
        this.setState((prevState) => ({
            detailEvent: !prevState.detailEvent
        }))
    }

    fetchDetail = (id: string) => {
        this.getEventById(id);
    }

    handlePagination = (page: { selected: number }) => {
        this.setState({
            page: page.selected
        }, () => this.getEvents(page.selected))
    }

    handleInputChange = (e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value, name } = e.currentTarget;
        // @ts-ignore
        this.setState({
            [name]: value 
        });
    }

    onSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const { title, price, date, description, page } = this.state;
        const { token, userId } = this.context;
        const datetime = moment(date).format("YYYY-MM-DD HH:mm:ss");
        // check if empty
        if(
            title.trim().length === 0 ||
            datetime === "Invalid date" ||
            description.trim().length === 0 ||
            userId.trim().length === 0
        ) {
            return;
        }
        
        const request = {
            query: `
                mutation {
                    createEvent(eventInput: {title: "${title}", description: "${description}", price: ${+price}, date: "${datetime}", created_by: "${userId}"}) {
                        title
                        price
                    }
                }
            `
        }
        
        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed');
            }
            return res.json();
        })
        .then(() => {
            this.onDismissAddEvent();
            this.getEvents(page);
        })
        .catch(error => {
            console.log(error);
        })
    }

    getEvents = (page: number) => {
        this.setState({
            loading: true
        })
        const request = {
            query: `
                query getAllEvents {
                    allEvents(page: ${page}) {
                        events {id
                            title
                            price
                            date
                            creator {
                                id
                            }
                        }
                        total
                    }
                }
            `
        }

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed');
            }
            return res.json();
        })
        .then(({ data: result }) => {
            this.setState({
                events: result.allEvents.events,
                totalPage: result.allEvents.total,
                loading: false
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    getEventById = (id: string) => {
        const request = {
            query: `
                query getSpecificEvent {
                    getEventById(id: "${id}") {
                        id
                        title
                        description
                        price
                        date
                        creator {
                            email
                        }
                    }
                }
            `
        }

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed');
            }
            return res.json();
        })
        .then(({data: event}) => {
            this.setState({
                selectedEvent: {
                    ...event.getEventById,
                    creator: event.getEventById.creator.email
                }
            }, () => this.onToggleDetailEvent())
        })
        .catch(error => {
            console.log(error);
        })
    }

    bookEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
        if(!this.context.token) {
            this.onToggleDetailEvent()
            return;
        }

        this.setState({
            loading: true
        })

        const { token, userId } = this.context;
        const eventId = this.state.selectedEvent ? this.state.selectedEvent.id : 0

        const request = {
            query: `
                mutation bookEvent {
                    createBooking(eventId: "${eventId}", userId: "${userId}") {
                        id
                        event {
                            id
                            title
                        }
                        created_at
                    }
                }
            `
        }

        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed');
            }
            return res.json();
        })
        .then(({data: event}) => {
            this.setState({
                loading: false
            }, () => this.onToggleDetailEvent())
        })
        .catch(error => {
            console.log(error);
        })
    }

    render(){
        const { addEvent, detailEvent, events, loading, selectedEvent, totalPage } = this.state;
        const { userId } = this.context;

        return (
            <Fragment>
                {this.context.token &&
                    <div className="input-event">
                        <p>Share your events to others</p>
                        <button onClick={this.onAddEvent}>Add Event</button>
                    </div>
                }
                {addEvent &&
                    <AddEvent
                        show={addEvent}
                        onClose={this.onDismissAddEvent}
                        handleChange={this.handleInputChange}
                        onSubmit={this.onSubmit}
                    />
                }
                {detailEvent &&
                    <EventDetail 
                        show={detailEvent}
                        onClose={this.onToggleDetailEvent}
                        event={selectedEvent}
                        onBook={this.bookEvent}
                    />
                }
                {loading && <Spinner />}
                {events.length === 0 &&
                    <div className="centered">No events available</div>
                }
                {events.length > 0 &&
                    <Fragment>
                        <ul className="events-list">
                            {events.map((event: events) => (
                                <EventItem
                                    key={event.id}
                                    title={event.title}
                                    price={event.price}
                                    date={event.date}
                                    creator={event.creator.id}
                                    userId={userId}
                                    eventId={event.id}
                                    onDetail={this.fetchDetail.bind(this, event.id)}
                                />
                            ))}
                        </ul>
                        <ReactPaginate
                            previousLabel={'previous'}
                            nextLabel={'next'}
                            breakLabel={'...'}
                            breakClassName={'break-me'}
                            pageCount={totalPage}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={this.handlePagination}
                            containerClassName={'pagination'}
                            activeClassName={'active'}
                        />
                    </Fragment>
                }
            </Fragment>
        );
    }
};