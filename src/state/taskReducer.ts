type initialStateType = any
type actionType = ReturnType<typeof testAC1> | ReturnType<typeof testAC2>

export const taskReducer = (state: initialStateType, action: actionType) => {
    switch (action.type){
        case "TL/TASKS/TEST_1": {
            return state;
        }
        case "TL/TASKS/TEST_2": {
            return state;
        }
        default: return state;
    }
}

const testAC1 = () => {
    return {type: "TL/TASKS/TEST_1"} as const
}
const testAC2 = () => {
    return {type: "TL/TASKS/TEST_2"} as const
}