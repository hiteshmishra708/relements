import "@babel/polyfill";
import React from "react";
import ReactDOM from "react-dom";

export Slider from "components/UI/Slider";
export Table from "components/UI/Table";
export Tabs from "components/UI/Tabs";
export Calendar from "components/UI/Calendar";
export Accordion from "components/UI/Accordion";
export Icon from "components/UI/Icon";
export Button from "components/UI/Button";
export Pagination from "components/UI/Pagination";
export Odometer from "components/UI/Odometer";
export Loader from "components/UI/Loader";

export Date from "components/Inputs/Date";
export File from "components/Inputs/File";
export Dropdown from "components/Inputs/Dropdown";
export Search from "components/Inputs/Search";
export RangeSlider from "components/Inputs/RangeSlider";
export Time from "components/Inputs/Time";
export Checkbox from "components/Inputs/Checkbox";
export Chips from "components/Inputs/Chips";
export Text from "components/Inputs/Text";
export Radio from "components/Inputs/Radio";
export Tab from "components/Inputs/Tab";
export NumberCounter from "components/Inputs/NumberCounter";
export Toggle from "components/Inputs/Toggle";

export ContextMenu from "components/Overlays/ContextMenu";
export Drawer from "components/Overlays/Drawer";
export Modal from "components/Overlays/Modal";

export useActivify from "@src/hooks/useActivify";
export useLoader from "@src/hooks/useLoader";

export Provider from "components/Context/Provider";

export const render = (component, element, props) => {
  ReactDOM.render(
    React.createElement(component, props),
    document.getElementById(element),
  );
};
