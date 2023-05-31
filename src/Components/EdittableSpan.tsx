import React, {useState} from "react";
import TextField from "@mui/material/TextField";

type EditTableSpanPropsType = {
    title: string
    callback: (title: string) => void
}

export const EditTableSpan: React.FC<EditTableSpanPropsType> = (props) => {

    const {
        title,
        callback,
    } = props;

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [stateTitle, setStateTitle] = useState<string>(title);

    const changeEditMode = () => {
        if(!isEdit) {
            setIsEdit(true);
        } else {
            setIsEdit(false);
            changeTitle();
        }
    }

    const onTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStateTitle(e.currentTarget.value);
    }

    const changeTitle = () => {
        callback(stateTitle);
    }

    return (
        isEdit
            ? /*<input
                type="text"
                value={stateTitle}
                onBlur={changeEditMode}
                onChange={onTitleHandler}
                autoFocus
            />*/
            <TextField
                id="standard-basic"
                size="small"
                label="Standard"
                variant="standard"
                value={stateTitle}
                onBlur={changeEditMode}
                onChange={onTitleHandler}
                autoFocus
            />
            : <span onDoubleClick={changeEditMode}>{title}</span>
    )
}