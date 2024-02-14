import React from 'react';



type ButtonPropsType = {
    className?: string
    name: string
    callBack: () => void
}

export const ButtonComponent: React.FC<ButtonPropsType> = ({className, callBack}, children) => {

    const buttonClassname = className ?? "";
    const onclickHandler = () => {
        callBack();
    }

    return (
        /*<button
            className={buttonClassname}
            onClick={onclickHandler}
        >{children}</button>*/
        <div></div>
    );
}