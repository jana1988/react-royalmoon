import { useForm, Controller } from "react-hook-form";
import { useIntl } from "react-intl";
import {
  Button,
  Input,
  RadioGroup,
  Radio,
  LoadingScope,
  Empty,
} from "@/components/Ui";
import styles from "./index.less";
import { exactMatch } from "../utils/regex";
import Select from "../Select";

const FIELD = {
  WITHDRAWAL_AMOUNT: "withdrawalAmount",
  BANK_ACCOUNT_HOLDER: "bankAccountHolder",
  BANK_ACCOUNT_NUMBER: "bankAccountNumber",
  BANK_NAME: "bankName",
  BANK_BRANCH: "bankBranch",
};

export default (props) => {
  const { formInput = [] } = props;
  const intl = useIntl();

  console.log(1111111, formInput);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const onDepositAmountChange = (newValue, oldValue) => {
    const numberStr = String(newValue);
    const re = /^\d*(\.)?(\d{1,2})?$/g;
    if (!exactMatch(re, numberStr)) return oldValue;
    return numberStr;
  };

  const onWithdrawClick = async (values) => {};

  const renderAlertMessage = (eleName) => {
    if (!errors[eleName]) return;

    return (
      <div className={`${styles.alertMessage}`}>{errors[eleName]?.message}</div>
    );
  };

  const renderController = (item, index) => {
    return (
      <div className={styles.item} key={index}>
        <label className={styles.label}>
          {intl.$t({
            id: `DEPOSIT_WITHDRAW_${item.parameterName.toUpperCase()}`,
          })}
        </label>
        <Controller
          name={item.parameterName}
          control={control}
          rules={{
            required: {
              value: item.required,
              // message: intl.$t({ id: "AMOUNT_IS_REQUIRED" }),
            },
          }}
          render={({ field }) => <Input {...field} />}
        />
        {renderAlertMessage(item.parameterName)}
      </div>
    );
  };

  return (
    <div className={styles.form}>
      <form
        onSubmit={handleSubmit(onWithdrawClick)}
        className={styles.form}
        id="withdrawForm">
        {formInput.map((item, index) => renderController(item, index))}
        {/* <div className={styles.item}>
          <label className={styles.label}>
            {intl.$t({ id: "WITHDRAWAL_AMOUNT" })}
          </label>
          <Controller
            name={FIELD.WITHDRAWAL_AMOUNT}
            control={control}
            rules={{
              required: {
                value: true,
                message: intl.$t({ id: "AMOUNT_IS_REQUIRED" }),
              },
              min: {
                value: 19.9,
                message: intl.$t({
                  id: "INVALID_AMOUNT_MINIMUM_WITHDRAWAL_AMOUNT",
                }),
              },
              max: {
                value: 12000.1,
                message: intl.$t({
                  id: "INVALID_AMOUNT_MAXIMUM_WITHDRAWAL_AMOUNT",
                }),
              },
            }}
            render={({ field }) => (
              <Input
                {...field}
                onChange={(e) => {
                  field.onChange(
                    onDepositAmountChange(e.target.value, field.value),
                  );
                }}
                placeholder={intl.$t({ id: "MINIMUM_WITHDRAWAL_AMOUNT" })}
              />
            )}
          />
          {renderAlertMessage(FIELD.WITHDRAWAL_AMOUNT)}
        </div>
        <div className={styles.item}>
          <label className={styles.label}>
            {intl.$t({ id: "ACCOUNT_HOLDER" })}
          </label>
          <Controller
            name={FIELD.BANK_ACCOUNT_HOLDER}
            control={control}
            rules={{
              required: intl.$t({ id: "ACCOUNT_HOLDER_IS_REQUIRED" }),
            }}
            render={({ field }) => <Input {...field} />}
          />
          {renderAlertMessage(FIELD.BANK_ACCOUNT_HOLDER)}
        </div>
        <div className={styles.item}>
          <label className={styles.label}>
            {intl.$t({ id: "ACCOUNT_NUMBER" })}
          </label>
          <Controller
            name={FIELD.BANK_ACCOUNT_NUMBER}
            control={control}
            rules={{
              required: intl.$t({ id: "ACCOUNT_NUMBER_IS_REQUIRED" }),
            }}
            render={({ field }) => <Input {...field} />}
          />
          {renderAlertMessage(FIELD.BANK_ACCOUNT_NUMBER)}
        </div> */}
        {/* <Controller
          name={FIELD.BANK_NAME}
          control={control}
          rules={{ required: intl.$t({ id: "BANKE_NAME_IS_REQUIRED" }) }}
          render={({ field }) => (
            <div className={styles.bankName}>
              <label className={styles.label}>
                {intl.$t({ id: "BANK_NAME" })}
              </label>
              <Select
                text={selectedBank?.name || intl.$t({ id: "SELECT_A_BANK" })}
                buttonClassName={styles.selectButton}>
                <div className={styles.search}>
                  <input
                    placeholder={intl.$t({ id: "SELECT_A_BANK" })}
                    onChange={onSearch}
                    value={searchBankText}
                  />
                  <Search
                    onClick={() => {
                      setSearchBanks(
                        banks.filter((item) =>
                          item.name.includes(searchBankText),
                        ),
                      );
                    }}
                  />
                </div>
                <div className={styles.select_content}>
                  <RadioGroup value={selectedBank?.value} {...field}>
                    {searchBanks.length ? (
                      searchBanks.map((item) => (
                        <Radio
                          key={item.id}
                          value={item.id}
                          className={styles.radio}>
                          {item.name}
                        </Radio>
                      ))
                    ) : (
                      <div className={styles.empty}>
                        <Empty text={intl.$t({ id: "CAN_NOT_FIND_KEYWORD" })} />
                      </div>
                    )}
                  </RadioGroup>
                </div>
              </Select>
            </div>
          )}
        />
        {renderAlertMessage(FIELD.BANK_NAME)} */}
        {/* <div className={styles.item}>
          <label className={styles.label}>
            {intl.$t({ id: "BRANCH_NAME" })}
          </label>
          <Controller
            name={FIELD.BANK_BRANCH}
            control={control}
            rules={{ required: intl.$t({ id: "BRANCH_NAME_IS_REQUIRED" }) }}
            render={({ field }) => <Input {...field} />}
          />
          {renderAlertMessage(FIELD.BANK_BRANCH)}
        </div> */}
        {/* <div className={styles.transfer}>
          <div className={styles.title}>{intl.$t({ id: "SUMMARY" })}</div>
          <div className={styles.content}>
            <div className={styles.text}>
              <div className={styles.left}>
                {intl.$t({ id: "WILL_RECEIVE" })}
              </div>
              <div className={styles.right}>
                {exchangeRateLoading ? (
                  <LoadingScope />
                ) : (
                  `JPY${actualWithdrawAmount}`
                )}
              </div>
            </div>
          </div>
        </div> */}
        {/* <Button
          type="submit"
          className={styles.button}
          form="withdrawForm"
          loading={withdrawLoading}>
          {intl.$t({ id: "WITHDRAW" })}
        </Button> */}
      </form>
    </div>
  );
};
