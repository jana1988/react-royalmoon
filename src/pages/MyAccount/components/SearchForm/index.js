import styles from "./index.less";
import { DatePicker, Select, RadioGroup, Radio } from "@/components/Ui";
import { useIntl, FormattedMessage } from "react-intl";
import dayjs from "@/common/day";
import { useState } from "react";
export default (props) => {
  const intl = useIntl();
  const {
    selects = [],
    onSearch = null,
    onStartTime = null,
    onEndTime = null,
    onSelect = null,
  } = props;

  const [status, setStatus] = useState(-1);
  const selectLabel = selects.find((item) => item.value === status)?.label;

  return (
    <div className={styles["form-wrap"]}>
      <DatePicker
        onChange={(date) => {
          onStartTime && onStartTime(dayjs(date).startOf("date").format());
        }}
        placeholder={intl.$t({ id: "STARTING_TIME" })}
      />
      <DatePicker
        onChange={(date) => {
          onEndTime &&
            onEndTime(dayjs(date).add(1, "day").startOf("date").format());
        }}
        placeholder={intl.$t({ id: "ENDING_TIME" })}
      />
      {selects.length > 0 && (
        <Select text={selectLabel} buttonClassName={styles.selectBtn}>
          <RadioGroup
            onChange={(value) => {
              setStatus(value);
              onSelect(value);
            }}
            value={status}>
            {selects.map((item) => (
              <Radio
                key={item.label}
                value={item.value}
                className={styles.radio_item}>
                {item.label}
              </Radio>
            ))}
          </RadioGroup>
        </Select>
      )}

      <button className={styles["form-submit"]} onClick={onSearch}>
        {<FormattedMessage id="SEARCH" />}
      </button>
    </div>
  );
};
