import React, {useState} from "react";
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';

/*import {Button} from "./Button";*/
import styles from "../Todolist.module.css";

type AddItemFormPropsType = {
    callback: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {

    const {
        callback,
    } = props;
    const [newTask, setNewTask] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    /*const inputClassName = error ? styles.error : "";*/
    const inputLabel = error ? `${error}` : "";
    const buttonStyle = {
        maxWidth: "38px",
        maxHeight: "38px",
        minWidth: "38px",
        minHeight: "38px"
    }

    const onChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setNewTask(e.currentTarget.value);
    }

    const addItem = () => {
        if (newTask.trim() !== "") {
            callback(newTask.trim());
            setNewTask("");
        } else {
            setError("Title is required!");
        }

    }

    const onButtonHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem();
        }
    }
    return (
        <>
            <div>
                {/*<input
                    className={`${inputClassName}`}
                    onChange={onChangeTask}
                    value={newTask}
                    onKeyDown={onButtonHandler}
                />*/}
                <TextField
                    id="standard-basic"
                    size="small"
                    label={`${inputLabel}`}
                    variant="outlined"
                    onChange={onChangeTask}
                    value={newTask}
                    onKeyDown={onButtonHandler}
                    error={!!error}
                />
                {/*<Button name={"+"} className={buttonStyle} callBack={addItem}></Button>*/}
                <Button variant="contained" size="small" style={buttonStyle} onClick={addItem}>+</Button>
            </div>
            {/*{error && <div className={styles.errorMessage}>{error}</div>}*/}
        </>
    )
}