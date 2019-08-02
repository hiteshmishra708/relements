import React from 'react';
import PropTypes from 'prop-types';

import Input from '@src/components/Inputs';
import { Switch, Case } from '../../SwitchCase';

import {
  ACTIONABLE_OPTIONS,
  ACTIONABLE_TYPES,
  URI_TYPES,
  URI_OPTIONS,
} from './const';
import './Actionable.scss';

function ActionableBuilder({ value, onChange }) {
  console.log(value);
  return (
    <div>
      <Input.Dropdown
        value={value.type}
        error={value.type.error}
        onChange={onChange('type')}
        placeholder="Type Here.."
        label="Button Type"
        options={ACTIONABLE_OPTIONS}
        optionKey="label"
      />
      <Input.Text
        value={value.text}
        error={value.text.error}
        onChange={onChange('text')}
        placeholder="Type Here.."
        label="Button Text"
      />
      <Switch condition={value.type.value}>
        <Case value={ACTIONABLE_TYPES.OPEN_SCREEN}>
          <Input.Dropdown
            value={value.uri}
            // error={value.type.error}
            onChange={onChange('uri')}
            placeholder="Type Here.."
            label="Screen to Open"
            options={URI_OPTIONS}
            optionKey="label"
          />
          <Switch condition={value.uri.value}>
            <Case value={URI_TYPES.WEBVIEW}>
              <Input.Dropdown
                value={value.uri}
                // error={value.type.error}
                onChange={onChange('uri')}
                placeholder="Type Here.."
                label="Screen to Open"
                options={URI_OPTIONS}
                optionKey="label"
              />
            </Case>
          </Switch>
        </Case>
      </Switch>
    </div>
  );
}

ActionableBuilder.propTypes = {
  children: PropTypes.node.isRequired,
};

ActionableBuilder.defaultProps = {};

export default ActionableBuilder;
