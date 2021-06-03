import React, {ChangeEvent, useState} from "react";

type AddItemFormType = {
    addTask: (inputValue: string) => void

}
const AddItemForm: React.FC<AddItemFormType> = (props) => {
    let [inputValue, setInputValue] = useState('')
    const addItem = () => {
        if (inputValue) {
            props.addTask(inputValue)
            setInputValue('')
        }
    }
    const onkeypressHandler = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setInputValue(e.currentTarget.value)
    return (
        <div>
            <div>
                <input
                    value={inputValue}
                    onChange={onChangeHandler}
                    onKeyPress={onkeypressHandler}
                />
                <button onClick={addItem}>+</button>
            </div>
        </div>
    )
}

export {
    AddItemForm
}