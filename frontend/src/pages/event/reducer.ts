import { EventState, EventAction } from "./types";
import { asyncState } from "../../store/types";

const initialState: EventState = {
    events: [],
    asyncState: asyncState.idle
}

const event = (state = initialState, action: EventAction): EventState => {
    switch(action.type){
        case "GET_EVENTS_REQUEST": {
            return {
                ...state,
                asyncState: asyncState.loading
            }
        }

        case "GET_EVENTS_SUCCESS": {
            return {
                ...state,
                events: [...state.events, action.payload],
                asyncState: asyncState.loaded
            }
        }

        case "GET_EVENTS_ERROR": {
            return {
                ...state,
                asyncState: asyncState.error
            }
        }

        default: {
            return state;
        }
    }
};

export default event;