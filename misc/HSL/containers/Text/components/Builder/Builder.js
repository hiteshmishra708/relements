import React from 'react';
import PropTypes from 'prop-types';

import Drawer from '@src/components/Overlays/Drawer';
import Input from '@src/components/Inputs';

import useForm from '../../../../hooks/useForm';
import RichText from '../../../../components/RichText';
import Add from '../../../../components/Add';
import AddList from '../../../../components/AddList';
import './Builder.scss';

function Builder() {
  const [form, setForm] = useForm({
    text: '',
    voiceText: '',
    micAutoOpen: false,
    quickReplies: [],
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
          value={form.quickReplies.value}
          onChange={setForm('quickReplies')}
          label="Add Quick Reply"
          defaultValue={{
            text: '',
            userMessage: '',
            gogoMessage: '',
          }}
        >
          {(QRForm, setQRForm) => (
            <div>
              <Input.Text
                value={QRForm.text.value}
                error={QRForm.text.error}
                onChange={setQRForm('text')}
                placeholder="Type Here.."
                label="Quick Reply"
              />
              <Add label="Add a different user message">
                <Input.Text
                  label="What goes in user says"
                  placeholder="Type here.."
                  value={QRForm.userMessage.value}
                  error={QRForm.userMessage.error}
                  onChange={setQRForm('userMessage')}
                />
              </Add>
              <Add label="Add a gogo message">
                <Input.Text
                  label="Gogo message"
                  placeholder="Type here.."
                  value={QRForm.gogoMessage.value}
                  error={QRForm.gogoMessage.error}
                  onChange={setQRForm('gogoMessage')}
                />
              </Add>
            </div>
          )}
        </AddList>
      </div>
    </Drawer>
  );
}

Builder.propTypes = {};
Builder.defaultProps = {};

export default Builder;
