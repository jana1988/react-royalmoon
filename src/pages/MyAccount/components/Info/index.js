import { useEffect, useState } from "react";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import { getWalletsById, getPlayerInfo } from "@/services/myAccount";
import { isMobile } from "@/utils";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/store/reducer/authSlice";

export default () => {
  const [wallets, setWallets] = useState({});
  const [playerInfo, setPlayerInfo] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    fetchWallets();
    fetchPlayerInfo();
  }, []);

  async function fetchWallets() {
    const data = await getWalletsById(0);
    setWallets(data);
    return data;
  }
  async function fetchPlayerInfo() {
    const data = await getPlayerInfo();
    setPlayerInfo(data);
    dispatch(setUserInfo(data));
    return data;
  }
  return isMobile() ? (
    <Mobile wallets={wallets} playerInfo={playerInfo} />
  ) : (
    <Desktop wallets={wallets} playerInfo={playerInfo} />
  );
};
