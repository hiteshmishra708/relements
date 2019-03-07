import React from 'react';
import { storiesOf } from '@storybook/react';
import Tabs from './Tabs';

storiesOf('Tabs', module).add('Default', () => {
  return <TabsTest />;
});

const TabsTest = () => {
  const [value, setValue] = React.useState('bots');
  return (
    <Tabs value={value}>
      <Tabs.Item value="bots" onClick={setValue} icon="bot-says">
        Bots
      </Tabs.Item>
      <Tabs.Item value="templates" onClick={setValue} icon="bot-says">
        Templates
      </Tabs.Item>
      <Tabs.Item value="businesses" onClick={setValue} icon="bot-says">
        Businesses
      </Tabs.Item>
    </Tabs>
  );
};
