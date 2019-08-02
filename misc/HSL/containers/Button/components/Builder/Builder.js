import React from 'react';
import PropTypes from 'prop-types';

import Drawer from '@src/components/Overlays/Drawer';
import Input from '@src/components/Inputs';

import useForm from '../../../../hooks/useForm';
import Builders from '../../../../components/Builders';
import Add from '../../../../components/Add';
import AddList from '../../../../components/AddList';
import './Builder.scss';

function Builder() {
  const [form, setForm] = useForm({
    text: '',
    voiceText: '',
    micAutoOpen: false,
    actionables: [],
  });
  return (
    <Drawer active>
      <Drawer.Header withCross onClose={() => {}}>
        Text
      </Drawer.Header>
      <div>
        <Input.Text
          multiline
          label="Bot Says"
          placeholder="Type here..."
          value={form.text.value}
          error={form.text.error}
          onChange={setForm('text')}
        />
        <Add label="Voice Support">
          <>
            <Input.Text
              multiline
              value={form.voiceText.value}
              error={form.voiceText.error}
              onChange={setForm('voiceText')}
              label="Voice Says"
              placeholder="Type here..."
            />
            <Input.Toggle
              value={form.micAutoOpen.value}
              error={form.micAutoOpen.error}
              onChange={setForm('micAutoOpen')}
              label="Auto open mic"
            />
          </>
        </Add>
        <AddList
          value={form.actionables.value}
          onChange={setForm('actionables')}
          label="Add Actionable"
          defaultValue={{
            type: '',
            text: '',
          }}
        >
          {(actionable, setActionable) => (
            <Builders.Actionable value={actionable} onChange={setActionable} />
          )}
        </AddList>
      </div>
    </Drawer>
  );
}

Builder.propTypes = {};
Builder.defaultProps = {};

export default Builder;
