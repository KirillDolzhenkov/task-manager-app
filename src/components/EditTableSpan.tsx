import React, {useCallback, useState} from "react";
import TextField from "@mui/material/TextField";

type EditTableSpanPropsType = {
    name: string
    callBack: (name: string) => void
    className?: string
}

export const EditTableSpan= React.memo(({callBack,...props}: EditTableSpanPropsType) => {

    console.log("EditTableSpan")

    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [name, setName] = useState<string>(props.name);
    const [error, setError] = useState<string | null>("");
    const editTableSpanClassname = props.className ?? "";
    const labelText =  error ? error : "Type something...";

    const onEditHandler = () => {
        setIsEditMode(!isEditMode);
    }

    const onCallBack = useCallback(() => {
        callBack(name.trim());
    }, [callBack]);

    const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    }

    const onBlurHandler = () => {
        if(!name.trim()){
            setError("The title field is required");
        } else {
            onCallBack();
            setIsEditMode(!isEditMode);
        }
    }

    /*const onEnterPress  = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onBlurHandler();
        }
    }*/

    return (
        isEditMode
            ? <TextField
                error={!!error}
                size="small"
                variant="standard"
                label={labelText}
                value={name}
                onChange={onInputChangeHandler}
                onBlur={onBlurHandler}
                /*onKeyDown={onEnterPress}*/
                autoFocus
            />
            : <span
                className={editTableSpanClassname}
                onDoubleClick={onEditHandler}
            >{name}</span>
    );
})