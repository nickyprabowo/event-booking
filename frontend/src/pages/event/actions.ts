
import { Action, ActionCreator, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import {
    fetchEventRequestAction,
    fetchEventSuccessAction,
    fetchEventErrorAction,
    Event,
    EventState
} from "./types";
import { fetchEvents } from "./api";

const fetchEventsRequest: ActionCreator<Action> = (): fetchEventRequestAction => ({
    type: "FETCH_EVENTS_REQUEST"
})

const fetchEventsSuccess: ActionCreator<Action> = (data: Event): fetchEventSuccessAction => ({
    type: "FETCH_EVENTS_SUCCESS",
    payload: { ...data }
})

const fetchEventsError: ActionCreator<Action> = (): fetchEventErrorAction => ({
    type: "FETCH_EVENTS_ERROR"
})