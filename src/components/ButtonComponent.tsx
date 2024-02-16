import React from 'react';
import Button, {ButtonOwnProps} from "@mui/material/Button";

type DefaultMUIButtonPropsType = ButtonOwnProps;

type ButtonPropsType = DefaultMUIButtonPropsType & {
    className?: string
    callBack: () => void
}

export const OwnButton: React.FC<ButtonPropsType> = (props) => {
    const buttonClassname = props.className ?? "";
    const onclickHandler = () => {
        props.callBack();
    }

    return (
        <Button
            variant={props.variant}
            color={props.color}
            className={buttonClassname}
            onClick={onclickHandler}
        >{props.children}</Button>
    );
}