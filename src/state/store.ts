import {todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";
import {combineReducers, createStore} from "redux";


//types:
export type AppRootState = ReturnType<typeof rootReducer>

//main reducer:
const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
});

//creating store:
export const store = createStore(rootReducer);

//@ts-ignore
window.store = store;