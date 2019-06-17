import React from "react";
import moment from "moment";

interface eventItem {
    title: string,
    price: number,
    date: string,
    creator: string,
    userId: string,
    eventId: string,
    onDetail(id: string): void
}

const EventItem = (props: eventItem) => {
    return (
        <li>
            <div>
                <h2 className="title"><b>{props.title}</b></h2>
                <span className="meta">Rp {props.price} - {moment(props.date).format("D MMM YYYY")}</span>
            </div>
            <div>
                {props.userId === props.creator ? <p>You're the owner</p> : <button onClick={() => props.onDetail(props.eventId)}>View Detail</button>}
            </div>
        </li>
    )
};

export default EventItem;