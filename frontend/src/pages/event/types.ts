import { asyncState } from "../../store/types";

export interface EventAction {
    type: string
    payload?: any
}

export interface Event {
    id: string,
    title: string,
    price: number,
    description: string,
    date: string,
    creator: {
        id: string
    }
}

export interface EventState {
    events: Array<object>,
    asyncState: asyncState
}

export const FETCH_EVENTS_REQUEST = "FETCH_EVENTS_REQUEST";
export const FETCH_EVENTS_SUCCESS = "FETCH_EVENTS_SUCCESS";
export const FETCH_EVENTS_ERROR = "FETCH_EVENTS_ERROR";

export interface fetchEventRequestAction {
    type: typeof FETCH_EVENTS_REQUEST
}

export interface fetchEventSuccessAction {
    type: typeof FETCH_EVENTS_SUCCESS,
    payload: Event
}

export interface fetchEventErrorAction {
    type: typeof FETCH_EVENTS_ERROR
}
