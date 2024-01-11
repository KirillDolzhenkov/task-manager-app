import React from 'react';

type ButtonPropsType = {
    className?: string
    name: string
    callBack: () => void
}

export const Button: React.FC<ButtonPropsType> = (props) => {

    const buttonClassname = props.className ?? "";
    const onclickHandler = () => {
        props.callBack();
    }

    return (
        <button
            className={buttonClassname}
            onClick={onclickHandler}
        >{props.name}</button>
    )
}