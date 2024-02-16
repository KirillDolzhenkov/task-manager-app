import React, {useState} from "react";
import TextField from "@mui/material/TextField";

type EditTableSpanPropsType = {
    name: string
    callBack: (name: string) => void
    className?: string
}

export const EditTableSpan: React.FC<EditTableSpanPropsType> = (props) => {

    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [name, setName] = useState<string>(props.name);
    const [error, setError] = useState<string | null>("");
    const editTableSpanClassname = props.className ?? "";

    const onEditHandler = () => {
        setIsEditMode(!isEditMode);
    }
    const onCallBack = () => {
        props.callBack(name.trim());
    }
    const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    }
    const onBlurHandler = () => {
        if(!name.trim()){
            setError("The title field is required");
        } else {
            onCallBack();
            onEditHandler();
        }
    }

    const onEnterPress  = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        if(!name.trim()){
            setError("The title field is required");
        } else {
            onCallBack();
            onEditHandler();
        }
    }

    return (
        isEditMode
            ? <TextField
                error={!!error}
                size="small"
                variant="standard"
                label={error ? error : "Type something..."}
                value={name}
                onChange={onInputChangeHandler}
                onBlur={onBlurHandler}
                onKeyPress={onEnterPress}
                autoFocus
            />
            : <span
                className={editTableSpanClassname}
                onDoubleClick={onEditHandler}
            >{name}</span>
    );
}