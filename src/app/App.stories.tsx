import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { App } from './App';
import { ReduxStoreProviderDecorator } from '../api/decorators/ReduxStoreProviderDecorator'


export default {
  title: 'Todolist/AppWithRedux',
  component: App,
  decorators: [ReduxStoreProviderDecorator]
} as ComponentMeta<typeof App>;

const Template: ComponentStory<typeof App> = (args: any) => <App {...args} />;

export const AppWithReduxExample = Template.bind({});

