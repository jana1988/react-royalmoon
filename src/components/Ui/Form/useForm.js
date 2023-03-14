import React from "react";
import Schema from "./async-validator";
class FormStore {
  constructor(forceRootRender) {
    this.store = {};
    this.callbacks = {};
    this.forceRootRender = forceRootRender;
    this.fieldEntities = [];
    this.message = {};
  }
  regsisterField = (fieldEntity) => {
    this.fieldEntities.push(fieldEntity);
  };
  setInitialValues = (initialValues, mount) => {
    if (!mount) {
      this.store = { ...initialValues };
    }
  };
  setFieldValue = (name, value) => {
    this.store[name] = value;
    this._notify();
  };
  setFieldsValue = (newStore = {}) => {
    this.store = { ...this.store, ...newStore };
    this._notify();
  };
  _notify = () => {
    this.fieldEntities.forEach((entity) => entity.onStoreChange());
  };
  getFieldValue = (name) => {
    return this.store[name];
  };
  getFieldsValue = () => {
    return this.store;
  };
  setCallbacks = (callbacks) => {
    this.callbacks = callbacks;
  };
  onSubmit = () => {
    this.validateFields()
      .then((values) => {
        let { onFinish } = this.callbacks;
        if (onFinish) {
          onFinish(values);
          this.message = {};
          this.setFieldsValue();
        }
      })
      .catch((errorInfo) => {
        let { onFinishFailed } = this.callbacks;
        if (onFinishFailed) {
          this.message = errorInfo;
          onFinishFailed(errorInfo);
          this.setFieldsValue();
        }
      });
  };
  validateFields = () => {
    let values = this.getFieldsValue();
    let descriptor = this.fieldEntities.reduce((descriptor, entity) => {
      let rules = entity.props.rules;
      if (rules && rules.length > 0) {
        let config = rules.reduce((memo, rule) => {
          memo = { ...memo, ...rule };
          return memo;
        }, {});
        descriptor[entity.props.name] = config;
      }
      return descriptor;
    }, {});
    return new Schema(descriptor).validate(values);
  };
  getErrorInfo = (name) => {
    // console.log(this.store);
    return this.message[name];
  };
  getForm = () => {
    return {
      regsisterField: this.regsisterField,
      setInitialValues: this.setInitialValues,
      getFieldValue: this.getFieldValue,
      getFieldsValue: this.getFieldsValue,
      setFieldValue: this.setFieldValue,
      setFieldsValue: this.setFieldsValue,
      setCallbacks: this.setCallbacks,
      onSubmit: this.onSubmit,
      getErrorInfo: this.getErrorInfo,
    };
  };
}

export default function useForm() {
  let formRef = React.useRef(null);
  let [, forceUpdate] = React.useState({});
  if (!formRef.current) {
    const forceRootRender = () => {
      forceUpdate({});
    };
    let formStore = new FormStore(forceRootRender);
    formRef.current = formStore.getForm();
  }

  return [formRef.current];
}
