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

function Wallet() {

  const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: "All Ovens", href: '/ovens', current: false },
    { name: "Docs", href: '#', current: false },
    { name: "Liquidity Pool", href: '/liquidity-pool', current: false },
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

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


  return (

    <div>

      {/* content here */}
      <BrowserRouter>


        {/* NavBar and kolibri logo */}

        <Disclosure as="nav" className="bg-transparent  relative font-light">
          {({ open }) => (
            <>
              <div className="h-36 px-2 sm:px-6 lg:px-8">
                <div className="relative flex items-center justify-center">
                  {/* <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"> */}
                  {/* Mobile menu button*/}
                  {/* <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div> */}
                  <div className="flex items-center justify-center sm:items-stretch sm:justify-start">
                    <div>
                      <img
                        className="h-24 w-fit mt-4 mr-5"
                        src="./Logo.png"
                        alt="Kolibri logo"
                      />
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
                          {/* delete or not delete plus icon? */}
                          {/* <PlusCircleIcon className="h-6 w-6"/> */}



                        </button>
                      </div>
                    </div>

                  </div>
                </div>


                <Disclosure.Panel className="sm:hidden">
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="Link"
                        to={item.href}
                        className={classNames(
                          item.current ? 'bg-white text-white' : 'text-gray-300 hover:text-white',
                          'block px-3 py-2 rounded-md text-base font-light'
                        )}
                        style ={item.current ? {border: "none", borderBottom: "2px solid #FFFFFF", outline: "0" } : {}}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </Disclosure.Panel>

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


      {/* footer place here */}
      <Footer 
        TESTNET={TESTNET}
        handleChangeTESTNET={handleChangeTESTNET}
      />

    </div>

  )


}

export default Wallet;