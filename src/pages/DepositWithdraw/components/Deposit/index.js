import { useState, useEffect } from "react";
import copy from "copy-to-clipboard";
import Input from "@/components/Ui/Form/Input";
import { isMobile } from "@/utils";
import { Button, Modal, Toast, Loading, Empty } from "@/components/Ui";
import styles from "./index.less";
import useExchangeRate from "../hooks/useExchangeRate";
import { getFixedPointRemittanceAmount } from "../utils/math";
import { exactMatch } from "../utils/regex";
import { useIntl } from "react-intl";
import { paymentRequests, getPaymentMethods } from "@/services/depositWithdraw";

import { Duplicate } from "@/components/Ui/Icon";
import Banks from "../Banks";
import { useForm, Controller } from "react-hook-form";

const Index = () => {
  const intl = useIntl();
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  const [paymentData, setPaymentData] = useState({});
  const [paymentMethods, setPaymentMethods] = useState([]);

  const [selectedPayment, setSelectedPayment] = useState(null);
  const [depositAmount, setDepositAmount] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [newWindowModal, setNewWindowModal] = useState(false);

  const [actionInfo, setActionInfo] = useState(null);

  const { exchangeRate } = useExchangeRate({
    base: "USD",
    target: "JPY",
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  });

  const fetchPaymentMethods = async () => {
    try {
      setLoading(true);
      const data = await getPaymentMethods();
      setLoading(false);
      if (data.length) {
        setPaymentMethods(data);
        setSelectedPayment(data[0]);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const fetchPaymentRequests = async (params) => {
    try {
      setPaymentLoading(true);
      const data = await paymentRequests(params);
      setPaymentLoading(false);
      setDepositAmount(0);
      setPaymentData(data);
      if (selectedPayment.id === 10016) {
        if (data.errorCode === "EXTERNAL_PAYMENT_API_ERROR") {
          Toast.info(intl.$t({ id: "VEGAWALLET_FILAD_TOAST" }));
        } else {
          Toast.info(intl.$t({ id: "VEGAWALLET_SUCCESS_TOAST" }));
        }
        return;
      }
      if (data.actionType === "DISPLAY") {
        setOpenModal(true);
        setActionInfo(data.actionInfo);
      } else if (
        data.actionType === "REDIRECT_PAGE" ||
        data.actionType === "SUBMIT_POST_FORM"
      ) {
        setNewWindowModal(true);
      }
    } catch (error) {
      setPaymentLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const NOT_AVAILABLE = "N/A";

  const remittanceAmount = exchangeRate
    ? getFixedPointRemittanceAmount(depositAmount * exchangeRate)
    : NOT_AVAILABLE;

  const onCloseModal = () => {
    setOpenModal(false);
  };

  const onDepositClick = async ({ amount, bankAccount, bankPassword }) => {
    const params = {
      amount,
      paymentMethodId: selectedPayment?.id,
    };
    if (selectedPayment.id === 10016) {
      params.params = {
        bankAccount,
        bankPassword,
      };
    }

    fetchPaymentRequests(params);
  };

  const onDepositAmountChange = (newValue, oldValue) => {
    const numberStr = String(newValue);
    const re = /^\d*(\.)?(\d{1,2})?$/g;
    if (!exactMatch(re, numberStr)) return oldValue;
    setDepositAmount(numberStr);
    return numberStr;
  };

  function postOpenWindow(URL, PARAMS, target) {
    if (target == null) target = "_blank";
    var temp_form = document.createElement("form");
    temp_form.action = URL;
    temp_form.target = target;
    temp_form.method = "post";
    temp_form.style.display = "none";
    for (var x in PARAMS) {
      var opt = document.createElement("input");
      opt.name = x;
      opt.value = PARAMS[x];
      temp_form.appendChild(opt);
    }
    document.body.appendChild(temp_form);
    temp_form.submit();
    document.body.removeChild(temp_form);
  }

  const renderForm = () => (
    <div className={styles.form}>
      <form
        onSubmit={handleSubmit(onDepositClick)}
        className={styles.form}
        id="depositForm">
        <div className={styles.item}>
          <label className={styles.label}>
            {intl.$t({ id: "DEPOSIT_AMOUNT" })}
          </label>
          <Controller
            name="amount"
            control={control}
            rules={{
              required: {
                value: true,
                message: intl.$t({ id: "AMOUNT_IS_REQUIRED" }),
              },
              min: {
                value: selectedPayment?.minDeposit,
                message: intl.$t(
                  { id: "DEPOSIT_AMOUNT_VALID" },
                  {
                    A: selectedPayment?.minDeposit,
                    B: selectedPayment?.maxDeposit,
                  },
                ),
              },
              max: {
                value: selectedPayment?.maxDeposit,
                message: intl.$t(
                  { id: "DEPOSIT_AMOUNT_VALID" },
                  {
                    A: selectedPayment?.minDeposit,
                    B: selectedPayment?.maxDeposit,
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
                placeholder={`${intl.$t({ id: "DEPOSIT_UNIT_MIN" })} ${
                  selectedPayment?.minDeposit
                }${intl.$t({ id: "DEPOSIT_UNIT_MAX" })} ${
                  selectedPayment?.maxDeposit
                }.`}
              />
            )}
          />
          {renderAlertMessage("amount")}
        </div>
        {selectedPayment.id === 10016 && (
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
        {selectedPayment.id === 10016 && (
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

        {![7, 10016, 75].includes(selectedPayment.id) && (
          <div className={styles.transfer}>
            <div className={styles.title}>
              {intl.$t({ id: "DEPOSIT_TRANSFER" })}
            </div>
            <div className={styles.content}>
              <div className={styles.text}>
                <div className={styles.left}>
                  {intl.$t({ id: "DEPOSIT_AMOUNT_JPY" })}
                </div>
                <div className={styles.right}>{`JPY${remittanceAmount}`}</div>
              </div>
              <div className={styles.text}>
                <div className={styles.left}>
                  {intl.$t({ id: "WILL_RECEIVE" })}
                </div>
                <div className={styles.right}>{`$${depositAmount}`}</div>
              </div>
              <div className={styles.text}>
                <div className={styles.left}>
                  {intl.$t({ id: "DEPOSIT_RATE" })}
                </div>
                <div className={styles.right}>{`1 USD = ${
                  exchangeRate ?? NOT_AVAILABLE
                } JPY`}</div>
              </div>
              {/* 暫時隱藏，待後端API完成 */}
              {/* <div className={styles.text}>
              <div className={styles.left}>handling fee</div>
              <div className={styles.right}>0</div>
            </div> */}
            </div>
          </div>
        )}

        <Button
          type="submit"
          className={styles.button}
          form="depositForm"
          loading={paymentLoading}>
          {intl.$t({ id: "DEPOSIT" })}
        </Button>
        {![7, 10016, 75].includes(selectedPayment.id) && (
          <div className={styles.tips}>
            <p>{intl.$t({ id: "NOTICE_1" })}</p>
            <p>{intl.$t({ id: "NOTICE_2" })}</p>
          </div>
        )}
      </form>
    </div>
  );

  const renderAlertMessage = (eleName) => {
    if (!errors[eleName]) return;

    return (
      <div className={`${styles.alertMessage}`}>{errors[eleName]?.message}</div>
    );
  };

  const CopyIcon = ({ value }) => (
    <Duplicate
      onClick={() => {
        copy(value);
        Toast.info("success");
      }}
    />
  );

  const renderDepositModal = () => {
    return (
      <Modal
        visible={openModal}
        onCancel={onCloseModal}
        onOk={onCloseModal}
        title={intl.$t({ id: "CHARGE_RESULT" })}
        showFooter={false}>
        <div className={styles.result}>
          <div className={styles.content}>
            <div className={styles.text}>
              <div className={styles.label}>
                {intl.$t({ id: "DEPOSIT_ACTUAL" })}
              </div>
              <div className={styles.input}>
                <div className={styles.left}>{actionInfo?.amount}</div>
                <div className={styles.right}>
                  <CopyIcon value={actionInfo?.amount} />
                </div>
              </div>
            </div>
            <div className={styles.text}>
              <div className={styles.label}>{intl.$t({ id: "BANK_NAME" })}</div>
              <div className={styles.input}>
                <div className={styles.left}>{actionInfo?.bankName}</div>
                <div className={styles.right}>
                  <CopyIcon value={actionInfo?.bankName} />
                </div>
              </div>
            </div>
            <div className={styles.text}>
              <div className={styles.label}>
                {intl.$t({ id: "BANK_ACCOUNT_NUMBER" })}
              </div>
              <div className={styles.input}>
                <div className={styles.left}>{actionInfo?.accountNumber}</div>
                <div className={styles.right}>
                  <CopyIcon value={actionInfo?.accountNumber} />
                </div>
              </div>
            </div>
            <div className={styles.text}>
              <div className={styles.label}>
                {intl.$t({ id: "ACCOUNT_HOLDER" })}
              </div>
              <div className={styles.input}>
                <div className={styles.left}>{actionInfo?.accountName}</div>
                <div className={styles.right}>
                  <CopyIcon value={actionInfo?.accountName} />
                </div>
              </div>
            </div>
            <div className={styles.text}>
              <div className={styles.label}>
                {intl.$t({ id: "BRANCH_NAME" })}
              </div>
              <div className={styles.input}>
                <div className={styles.left}>{actionInfo?.bankBranchName}</div>
                <div className={styles.right}>
                  <CopyIcon value={actionInfo?.bankBranchName} />
                </div>
              </div>
            </div>
            <div className={styles.text}>
              <div className={styles.label}>
                {intl.$t({ id: "TRANSACTION_NO" })}
              </div>
              <div className={styles.input}>
                <div className={styles.left}>
                  {actionInfo?.identificationNumber}
                </div>
                <div className={styles.right}>
                  <CopyIcon value={actionInfo?.identificationNumber} />
                </div>
              </div>
            </div>
          </div>
          <div
            className={styles.footer}
            dangerouslySetInnerHTML={{
              __html: intl.$t({ id: "DEPOSIT_MODAL_FOOTER" }),
            }}></div>
        </div>
      </Modal>
    );
  };

  const renderNewWindowModal = () => {
    return (
      <Modal
        visible={newWindowModal}
        onOk={() => {
          if (paymentData.actionType === "SUBMIT_POST_FORM") {
            postOpenWindow(
              paymentData.actionInfo.url,
              paymentData.actionInfo.parameters,
              "_blank",
            );
          } else {
            window.open(paymentData?.actionInfo.url);
          }
        }}
        onCancel={() => setNewWindowModal(false)}
        title={intl.$t({ id: "PROCEED_TO_PAYMENT" })}>
        <div className={styles.newwindow_content}>
          <p className={styles.tips}>
            {intl.$t({ id: "PROCEED_TO_PAYMENT_TIP" })}
          </p>
        </div>
      </Modal>
    );
  };

  return (
    <div className={styles.deposit}>
      {!isMobile() && (
        <div className={styles.title}>{intl.$t({ id: "DEPOSIT" })}</div>
      )}
      {loading ? (
        <Loading />
      ) : paymentMethods.length === 0 ? (
        <Empty
          className={styles.empty}
          text={intl.$t({ id: "EMPTY_DEPOSIT" })}
        />
      ) : (
        <>
          <Banks
            banks={paymentMethods}
            selectedBank={selectedPayment}
            onClick={(item) => setSelectedPayment(item)}
          />
          {renderForm()}
          {renderDepositModal()}
          {renderNewWindowModal()}
        </>
      )}
    </div>
  );
};

export default Index;
