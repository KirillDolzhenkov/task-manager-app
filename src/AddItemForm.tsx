import IconButton from '@mui/material/IconButton/IconButton';
import TextField from '@mui/material/TextField/TextField';
import React, {useState} from 'react';
import {AddBox} from "@mui/icons-material";

//types:
type AddItemFormPropTypes = {
    addItemHandler: (title: string) => void
}

const AddItemForm: React.FC<AddItemFormPropTypes> = React.memo((props)=>{
    console.log("AddItemForm is called");
    const {
        addItemHandler,
    } = props;

    const [error, setError] = useState<boolean>(false);
    const [newValue, setNewValue] = useState("");
    /*const hasError = error ? "error" : "";*/
    const hasError = error ? "title is required" : "";
    const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewValue(e.currentTarget?.value);
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (error !== false) {
            setError(false);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }

    const addItem = () => {
        if (!newValue.trim()) {
            setError(true);
            return;
        }
        addItemHandler(newValue.trim());
        setNewValue('');
    }

    return (
        <div>
            {/*<input value={newValue}
                   onChange={onchangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={hasError}
            />*/}
            <TextField
                variant="outlined"
                value={newValue}
                label="Title"
                onChange={onchangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!hasError}
                helperText={hasError}
            />
            {/*<button onClick={addItem}>+</button>*/}
            <IconButton
                color="primary"
                style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}
                onClick={addItem}
            ><AddBox/></IconButton>
            {/*{error && <div className={"error-message"}>title is required</div>}*/}
        </div>
    )
});

export {
    AddItemForm
}