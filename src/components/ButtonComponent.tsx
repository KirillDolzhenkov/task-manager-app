import React from 'react';
import Button, {ButtonOwnProps} from "@mui/material/Button";

type DefaultMUIButtonPropsType = ButtonOwnProps;

type ButtonPropsType = DefaultMUIButtonPropsType & {
    /*className?: string*/
    callBack: () => void
}

export const OwnButton: React.FC<ButtonPropsType> = (props) => {
    /*const buttonClassname = props.className ?? "";*/
    const onclickHandler = () => {
        props.callBack();
    }

    return (
        <Button
            sx={props.sx}
            disabled={props.disabled}
            variant={props.variant}
            color={props.color}
            onClick={onclickHandler}
        >{props.children}</Button>
    );
}