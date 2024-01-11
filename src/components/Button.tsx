import React from 'react';

type ButtonPropsType = {
    name: string
    callBack: () => void
}

export const Button: React.FC<ButtonPropsType> = (props) => {

    const onclickHandler = () => {
        props.callBack();
    }

    return (
        <button
            onClick={onclickHandler}
        >{props.name}</button>
    )
}