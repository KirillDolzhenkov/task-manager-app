import React, {useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {

    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>("");
    const isDisabled = !title.trim()

    const ButtonStyles = {
        maxWidth: '39px',
        maxHeight: '39px',
        minWidth: '39px',
        minHeight: '39px'
    }

    const onChangeInput= (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        setError("");
    }

    const onAddItem = (title: string) => {
        if(!title.trim()){
            setError("The title field is required");
        } else {
            props.addItem(title.trim());
            setTitle("");
        }
    }

    const onEnterPress  = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Enter') return;
        onAddItem(title);
    }
    const onInputKeyDownHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
        onEnterPress(event);
    }
    const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeInput(event);
    }

    return (
        <>
            <div className="input-section">
                <TextField
                    error={!!error}
                    size="small"
                    variant="outlined"
                    label={error ? error : "Type something..."}
                    value={title}
                    onKeyDown={onInputKeyDownHandler}
                    onChange={onInputChangeHandler}
                />
                <Button
                    disabled={isDisabled}
                    variant="contained"
                    color="primary"
                    onClick={()=>onAddItem(title)}
                    sx={ButtonStyles}
                >+</Button>
            </div>
        </>
    );
}