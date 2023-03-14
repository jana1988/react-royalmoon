import { useEffect, useState } from "react";
import { Checkbox } from "..";

const Index = (props) => {
  const { onChange = null, options = [], defaultValue = [] } = props || {};
  const [newDefaultValue, setNewDefaultValue] = useState(defaultValue);

  const onChanged = (e) => {
    if (newDefaultValue.includes(e.target.value)) {
      setNewDefaultValue((newDefaultValue) =>
        newDefaultValue.splice(
          newDefaultValue.findIndex((item) => item === e.target.value),
          1,
        ),
      );
    } else {
      setNewDefaultValue([...newDefaultValue, e.target.value]);
    }
  };

  useEffect(() => {
    onChange(newDefaultValue);
  }, [newDefaultValue]);

  return (
    <>
      {options.map((item) => (
        <Checkbox
          onChange={onChanged}
          value={item.value}
          key={item.value}
          checked={newDefaultValue.includes(item.value)}>
          {item.label}
        </Checkbox>
      ))}
    </>
  );
};

export default Index;
