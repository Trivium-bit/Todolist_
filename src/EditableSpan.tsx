import React, { ChangeEvent, useState } from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
  value: string
  onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {

  let [editMode, setEditMode] = useState<boolean>(false)
  const onEditMode = () => {
    setEditMode(true);
    setTitle(props.value);
  }
  const offEditMode = () => {
    setEditMode(false);
    props.onChange(title)
  }

let [title, setTitle] = useState<string>("")

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}

  return editMode
    ?  <TextField value={title} onChange={onChangeTitleHandler} autoFocus onBlur={offEditMode} variant="outlined"/>
    : <span onDoubleClick={onEditMode}>{props.value}</span>

}

