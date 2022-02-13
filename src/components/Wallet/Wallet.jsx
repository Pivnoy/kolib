import './wallet.css';
import {
    connectWallet,
    getActiveAccount,
    disconnectWallet,
    getBalanceXtz,
    wallet
  } from "../../utils/wallet";
  import { React, useEffect, useState } from "react";
import { getBalanceKolibri } from '../../utils/kolibri';

function Wallet() {

  const [walletInfo, setWalletInfo] = useState(null);
  const [xtzBalance, setXtzBalance] = useState(null);
  const [kolibriBalance, setKolibriBalance] = useState(null);

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
        setWalletInfo(account);
        setXtzBalance(await getBalanceXtz());
        setKolibriBalance(await getBalanceKolibri());
      }
    };

    func();

  }, []);


  const btnStyle = {
    color: "gray",
    fontSize: 40,
    width: 200,
    height: 200
  }

  return (
    <nav className="bg-gray-800 h-14 flex items-center px-10 justify-between">
      <div>
        <button
          style={btnStyle}
          onClick={walletInfo ? handleDisconnectWallet : handleConnectWallet}
          className="bg-red-500 px-6 py-2 rounded-sm text-xs font-semibold text-white cursor-pointer"
        >
          💳{" "}
          {walletInfo
            ? walletInfo.address.slice(0, 4) +
              "..." +
              walletInfo.address.slice(walletInfo.address.length - 4, walletInfo.address.length)
            : "Connect"}
        </button>
        <div>
          { xtzBalance ? "User xtz balance: " + xtzBalance : "No account connected"}
        </div>
        <div>
          { kolibriBalance ? "User kUSD balance: " + kolibriBalance : "No account connected"}
        </div>
      </div>
    </nav>
  );

}

export default Wallet;