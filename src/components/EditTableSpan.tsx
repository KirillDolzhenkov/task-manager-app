import React, {useState} from "react";

type EditTableSpanPropsType = {
    name: string
    callBack: (name: string) => void
    className?: string
}

export const EditTableSpan: React.FC<EditTableSpanPropsType> = (props) => {

    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const [name, setName] = useState<string>(props.name);

    const editTableSpanClassname = props.className ?? "";

    const onEditHandler = () => {
        setIsEditMode(true);
    }
    const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value)
    }

    const onCallBack = () => {
        props.callBack(name);
        setIsEditMode(false);
    }

    return (
        <>
            {
                isEditMode
                    ? <input
                        type="text"
                        value={name}
                        onChange={(event) => onInputChangeHandler(event)}
                        onBlur={onCallBack}
                        autoFocus
                    />
                    : <span
                        className={editTableSpanClassname}
                        onDoubleClick={onEditHandler}
                    >{name}</span>
            }
        </>
    )
}