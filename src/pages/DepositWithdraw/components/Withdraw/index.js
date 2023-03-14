import { useState, useMemo, useEffect, useCallback } from "react";
import {
  Button,
  Input,
  Toast,
  RadioGroup,
  Radio,
  LoadingScope,
  Empty,
  Modal,
} from "@/components/Ui";
import { useForm, Controller } from "react-hook-form";
import Select from "../Select";
import { isMobile, toFixed2 } from "@/utils";
import {
  getAllWithdrawBanks,
  getAvailableWithdrawApi,
} from "@/services/depositWithdraw";
import {
  withdrawRequestCreate,
  getWithdrawConditionsBalance,
} from "@/services/depositWithdraw";
import useExchangeRate from "../hooks/useExchangeRate";
import { getFixedPointRemittanceAmount } from "../utils/math";
import { exactMatch } from "../utils/regex";
import { Search, Help } from "@/components/Ui/Icon";
import styles from "./index.less";
import { useIntl } from "react-intl";
import { debounce } from "lodash";
import { withdraw_help } from "../../constant";
import { useNavigate } from "react-router-dom";
import Banks from "../Banks";
import FormChannel from "../FormChannel";

const FIELD = {
  WITHDRAWAL_AMOUNT: "withdrawalAmount",
  BANK_ACCOUNT_HOLDER: "bankAccountHolder",
  BANK_ACCOUNT_NUMBER: "bankAccountNumber",
  BANK_NAME: "bankName",
  BANK_BRANCH: "bankBranch",
  WITHDRAW_PASSWORD: "withdrawPassword",
};

