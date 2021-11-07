import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Task, TaskPropsType } from './Task';
import {action} from "@storybook/addon-actions"

export default {
  title: 'Todolist/Task',
  component: Task,
  argTypes: {
    onClick: {
      description: 'Button inside form clicked'
     }
  },
} as ComponentMeta<typeof Task>;

const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const removeTaskCallback = action('Remove Button inside Task')

const Template: ComponentStory<typeof Task> = (args: TaskPropsType) => <Task {...args} />;

const baseArgs = {
  changeTaskStatus: changeTaskStatusCallback,
  changeTaskTitle: changeTaskTitleCallback,
  removeTaskCall: removeTaskCallback
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
  ...baseArgs,
  task: {id: '1', isDone: true, title: 'JS'},
  todolistId: 'todolistId1'
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
  ...baseArgs,
  task: {id: '1', isDone: false, title: 'JS'},
  todolistId: 'todolistId1'
}