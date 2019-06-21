import React from "react";
import moment from "moment";

import Modal from "../../components/modal/Modal";

interface BookingDetailProps {
    show: boolean,
    onClose(): void,
    onCancel(e: React.MouseEvent<HTMLButtonElement>): void,
    booking: {
        id: string,
        eventId?: string,
        title?: string,
        description?: string,
        price?: number,
        date?: string,
        creator?: string
    }
}

const BookingDetail = (props: BookingDetailProps) => {
    return (
        <Modal
            isActive={props.show}
            onClose={props.onClose}
        >
            <div>
                <h2>{props.booking.title}</h2>
                <p>{`Rp ${props.booking.price} - ${moment(props.booking.date).format("D MMM YYYY HH:mm:ss")}`}</p>
                <p>Created by - {props.booking.creator}</p>
                <p>{props.booking.description}</p>
                <div>
                    <button onClick={props.onClose}>Close</button>
                    <button onClick={props.onCancel}>Cancel Booking</button>
                </div>
            </div>
        </Modal>
    )
};

export default BookingDetail;