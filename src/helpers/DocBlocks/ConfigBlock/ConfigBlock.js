import React from 'react';
import Tabs from '@src/components/UI/Tabs';
import PropsBlock from '../PropsBlock';
import ClassNamesBlock from '../ClassNamesBlock';
import styles from './ConfigBlock.scss';

const ConfigBlock = ({ of }) => {
  const [activeTab, setActiveTab] = React.useState(ConfigBlock.TABS.PROPS);
  const changeTab = React.useCallback(tab => () => setActiveTab(tab));
  return (
    <div className={styles.configBlock}>
      <Tabs prefixClassName={styles.configBlockTabs} value={activeTab}>
        <Tabs.Item onClick={changeTab(ConfigBlock.TABS.PROPS)} value={ConfigBlock.TABS.PROPS}>
          Props
        </Tabs.Item>
        <Tabs.Item onClick={changeTab(ConfigBlock.TABS.CLASSNAMES)} value={ConfigBlock.TABS.CLASSNAMES}>
          Class Names
        </Tabs.Item>
      </Tabs>
      {activeTab === 'PROPS' ? <PropsBlock of={of} /> : <ClassNamesBlock of={of} />}
    </div>
  );
};

ConfigBlock.TABS = {
  PROPS: 'PROPS',
  CLASSNAMES: 'CLASSNAMES',
};

export default ConfigBlock;
