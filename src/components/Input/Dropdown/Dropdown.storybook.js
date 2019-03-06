import React from "react";
import { storiesOf } from "@storybook/react";
import {
  withKnobs,
  array,
  text,
  object,
  boolean
} from "@storybook/addon-knobs";
import Dropdown from "./Dropdown";

const stories = storiesOf("Dropdown", module);
stories.addDecorator(withKnobs);
let props = {
  // placeholder: PropTypes.string,
  placeholder: "Select",
  // className: PropTypes.string,
  // value: PropTypes.string,
  value: "Default value",
  // label: PropTypes.string,
  label: "Select dropdown",
  // onChange: PropTypes.func,
  // onFocus: PropTypes.func,
  // onBlur: PropTypes.func,
  // options: PropTypes.array,
  options: [
    { text: "Option text 1" },
    { text: "Option text 2" },
    { text: "Option text 3" },
    { text: "Option text 4" }
  ],

  // optionKey: PropTypes.string,
  optionKey: "text",
  // noOptionsText: PropTypes.string,
  noOptionsText: "No options found",
  // error: PropTypes.string,
  // errorMessage: PropTypes.string,
  // errorMsgClassName: PropTypes.string,
  // hint: PropTypes.string,
  hint: "This is a dropdown"
};

stories.add("Default", () => {
  const label = text("Label", props.label);
  const options = props.options.map((option, i) => {
    return { text: text(`Option ${i + 1}`, option.text) };
  });
  const mode = boolean("Position (Top/Bottom)", false);
  const placeholder = text("Placeholder", props.placeholder);
  const story = (
    <Dropdown
      placeholder={placeholder}
      options={options}
      label={label}
      reverseMode={mode}
    />
  );
  return story;
});
