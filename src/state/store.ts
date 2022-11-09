import {todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";
import {combineReducers, createStore} from "redux";


//types:
export type AppRootStateType = ReturnType<typeof rootReducer>

//main reducer:
const rootReducer = combineReducers({
    //app state's description:
    todolists: todolistsReducer, //dispatched "undefined" to every reducer for creating state
    tasks: tasksReducer
});

//creating store:
export const store = createStore(rootReducer);

//@ts-ignore
window.store = store;