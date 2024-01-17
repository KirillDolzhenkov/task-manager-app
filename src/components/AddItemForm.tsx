import React, {useState} from "react";
import {Button} from "./Button";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {

    const [title, setTitle] = useState("");
    const [error, setError] = useState<string | null>("");

    const onChangeInput= (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
        setError("");
    }

    const onAddItem = (title: string) => {
        if(!title){
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
            <div>
                <input
                    value={title}
                    onKeyDown={onInputKeyDownHandler}
                    onChange={onInputChangeHandler}
                />
                <Button
                    name={"+"}
                    callBack={()=>onAddItem(title)}
                />
                {error && <div style={{"color": "red"}}>{error}</div> }
            </div>
        </>
    );
}