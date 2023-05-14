import React from 'react';

type ButtonPropsType = {
    name: string
    callBack: () => void
    className?: string
}

export const Button: React.FC<ButtonPropsType> = (props) => {

    const {
        name,
        callBack,
        className = '',
    } = props;

    const onclickHAndler = () => {
        callBack();
    }

    return (
        <button onClick={onclickHAndler} className={className}>{name}</button>
    )
}