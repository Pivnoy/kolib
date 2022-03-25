import {
  connectWallet,
  getActiveAccount,
  disconnectWallet,
  getBalanceXtz,
  createTezosKit
} from "../../utils/wallet_api/wallet";

import { React, useEffect, useState } from "react";
import Ovens from '../Ovens/Ovens';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Footer from "../Footer/Footer";
import { createOvens, getBalanceKolibri } from '../../utils/kolibri_api/kolibri';
import Transaction from '../Transaction/Transaction';
import { changeTESTNET, TESTNET as t1 } from "../../utils/values";
import { Disclosure, } from '@headlessui/react';
import LiquidityPool from "../LiquidityPool/LiquidityPool";
import Mail from "../Mail/Mail";

function MainPage() {

  const navigation = [
    { name: 'Swap', href: '/', current: true },
    { name: "Ovens", href: '/ovens', current: false },
    { name: "Liquidity Pool", href: '/liquidity-pool', current: false },
    { name: "Rate notifications", href: '/mail', current: false },
    { name: "Saving Rate", href: '#', current: false },
    { name: "Farming", href: '#', current: false },
    { name: "Governance", href: '#', current: false }]


  const [walletInfo, setWalletInfo] = useState(null);
  const [xtzBalance, setXtzBalance] = useState(null);
  const [TESTNET, setTESTNET] = useState(t1);
  const [kolibriBalance, setKolibriBalance] = useState(null);
  const [regetbalance, setRegetbalance] = useState(false);
  const [chosenNavBar, setChosenNavBar] = useState(0);

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

  const handleHavBarClick = (i) => {
    console.log(i);
    setChosenNavBar(i);
  }

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

  useEffect(() => {
    const loc = window.location.pathname;
    navigation.forEach((it,i) => {
      if (loc === it.href) {
        setChosenNavBar(i);
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (

    <div>

      {/* content here */}
      <BrowserRouter>


        {/* NavBar and kolibri logo */}

        <Disclosure as="nav" className="bg-transparent relative font-light">
          {({ open }) => (
            <>
              <div className="h-36 px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-center">
                  <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div>
                      <Link
                        to="/"
                        onClick={() => {handleHavBarClick(0)}}
                      >
                      <img
                        className="h-24 w-fit mt-4 mr-5"
                        src="./Logo.png"
                        alt="Kolibri logo"
                      />
                      </Link>
                    </div>
                    <div className="hidden sm:block sm:ml-6">
                      <div className="flex space-x-3 content-center items-center self-center">
                        {navigation.map((item, i) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => { handleHavBarClick(i) }}
                            // eslint-disable-next-line eqeqeq
                            className={(chosenNavBar == i ?
                              'text-white' :
                              'text-light-grey hover:text-white') +
                              ' mt-12 px-3 py-2 font-light'}
                             style ={chosenNavBar == i ? {border: "none", borderBottom: "2px solid #258991", outline: "0" } : {}}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>




                    {/* wallet and connection button */}
                    <div className="ml-10 font-light flex w-fit items-center pr-2">
                      <div className="bg-gradient-to-r from-light-blue via-turquouse to-emerald text-white p-2 mt-6 h-auto w-auto rounded-lg">

                        <button
                          type="button"
                          className="disabled:bg-light-grey"
                          onClick={walletInfo ? handleDisconnectWallet : handleConnectWallet}
                        >
                          <span className="sr-only">Connect wallet</span>

                          {walletInfo
                            ? walletInfo.address.slice(0, 4) +
                            "..." +
                            walletInfo.address.slice(walletInfo.address.length - 4, walletInfo.address.length)
                            : "Connect Wallet"}


                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


            </>
          )}
        </Disclosure>

        <Routes>

          <Route
            path='/'
            element={
              <Transaction
                TESTNET={TESTNET}
                balance={{ xtzBalance: xtzBalance, kolibriBalance: kolibriBalance }}
                reget={{ regetbalance: regetbalance, setRegetbalance: setRegetbalance }}
                connect={handleConnectWallet}
                wal={walletInfo}
              />
            }
          />

          <Route
            path='/ovens'
            element={
              <Ovens
                TESTNET={TESTNET}
                balance={{ xtzBalance: xtzBalance, kolibriBalance: kolibriBalance }}
                reget={{ regetbalance: regetbalance, setRegetbalance: setRegetbalance }}
                connect={handleConnectWallet}
                wal={walletInfo}
              />}
          />

          <Route
            path='/liquidity-pool'
            element={
              <LiquidityPool
                balance={{ xtzBalance: xtzBalance, kolibriBalance: kolibriBalance }}
              />}
          />

          <Route
            path="/mail"
            element={
              <Mail/>
            }
          />
        </Routes>
      </BrowserRouter>


      <Footer 
        TESTNET={TESTNET}
        handleChangeTESTNET={handleChangeTESTNET}
      />

    </div>

  )


}

export default MainPage;