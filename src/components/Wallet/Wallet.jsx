import {
  connectWallet,
  getActiveAccount,
  disconnectWallet,
  getBalanceXtz,
  createTezosKit
} from "../../utils/wallet";
import { React, useEffect, useState } from "react";
import {
  InputAdornment, MenuItem,
  Select,
} from "@mui/material";
import Ovens from '../Ovens/Ovens';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { createOvens, getBalanceKolibri } from '../../utils/kolibri';
import Transaction from '../Transaction/Transaction';
import { changeTESTNET, TESTNET as t1 } from "../../utils/values";

function Wallet() {

  const [walletInfo, setWalletInfo] = useState(null);
  const [xtzBalance, setXtzBalance] = useState(null);
  const [TESTNET, setTESTNET] = useState(t1);
  const [kolibriBalance, setKolibriBalance] = useState(null);
  const [regetbalance, setRegetbalance] = useState(false);

  const handleChangeTESTNET = async (e) => {
    await handleDisconnectWallet();
    changeTESTNET(e.target.value);
    setTESTNET(e.target.value);
  }

  const handleConnectWallet = async () => {
    const { wallet: walletAddress } = await connectWallet();
    setWalletInfo(walletAddress);
    setXtzBalance(await getBalanceXtz());
    setKolibriBalance(await getBalanceKolibri());
  };

  const handleDisconnectWallet = async () => {
    await disconnectWallet();
    setWalletInfo(null);
    setXtzBalance(null);
    setKolibriBalance(null);
  };

  useEffect(() => {
    const func = async () => {

      const account = await getActiveAccount();

      await createTezosKit();

      createOvens();

      if (account) {
        try {
          setWalletInfo(account);
          setXtzBalance(await getBalanceXtz());
          setKolibriBalance(await getBalanceKolibri());
        }
        catch (e) {
          console.log("Use effect error: ", e);
        }
      }
    };

    func();

  }, [regetbalance, TESTNET]);


  return (
    <>
      <nav className="bg-gray-800 h-14 flex items-center px-10 justify-between">
        <div className="text-white">
          {xtzBalance ? "User xtz balance: " + xtzBalance : "No account connected"}
        </div>
        <div className="text-white">
          {kolibriBalance != null ? "User kUSD balance: " + kolibriBalance : "No account connected"}
        </div>
        <button
          onClick={walletInfo ? handleDisconnectWallet : handleConnectWallet}
          className="bg-red-500 px-6 py-2  rounded-sm text-xs font-semibold text-white cursor-pointer"
        >
          💳{" "}
          {walletInfo
            ? walletInfo.address.slice(0, 4) +
            "..." +
            walletInfo.address.slice(walletInfo.address.length - 4, walletInfo.address.length)
            : "Connect"}
        </button>
        <InputAdornment
          position="start">
          <Select
            variant="standard"
            style={{ color: "white" }}
            onChange={handleChangeTESTNET}
            value={TESTNET}
          >
            <MenuItem
              value={false}>
              MAINNET
            </MenuItem>
            <MenuItem
              value={true}>
              TESTNET
            </MenuItem>
          </Select>
        </InputAdornment>
      </nav>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Transaction
                TESTNET={TESTNET}
                reget={{ regetbalance: regetbalance, setRegetbalance: setRegetbalance }}
                connect={handleConnectWallet}
                wal={walletInfo}
              />
            }
          />
          <Route
            path='/ovens'
            element={<Ovens />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );

}

export default Wallet;