import { IntlProvider } from "react-intl";
import { BrowserRouter } from "react-router-dom";
import Route from "./route";
import Content from "@/components/Content";
import { useSelector, useDispatch } from "react-redux";
import { getCurrencies } from "@/services/auth";
import { useMemo, useRef } from "react";
import { onChangeCurrency } from "@/store/reducer/authSlice";

function App() {
  const language = useSelector((state) => state.language);
  const currency = useSelector((state) => state.auth.currency);
  const dispatch = useDispatch();
  const mountRef = useRef(true);

  const fetchCurrencies = async () => {
    const res = await getCurrencies();
    dispatch(onChangeCurrency(res));
  };
  if (mountRef.current) {
    // if (window.location.pathname === "/noip") {
    //   return;
    // }
    fetchCurrencies();
    mountRef.current = false;
  }

  const RouteByCurrency = useMemo(() => {
    return <Route key={currency} />;
  }, [currency]);

  return (
    <BrowserRouter>
      <IntlProvider
        locale={language.locale}
        defaultLocale="en"
        messages={language.messages}>
        {currency ? <Content>{RouteByCurrency}</Content> : null}
      </IntlProvider>
    </BrowserRouter>
  );
}

export default App;
