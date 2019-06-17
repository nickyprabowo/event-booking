import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
// reducers
import event from "../pages/event/reducer";

const reducers = combineReducers({
    ...event
})

const store = createStore(reducers, applyMiddleware(thunk));

export default store;