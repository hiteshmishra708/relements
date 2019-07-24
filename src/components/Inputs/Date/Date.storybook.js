import React from "react";
import { storiesOf } from "@storybook/react";

import DatePicker from "./Date";
import Docs from "./Date.mdx";

storiesOf("Components|Inputs/Date", module).add("Documentation", () => (
  <Docs />
));

class DateWrapper extends React.Component {
  state = {
    value: new Date(),
  };

  render() {
    console.log("VALUE", this.state.value);
    return (
      <DatePicker
        label="Select Date"
        placeholder="Select..."
        value={this.state.value}
        onChange={value => this.setState({ value })}
        minDate={new Date()}
      />
    );
  }
}

class DateWrapperRange extends React.Component {
  state = {
    value: {
      startDate: new Date(),
      endDate: new Date(),
    },
  };

  render() {
    console.log("VALUE", this.state.value);
    return (
      <DatePicker
        label="Select Date"
        placeholder="Select..."
        value={this.state.value}
        onChange={value => this.setState({ value })}
        minDate={new Date()}
        withRange
      />
    );
  }
}

class DateWrapperRangeComparison extends React.Component {
  state = {
    value: {
      startDate: new Date(),
      endDate: new Date(),
    },
  };

  render() {
    return (
      <DatePicker
        label="Select Date"
        placeholder="Select..."
        value={this.state.value}
        onChange={value => this.setState({ value })}
        minDate={new Date()}
        withRange
        withComparison
      />
    );
  }
}
