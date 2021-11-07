import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { AddItemForm, AddItemFormPropsType } from './AddItemForm';
import {action} from "@storybook/addon-actions"

export default {
  title: 'Todolist/AddItemForm',
  component: AddItemForm,
  argTypes: {
    onClick: {
      description: 'Button inside form clicked'
     }
  },
} as ComponentMeta<typeof AddItemForm>;

const Template: ComponentStory<typeof AddItemForm> = (args: AddItemFormPropsType) => <AddItemForm {...args} />;

export const AddItemFormExample = Template.bind({ });
AddItemFormExample.args = {
  addItem: action('Button inside form clicked')
}