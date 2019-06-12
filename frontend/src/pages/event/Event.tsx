import React, { Component, Fragment } from 'react';

import { AppContext } from "../../context/auth-context";
import moment from "moment";

import Modal from "../../components/modal/Modal";
import AddEvent from "./AddEvent";

import "./Event.css";

interface events {
    title: string,
    price: number,
    description: string,
    date: string
}

interface eventProps{}

interface eventState {
    modalOpen: boolean,
    events: Array<events>,
    title: string,
    price: string,
    description: string,
    date: string
}

export default class Event extends Component<eventProps, eventState> {
    constructor(props: eventProps){
        super(props)
        this.state = {
            modalOpen: false,
            events: [],
            title: "",
            price: "",
            description: "",
            date: ""
        };
    }

    static contextType = AppContext;
    context!: React.ContextType<typeof AppContext>;


    componentDidMount = () => {
        this.getEvents();
    }

    openModal = () => {
        this.setState({
            modalOpen: true
        })
    }

    closeModal = () => {
        this.setState({
            modalOpen: false
        })
    }

    handleInputChange = (e: React.FormEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const { value, name } = e.currentTarget;
        // @ts-ignore
        this.setState({
            [name]: value 
        });
    }

    onSubmit = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();

        const { title, price, date, description } = this.state;
        const { token, userId } = this.context;
        const datetime = moment(date).format("YYYY-MM-DD HH:mm:ss");
        
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
        console.log(request);
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
            this.setState({
                modalOpen: false,
                events: [],
                title: "",
                price: "",
                description: "",
                date: ""
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    getEvents = () => {
        const request = {
            query: `
                query {
                    events {
                        id
                        title
                        description
                        price
                        date,
                        creator {
                            id
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
        .then(events => {
            this.setState({
                events: events.data.events
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    render(){
        const { modalOpen, events } = this.state;
        return (
            <Fragment>
                {this.context.token &&
                    <div className="input-event">
                        <p>Share your events to others</p>
                        <button onClick={this.openModal}>Add Event</button>
                    </div>
                }
                <Modal
                    isActive={modalOpen}
                    onClose={this.closeModal}
                    onSubmit={this.onSubmit}
                    render={(props) => 
                        <AddEvent
                            handleChange={this.handleInputChange}
                            {...props}
                        />
                    }
                />
                <ul className="events-list">
                    {events.map( event => {
                        return (
                            <li>
                                <h4 className="title"><b>{event.title}</b></h4>
                                <span>Rp {event.price} - {moment(event.date).format("D MMM YYYY")}</span>
                            </li>
                        )
                    })}
                </ul>
            </Fragment>
        );
    }
};