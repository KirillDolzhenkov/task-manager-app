import React, {useState} from 'react';
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    onChangeHandler: (newTitle: string) => void
}

const EditableSpan: React.FC<EditableSpanPropsType> = React.memo((props) => {
    console.log("EditableSpan is called");
    const {
        title,
        onChangeHandler,
    } = props;
    const [editMode, setEditMode] = useState<boolean>(false);
    const [titleValue, setTitleValue] = useState("");
    const onEditMode = () => {
        setEditMode(true);
        setTitleValue(title);
    }
    const offEditMode = () => {
        setEditMode(false);
        onChangeHandler(titleValue);

    }
    const onTitleHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleValue(e.currentTarget.value);
    }

    return (
        <>
            {
                editMode
                    ? /*<input
                        type="text"
                        value={titleValue}
                        autoFocus
                        onBlur={offEditMode}
                        onChange={onTitleHandler}
                    />*/
                    <TextField
                        type="text"
                        value={titleValue}
                        autoFocus
                        onBlur={offEditMode}
                        onChange={onTitleHandler}
                    />
                    : <span
                        onDoubleClick={onEditMode}
                    >{title}</span>
            }
        </>
    );
});

export {
    EditableSpan
}