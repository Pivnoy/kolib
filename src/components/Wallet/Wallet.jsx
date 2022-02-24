import {
  connectWallet,
  getActiveAccount,
  disconnectWallet,
  getBalanceXtz,
  wallet
} from "../../utils/wallet";
import { React, useEffect, useState } from "react";
import {
  Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput,
  Select, SelectChangeEvent
} from "@mui/material";
import { getBalanceKolibri } from '../../utils/kolibri';
import Transaction from '../Transaction/Transaction';
import { changeTESTNET } from "../../utils/values";

function Wallet() {

  const [walletInfo, setWalletInfo] = useState(null);
  const [xtzBalance, setXtzBalance] = useState(null);
  const [TESTNET, setTESTNET] = useState(true);
  const [kolibriBalance, setKolibriBalance] = useState(null);

  const handleChangeTESTNET = (e) => {
    changeTESTNET(e.target.value);
    setTESTNET(e.target.value);
    console.log(e.target.value);
  }

  const handleConnectWallet = async () => {
    const { wallet: walletAddress } = await connectWallet();
    setWalletInfo(walletAddress);
    setXtzBalance(await getBalanceXtz());
    setKolibriBalance(await getBalanceKolibri());
  };

  const handleDisconnectWallet = async () => {
    const { wallet: walletAddress } = await disconnectWallet();
    setWalletInfo(walletAddress);
    setXtzBalance(null);
    setKolibriBalance(null);
  };

  useEffect(() => {
    const func = async () => {

      const account = await getActiveAccount();

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

  }, []);


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
        <InputAdornment position="start">
          <Select
            variant="standard"
            onChange={handleChangeTESTNET}
            value={TESTNET}
          >
            <MenuItem value={false}>
              MAINNET
            </MenuItem>
            <MenuItem value={true}>
              TESTNET
            </MenuItem>
          </Select>
        </InputAdornment>
      </nav>
      <Transaction />
    </>
  );

}

export default Wallet;