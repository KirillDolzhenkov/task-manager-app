import React, {ChangeEvent, useState} from "react";


type EdittableSpanType = {
    title: string
    onChangeTitle: (title: string)=> void

}

const EdittableSpan: React.FC<EdittableSpanType> = (props)=> {
    const[editMode, setEditMode] = useState(false);
    const[title, setTitle] = useState("")

    const onEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    };
    const offEditMode = () => {
        setEditMode(false);
        props.onChangeTitle(title);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return(
        <>
            {
                editMode
                ? <input value={title} onChange={onChangeHandler} onBlur={offEditMode} autoFocus={true}></input>
                : <span onDoubleClick={onEditMode} >{props.title}</span>
            }
        </>
    )
}

export {
    EdittableSpan
}