import React, {useState, KeyboardEvent, ChangeEvent} from "react";
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log("addForm")
    const [title, setTitle] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(false)
    }
    const onKeyPressAddItem = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            //    setError(null);
        }
        if (e.key === "Enter") {
            addItem()
        }
    }
    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(trimmedTitle)
        } else {
            setError(true)
        }
        setTitle("")
    }
    return (
        <div>
            {/*<input
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
                className={error ? "error" : ""}
            />*/}
            <TextField
                value={title}
                onChange={changeTitle}
                onKeyPress={onKeyPressAddItem}
                variant={"outlined"}
                label={"Title"}
                error={error}
                helperText={error && "Title is required!"}
            />
            {/*<button onClick={addItem}>+</button>*/}
            <IconButton onClick={addItem}>
                <AddBox/>
            </IconButton>
            {/*{error && <div className={"error-message"}>Title is required!</div>}*/}
        </div>
    )
})