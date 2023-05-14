import React from "react";

type CheckboxPropsType = {
    isDone: boolean
    callBack:  (checkedValue: boolean) => void
}

export const Checkbox: React.FC<CheckboxPropsType> = (props) => {

    const {
        isDone,
        callBack,
    } = props;

    const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        callBack(e.currentTarget.checked)
    }

    return (
        <input
            type="checkbox"
            checked={isDone}
            onChange={onchangeHandler}
        />
    )
}

