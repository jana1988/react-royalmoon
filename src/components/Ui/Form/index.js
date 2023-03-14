import React from "react";
import FieldContext from "./FieldContext";
import useForm from "./useForm";
const Form = ({
  initialValues,
  onFinish,
  children,
  onFinishFailed,
  id = "form",
}) => {
  let [formInstance] = useForm();
  formInstance.setCallbacks({ onFinish, onFinishFailed });
  const mountRef = React.useRef(null);
  // formInstance.setInitialValues(initialValues, mountRef.current);
  formInstance.setInitialValues(initialValues);

  if (!mountRef.current) {
    mountRef.current = true;
  }
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        formInstance.onSubmit();
      }}
      id={id}>
      <FieldContext.Provider value={formInstance}>
        {children}
      </FieldContext.Provider>
    </form>
  );
};

export default Form;
