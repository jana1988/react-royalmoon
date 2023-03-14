import { useEffect, useState } from "react";
import { getExchangeRate } from "@/services/depositWithdraw";
import { useSelector } from "react-redux";

const useExchangeRate = ({ base, target }) => {
  const { isLogin } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [exchangeRate, setExchangeRate] = useState(null);

  async function fetchExchangeRate() {
    setLoading(true);
    const data = await getExchangeRate(base, target);
    setLoading(false);
    setExchangeRate(data?.toFixed(1));
  }

  useEffect(() => {
    if (isLogin) {
      fetchExchangeRate();
    }
  }, [isLogin]);

  return {
    loading,
    exchangeRate,
  };
};

export default useExchangeRate;
