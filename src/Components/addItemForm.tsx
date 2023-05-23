import React, {useState} from "react";
import {Button} from "./Button";
import styles from "../Todolist.module.css";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {

    const {
        addItem,
    } = props;

    const [newTask, setNewTask] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const inputClassName = error ? styles.error : "";

    const onChangeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        setNewTask(e.currentTarget.value);
    }

    const addNewTaskHandler = () => {
        if (newTask.trim() !== "") {
            /*addTask(todoId, newTask.trim());*/
            addItem(newTask.trim());
            setNewTask("");
        } else {
            setError("Title is required!");
        }

    }

    const onButtonHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addNewTaskHandler();
        }
    }
    return (
        <>
            <div>
                <input
                    className={`${inputClassName}`}
                    onChange={onChangeTask}
                    value={newTask}
                    onKeyDown={onButtonHandler}
                />
                <Button name={"+"} callBack={addNewTaskHandler}></Button>
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
        </>
    )
}