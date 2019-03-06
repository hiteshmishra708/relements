import React from 'react';
import { storiesOf } from '@storybook/react';

import Header from './Header';
import HeaderLogo from './HeaderLogo';
import HeaderProfile from './HeaderProfile';
import HeaderButtons from './HeaderButtons';
import HeaderLeft from './HeaderLeft';
import HeaderRight from './HeaderRight';
import Button from '../Button';
import ContextMenuButton from '../ContextMenu/ContextMenuButton';
import ContextMenuItem from '../ContextMenu/ContextMenuItem';

storiesOf('Header Component', module).add('Default', () => {
  const story = (
    <Header>
      <HeaderLeft>
        <HeaderLogo>Bot Maker</HeaderLogo>
      </HeaderLeft>
      <HeaderRight>
        <HeaderButtons>
          <Button size="big" primary>
            Train
          </Button>
          <Button size="big">Transfer</Button>
          <ContextMenuButton size="big" title="General Nodes" offset={{ top: 40, left: -144 }}>
            <ContextMenuItem size="big">Bot General Nodes</ContextMenuItem>
            <ContextMenuItem size="big">Story General Nodes</ContextMenuItem>
          </ContextMenuButton>
          <ContextMenuButton size="big" title="More" offset={{ top: 40, left: -108 }}>
            <ContextMenuItem size="big">Extract Bot</ContextMenuItem>
            <ContextMenuItem size="big">General Responses</ContextMenuItem>
            <ContextMenuItem size="big">Node Priority</ContextMenuItem>
          </ContextMenuButton>
        </HeaderButtons>
        <HeaderProfile
          permissions={[
            'athena_user_logout',
            'expert_daily_password_update',
            'athena_chat_review',
            'athena_chat_transfer_payment',
            'athena_chat_transfer_call',
            'expert_dashboard_view_agents',
            'expert_dashboard_add_edit_agents',
            'admin_publisher_tools_view',
            'mogambo_all_view',
            'mogambo_all_edit',
            'mogambo_all_transfer',
            'plutus_transaction_view',
            'plutus_refund_tools_view',
            'admin_wallet_tools_view',
            'content_store_view',
            'expert_auto_logout_inactive',
            'expert_auto_add_new_partner',
            'all_tools_transfer',
            'teja_edit_columns_for_messages',
            'teja_view_compare_clients',
            'templates_view',
            'templates_edit',
            'athena_user_logout',
            'athena_user_logout',
            'expert_daily_password_update',
            'athena_chat_review',
            'athena_chat_transfer_payment',
            'athena_chat_transfer_call',
            'expert_dashboard_view_agents',
            'expert_dashboard_add_edit_agents',
            'admin_publisher_tools_view',
            'mogambo_all_view',
            'mogambo_all_edit',
            'mogambo_all_transfer',
            'plutus_transaction_view',
            'admin_permission_groups_view',
            'admin_partners_view',
            'plutus_refund_tools_view',
            'admin_wallet_tools_view',
            'content_store_view',
            'admin_canned_response_view',
            'teja_edit_columns_for_messages',
            'teja_view_compare_clients',
            'templates_view',
            'templates_edit',
          ]}
        />
      </HeaderRight>
    </Header>
  );
  return story;
});
