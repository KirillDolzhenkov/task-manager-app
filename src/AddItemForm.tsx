import React, {useState} from "react";

//types:
type AddItemFormPropTypes = {
    addItemHandler: (title: string) => void
}

const AddItemForm: React.FC<AddItemFormPropTypes> = (props)=>{
    const {
        addItemHandler,
    } = props;

    const [error, setError] = useState<boolean>(false);
    const [newValue, setNewValue] = useState("");
    const hasError = error ? "error" : "";
    const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewValue(e.currentTarget?.value);
    }
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setError(false);
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
            <input value={newValue}
                   onChange={onchangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={hasError}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={"error-message"}>title is required</div>}
        </div>
    )
}

export {
    AddItemForm
}