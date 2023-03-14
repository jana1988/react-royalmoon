import React from "react";
import FieldContext from "./FieldContext";

class Field extends React.Component {
  static contextType = FieldContext;

  componentDidMount() {
    this.context.regsisterField(this);
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  getControlled = (childProps) => {
    const { getFieldValue, setFieldValue, getErrorInfo } = this.context;
    const { name, label, placeholder, className, rules = [] } = this.props;
    const isRequired =
      (rules.length > 0 && rules.find((ele) => ele.required).required) || false;
    return {
      ...childProps,
      label,
      placeholder,
      value: getFieldValue(name),
      onChange: (event) => {
        setFieldValue(name, event.target.value);
        childProps && childProps.onChange && childProps.onChange(event);
      },
      message: getErrorInfo(name),
      className,
      required: isRequired,
    };
  };
  render() {
    let children = this.props.children;
    return React.cloneElement(children, this.getControlled(children.props));
  }
}

export default Field;
