import React from "react";
import moment from "moment";

interface bookingItem {
    title: string,
    description: string,
    date: string,
    price: number,
    creator: string
}

const BookingItem = (props: bookingItem) => {
    return (
        <li>
            <div>
                <h2 className="title"><b>{props.title}</b></h2>
                <span className="meta">Rp {props.price} - {moment(props.date).format("D MMM YYYY")}</span>
                <p>{props.creator}</p>
            </div>
        </li>
    )
};

export default BookingItem;