import { ComponentStory, ComponentMeta } from '@storybook/react';
import { EditableSpan, EditableSpanPropsType } from './EditableSpan';
import { action } from "@storybook/addon-actions"

export default {
  title: 'Todolist/EditableSpan',
  component: EditableSpan,
  argTypes: {
    onChange: {
      description: 'Value EditableSpan changed'
    },
    value: {
      defaultValue: 'HTML',
      description: 'Start value EditableSpan'
    }
  },
} as ComponentMeta<typeof EditableSpan>;

const Template: ComponentStory<typeof EditableSpan> = (args: EditableSpanPropsType) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
  onChange: action('Value EditableSpan changed')
}
