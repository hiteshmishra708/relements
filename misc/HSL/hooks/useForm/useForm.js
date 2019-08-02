import React from 'react';

const DEFAULT = (key, value) => ({
  error: false,
  value: value[key],
});

function convertToObject(value) {
  const defaultValue = {};
  Object.keys(value).map((key) => {
    defaultValue[key] = DEFAULT(key, value);
  });
  return defaultValue;
}

export default function useForm(value, onChange) {
  const [rawForm, setRawForm] = React.useState(convertToObject(value));
  const setForm = React.useCallback(key => (value) => {
    setRawForm({ ...rawForm, [key]: { ...rawForm[key], value } });
  });

  return [rawForm, setForm];
}
