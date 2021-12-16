import React, { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import { TextField, IconButton } from "@material-ui/core";
import { AddBox } from '@material-ui/icons'

export type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = React.memo(function (props: AddItemFormPropsType) {
    console.log("AddItemForm")

    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    let addItem = () => {
        if (title.trim() !== "") { // если таска не равна пустой строке
            props.addItem(title);
            setTitle("");  //зачищаем input
        } else {
            setError("Title is required")
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (e.charCode === 13) {
            addItem();
        }
    }

    return <div>
        <TextField variant="outlined" size="small"
            value={title}
            error={!!error}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            label="Title"
            helperText={error}
        />
        <IconButton color="primary" onClick={addItem}>
            <AddBox />
        </IconButton>


    </div>



})
