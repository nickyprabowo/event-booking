import React from "react";
import moment from "moment";

import Modal from "../../components/modal/Modal";

interface EventDetailProps {
    show: boolean,
    onClose(): void,
    onBook(e: React.MouseEvent<HTMLButtonElement>): void,
    event: {
        id?: string,
        title?: string,
        description?: string,
        price?: number,
        date?: string,
        creator?: string
    }
}

const EventDetail = (props: EventDetailProps) => {
    return (
        <Modal
            isActive={props.show}
            onClose={props.onClose}
        >
            <div>
                <h2>{props.event.title}</h2>
                <p>{`Rp ${props.event.price} - ${moment(props.event.date).format("D MMM YYYY HH:mm:ss")}`}</p>
                <p>Created by - {props.event.creator}</p>
                <p>{props.event.description}</p>
                <div>
                    <button onClick={props.onClose}>Close</button>
                    <button onClick={props.onBook}>Book</button>
                </div>
            </div>
        </Modal>
    )
};

export default EventDetail;