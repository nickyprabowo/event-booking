import React, { Component, Fragment } from 'react'

import BookingItem from "./BookingItem";
import BookingDetail from "./BookingDetail";
import ReactPaginate from "react-paginate";
import Spinner from "../../components/spinner/Spinner";

import { AppContext } from "../../context/auth-context";

import "./Booking.css";

interface event {
    id: string,
    title: string,
    price: number,
    description: string,
    date: string,
    creator: {
        email: string
    }
}

interface BookingItem {
    id: string,
    event: event,
    createdAt: string,
    updatedAt: string,
}

interface BookingProps {}

interface BookingState {
    loading: boolean,
    bookings: BookingItem[],
    page: number,
    totalPage: number,
    selectedBooking: any,
    bookingDetail: boolean
}

export default class Booking extends Component<BookingProps, BookingState> {
    constructor(props: BookingProps){
        super(props)
        this.state = {
            loading: false,
            bookings: [],
            page: 0,
            totalPage: 0,
            selectedBooking: "",
            bookingDetail: false
        }
    }

    static contextType = AppContext;
    context!: React.ContextType<typeof AppContext>;

    componentDidMount = () => {
        const { page } = this.state;
        this.getBookings(page);
    }

    handlePagination = (page: { selected: number }) => {
        this.setState({
            page: page.selected
        }, () => this.getBookings(page.selected))
    }

    onToggleDetail = () => {
        this.setState(prevState => ({
            bookingDetail: !prevState.bookingDetail
        }))
    }

    fetchDetail = (id: string) => {
        this.getBookingById(id);
    }

    getBookings = (page: number) => {
        this.setState({
            loading: true
        })

        const { token, userId } = this.context;
        const request = {
            query: `
                query getAllBookings {
                    allBookings(page: ${page}, userId: "${userId}") {
                        bookings {
                            id
                            event {
                                title
                                description
                                date
                                price
                                creator {
                                    email
                                }
                            }
                            created_at
                            updated_at
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
                'Authorization': 'Bearer ' + token
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
                bookings: result.allBookings.bookings,
                totalPage: result.allBookings.total,
                loading: false
            })
        })
        .catch(error => {
            console.log(error);
        })
    }

    getBookingById = (id: string) => {
        const { token } = this.context;
        const request = {
            query: `
                query {
                    getBookingById(id: "${id}") {
                        id
                        event {
                            title
                            description
                            date
                            price
                            creator {
                                email
                            }
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
                'Authorization': 'Bearer ' + token
            }
        })
        .then(res => {
            if (res.status !== 200 && res.status !== 201) {
                throw new Error('Failed');
            }
            return res.json();
        })
        .then(({data: booking}) => {
            this.setState({
                selectedBooking: {
                    ...booking.getBookingById,
                    eventId: booking.getBookingById.event.id,
                    title: booking.getBookingById.event.id,
                    description: booking.getBookingById.event.description,
                    price: booking.getBookingById.event.price,
                    date: booking.getBookingById.event.date,
                    creator: booking.getBookingById.event.creator.email
                }
            }, () => this.onToggleDetail())
        })
        .catch(error => {
            console.log(error);
        })
    }

    cancelBooking = (e: React.MouseEvent<HTMLButtonElement>) => {
        const { token } = this.context;
        const { id } = this.state.selectedBooking;
        const { page } = this.state;
        const request = {
            query: `
                mutation {
                    cancelBooking(bookingId: "${id}")
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
            this.onToggleDetail()
            this.getBookings(page);
        })
        .catch(error => {
            console.log(error);
        })
    }

    render() {
        const { loading, bookings, totalPage, bookingDetail, selectedBooking } = this.state;
        return (
            <Fragment>
                {bookingDetail &&
                    <BookingDetail 
                        show={bookingDetail}
                        onClose={this.onToggleDetail}
                        booking={selectedBooking}
                        onCancel={this.cancelBooking}
                    />
                }
                {loading && <Spinner />}
                {bookings.length === 0 &&
                    <div className="centered">No events available</div>
                }
                <Fragment>
                    <ul className="booking-list">
                        {bookings.map((booking) => (
                            <BookingItem
                                key={booking.id}
                                title={booking.event.title}
                                description={booking.event.description}
                                price={booking.event.price}
                                date={booking.event.date}
                                creator={booking.event.creator.email}
                                bookingId={booking.id}
                                onDetail={this.fetchDetail.bind(this, booking.id)}
                            />)
                        )}
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
            </Fragment>
        );
    }
};
