import { Tabs, TabsMb, NavBar, Loading } from "@/components/Ui";
import PersonalInfo from "./components/PersonalInfo";
import KYC from "./components/KYC";
import Security from "./components/Security";
import { isMobile } from "@/utils";
import { useState, useEffect } from "react";
import { getUserProfile, getKycList } from "@/services/setting";
import { getUserEmail } from "@/services/auth";
import { useIntl } from "react-intl";
import useGuard from "@/hooks/useGuard";
import styles from "./index.less";

const Index = () => {
  useGuard();
  const intl = useIntl();
  const [data, setData] = useState({});
  const [email, setEmail] = useState("");
  const [kycList, setKycList] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);

  const fetchUserProfile = async () => {
    setLoading(true);
    try {
      const res = await getUserProfile();
      if (res) {
        setData(res);
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchUserEmail = async () => {
    const res = await getUserEmail();
    if (res) {
      setEmail(res.email);
    }
  };

  const fetchKycList = async () => {
    const res = await getKycList();
    if (res) {
      setKycList(res);
    }
  };

  useEffect(() => {
    if (activeTab === "1") {
      fetchUserProfile();
    }
  }, [activeTab]);

  useEffect(() => {
    fetchUserEmail();
    fetchKycList();
  }, []);

  return (
    <div className={styles.setting}>
      {isMobile() ? (
        <div>
          <NavBar title={intl.$t({ id: "PERSONAL_TAB_4" })} />
          <TabsMb
            defaultActiveKey="1"
            items={[
              {
                label: intl.$t({ id: "SETTING_TAB_1" }),
                key: "1",
                children: <PersonalInfo data={data} email={email} />,
              },
              {
                label: intl.$t({ id: "SETTING_TAB_2" }),
                key: "2",
                children: <KYC data={kycList} onSuccess={fetchKycList} />,
              },
              {
                label: intl.$t({ id: "SETTING_TAB_3" }),
                key: "3",
                children: <Security />,
              },
            ]}
            onChange={(key) => setActiveTab(key)}
          />
          {loading && <Loading />}
        </div>
      ) : loading ? (
        <div className={styles.loading}>
          <Loading />
        </div>
      ) : (
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: intl.$t({ id: "SETTING_TAB_1" }),
              key: "1",
              children: <PersonalInfo data={data} email={email} />,
            },
            {
              label: intl.$t({ id: "SETTING_TAB_2" }),
              key: "2",
              children: <KYC data={kycList} onSuccess={fetchKycList} />,
            },
            {
              label: intl.$t({ id: "SETTING_TAB_3" }),
              key: "3",
              children: <Security />,
            },
          ]}
        />
      )}
    </div>
  );
};

export default Index;