const Index = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  const [loadingBalance, setLoadingBalance] = useState(false);

  const [withdrawLoading, setWithdrawLoading] = useState(false);
  const [banks, setBanks] = useState([]);
  const [searchBanks, setSearchBanks] = useState([]);
  const [searchBankText, setSearchBankText] = useState("");

  const [visibleHelp, setVisibleHelp] = useState(false);
  const [visibleKYC, setVisibleKYC] = useState(false);
  const [visibleSure, setVisibleSure] = useState(false);
  const [checkAndConfirm, setCheckAndConfirm] = useState(true);

  const [withdrawBalance, setWidthdrawBalance] = useState([]);

  const [availableBanks, setAvailableBanks] = useState([]);
  const [selectedAvailableBank, setSelectedAvailableBank] = useState({});

  const fetchBanks = async () => {
    const data = await getAllWithdrawBanks();
    if (data) {
      setBanks(data["JPY"]);
      setSearchBanks(data["JPY"]);
    }
  };

  const fetchWithdrawConditionsBalance = async () => {
    setLoadingBalance(true);
    const data = await getWithdrawConditionsBalance();
    setLoadingBalance(false);
    setWidthdrawBalance(data.available === undefined ? {} : data);
  };

  const fetchAvailableWithdrawApi = async () => {
    const data = await getAvailableWithdrawApi();
    const _res = data.map((item) => ({
      ...item,
      id: item.withdrawApiId,
    }));
    setAvailableBanks(_res);
    setSelectedAvailableBank(_res[0]);
  };

  useEffect(() => {
    fetchBanks();
    fetchWithdrawConditionsBalance();
    fetchAvailableWithdrawApi();
  }, []);

  const {
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const { loading: exchangeRateLoading, exchangeRate } = useExchangeRate({
    base: "USD",
    target: "JPY",
  });

  const actualWithdrawAmount = exchangeRate
    ? getFixedPointRemittanceAmount(
        watch(FIELD.WITHDRAWAL_AMOUNT) * exchangeRate,
      )
    : "N/A";

  const onDepositAmountChange = (newValue, oldValue) => {
    const numberStr = String(newValue);
    const re = /^\d*(\.)?(\d{1,2})?$/g;
    if (!exactMatch(re, numberStr)) return oldValue;
    return numberStr;
  };

  const onWithdrawClick = async (values) => {
    const params = {
      accountHolderName: values?.bankAccountHolder,
      accountNumber: values?.bankAccountNumber,
      amount: values?.withdrawalAmount,
      bankBranch: values?.bankBranch,
      bankId: values?.bankName,
      checkAndConfirm,
      withdrawApiId: selectedAvailableBank.withdrawApiId,
      bankAccount: values?.bankAccount,
      bankPassword: values?.bankPassword,
    };

    if (values.withdrawalAmount > withdrawBalance.available) {
      Toast.info(
        intl.$t(
          { id: "INSUFFICIENT_BALANCE" },
          { num: withdrawBalance.available },
        ),
      );
      return;
    }
    setWithdrawLoading(true);
    try {
      const response = await withdrawRequestCreate(params);

      if (response?.success === true) {
        Toast.info(intl.$t({ id: "WITHDRAW_SCCESS" }));
        fetchWithdrawConditionsBalance();
      } else {
        if (response?.errorCode === "WITHDRAW_NOT_ALLOWED_WITHOUT_TAG") {
          setVisibleKYC(true);
          return;
        }
        if (
          response?.errorCode === "MATCH_CAMPAIGN_AND_NO_DEPOSIT_NOR_WITHDRAW"
        ) {
          setCheckAndConfirm(false);
          setVisibleSure(true);
          return;
        }
        Toast.info(`${response?.errorCode}: ${response?.message}`);
      }
    } finally {
      setWithdrawLoading(false);
    }
  };

  const bankId = watch(FIELD.BANK_NAME);
  const selectedBank = useMemo(
    () => banks.find((bank) => bank.id === bankId),
    [banks, bankId],
  );

  const handleSearch = useCallback(
    debounce((val) => {
      setSearchBanks(banks.filter((item) => item.name.includes(val)));
    }, 1000),
    [banks],
  );

  const onSearch = (e) => {
    setSearchBankText(e.target.value);
    handleSearch(e.target.value);
  };

  const renderAlertMessage = (eleName) => {
    if (!errors[eleName]) return;

    return (
      <div className={`${styles.alertMessage}`}>{errors[eleName]?.message}</div>
    );
  };

  const renderForm = () => (
    <div className={styles.form}>
      <form
        onSubmit={handleSubmit(onWithdrawClick)}
        className={styles.form}
        id="withdrawForm">
        <div className={styles.item}>
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
                value: selectedAvailableBank.minWithdrawPerTrans,
                message: intl.$t(
                  { id: "INVALID_AMOUNT_MINIMUM_WITHDRAWAL_AMOUNT" },
                  {
                    withdrawPerTrans:
                      selectedAvailableBank?.minWithdrawPerTrans,
                  },
                ),
              },
              max: {
                value: selectedAvailableBank?.maxWithdrawPerTrans,
                message: intl.$t(
                  { id: "INVALID_AMOUNT_MAXIMUM_WITHDRAWAL_AMOUNT" },
                  {
                    withdrawPerTrans:
                      selectedAvailableBank?.maxWithdrawPerTrans,
                  },
                ),
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
                placeholder={intl.$t(
                  { id: "MINIMUM_WITHDRAWAL_AMOUNT" },
                  {
                    withdrawPerTrans:
                      selectedAvailableBank?.minWithdrawPerTrans,
                  },
                )}
              />
            )}
          />
          {renderAlertMessage(FIELD.WITHDRAWAL_AMOUNT)}
        </div>
        {(selectedAvailableBank.id === 74 ||
          selectedAvailableBank.id === 60 ||
          selectedAvailableBank.id === 61) && (
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
        )}
        {(selectedAvailableBank.id === 74 ||
          selectedAvailableBank.id === 75 ||
          // selectedAvailableBank.id === 77 ||

          selectedAvailableBank.id === 60 ||
          selectedAvailableBank.id === 61) && (
          <div className={styles.item}>
            <label className={styles.label}>
              {intl.$t({
                id:
                  // selectedAvailableBank.id === 77
                  selectedAvailableBank.id === 75
                    ? "ACCOUNT_NUMBER_TIGERPAY"
                    : "ACCOUNT_NUMBER",
              })}
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
          </div>
        )}
        {(selectedAvailableBank.id === 74 ||
          selectedAvailableBank.id === 60 ||
          selectedAvailableBank.id === 61) && (
          <div className={styles.item}>
            <Controller
              name={FIELD.BANK_NAME}
              control={control}
              rules={{ required: intl.$t({ id: "BANKE_NAME_IS_REQUIRED" }) }}
              render={({ field }) => (
                <div className={styles.bankName}>
                  <label className={styles.label}>
                    {intl.$t({ id: "BANK_NAME" })}
                  </label>
                  <Select
                    text={
                      selectedBank?.name || intl.$t({ id: "SELECT_A_BANK" })
                    }
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
                            <Empty
                              text={intl.$t({ id: "CAN_NOT_FIND_KEYWORD" })}
                            />
                          </div>
                        )}
                      </RadioGroup>
                    </div>
                  </Select>
                </div>
              )}
            />
            {renderAlertMessage(FIELD.BANK_NAME)}
          </div>
        )}
        {(selectedAvailableBank.id === 74 ||
          selectedAvailableBank.id === 60 ||
          selectedAvailableBank.id === 61) && (
          <div className={styles.item}>
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
          </div>
        )}

        {selectedAvailableBank.id === 62 && (
          <div className={styles.item}>
            <label className={styles.label}>
              {intl.$t({ id: "VEGAWALLET_BANK_ACCOUNT" })}
            </label>
            <Controller
              name="bankAccount"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "is required",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={`${intl.$t({ id: "VEGAWALLET_BANK_ACCOUNT" })}.`}
                />
              )}
            />
            {renderAlertMessage("bankAccount")}
          </div>
        )}
        {selectedAvailableBank.id === 62 && (
          <div className={styles.item}>
            <label className={styles.label}>
              {intl.$t({ id: "VEGAWALLET_BANK_PASSWORD" })}
            </label>
            <Controller
              name="bankPassword"
              control={control}
              rules={{
                required: {
                  value: true,
                  message: "is required",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder={`${intl.$t({ id: "VEGAWALLET_BANK_PASSWORD" })}`}
                />
              )}
            />
            {renderAlertMessage("bankPassword")}
          </div>
        )}
        <div className={styles.transfer}>
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
        </div>
        <Button
          type="submit"
          className={styles.button}
          form="withdrawForm"
          loading={withdrawLoading}>
          {intl.$t({ id: "WITHDRAW" })}
        </Button>
      </form>
    </div>
  );

  const renderModalHelp = () => (
    <Modal
      visible={visibleHelp}
      title={""}
      onCancel={() => setVisibleHelp(false)}
      footer={
        <Button
          className={styles.help_button}
          onClick={() => {
            navigate(isMobile() ? "/myaccount" : "/personal/myaccount", {
              state: { key: "reward_history" },
            });
          }}>
          {intl.$t({ id: "BUTTON_TAKE_ME_THERE" })}
        </Button>
      }>
      <div className={styles.help_modal}>
        {withdraw_help.map((item, index) => (
          <div className={styles.help_modal_wrap} key={index}>
            <div className={styles.question}>{item.question}</div>
            <div className={styles.answer}>{item.answer}</div>
          </div>
        ))}
        {/* <Button></Button> */}
      </div>
    </Modal>
  );

  const renderModalKYC = () => (
    <Modal
      visible={visibleKYC}
      title={intl.$t({ id: "WITHDRAW_KYC_TITLE" })}
      onCancel={() => setVisibleKYC(false)}
      footer={
        <Button
          className={styles.kyc_button}
          onClick={() => {
            setVisibleKYC(false);
          }}>
          {intl.$t({ id: "WITHDRAW_KYC_BUTTON" })}
        </Button>
      }>
      <div className={styles.kyc_modal}>
        {intl.$t({ id: "WITHDRAW_KYC_CONTENT" })}
      </div>
    </Modal>
  );

  const renderModalSure = () => (
    <Modal
      visible={visibleSure}
      title={intl.$t({ id: "WITHDRAW_SURE_TITLE" })}
      onCancel={() => {
        setVisibleSure(false);
        setCheckAndConfirm(true);
      }}
      footer={
        <Button
          form="withdrawForm"
          className={styles.kyc_button}
          onClick={() => {
            handleSubmit(onWithdrawClick);
            setTimeout(() => {
              setVisibleSure(false);
              setCheckAndConfirm(true);
              fetchWithdrawConditionsBalance();
            }, 1000);
          }}>
          {intl.$t({ id: "WITHDRAW_SURE_BUTTON" })}
        </Button>
      }>
      <div className={styles.kyc_modal}>
        {intl.$t({ id: "WITHDRAW_SURE_CONTENT" })}
      </div>
    </Modal>
  );

  return (
    <div className={styles.withdraw}>
      {!isMobile() && (
        <>
          <div className={styles.title}>{intl.$t({ id: "WITHDRAW" })}</div>
        </>
      )}
      <Banks
        banks={availableBanks}
        selectedBank={selectedAvailableBank}
        onClick={(item) => setSelectedAvailableBank(item)}
      />
      <div className={styles.amount}>
        <div className={styles.left}>
          {intl.$t({ id: "AVAILABLE_BALANCE" })}
          <Help onClick={() => setVisibleHelp(true)} />
        </div>
        <div className={styles.right}>
          {loadingBalance ? (
            <LoadingScope />
          ) : (
            `$${toFixed2(withdrawBalance?.available)}`
          )}
        </div>
      </div>
      {renderForm()}
      {renderModalHelp()}
      {renderModalKYC()}
      {renderModalSure()}
    </div>
  );
};

export default Index;
