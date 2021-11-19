import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import {AppWithRedux} from './AppWithRedux';
import {ReduxStoreProviderDecorator} from './stories/decorators/ReduxStoreProviderDecorator'


export default {
  title: 'Todolist/AppWithRedux',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof AppWithRedux>;

const Template: ComponentStory<typeof AppWithRedux> = (args: any) => <AppWithRedux {...args} />;

export const AppWithReduxExample = Template.bind({});

