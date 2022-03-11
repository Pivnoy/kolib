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
  Select
} from "@mui/material";
import Ovens from '../Ovens/Ovens';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Footer from "../Footer/Footer";
import { createOvens, getBalanceKolibri } from '../../utils/kolibri';
import Transaction from '../Transaction/Transaction';
import { changeTESTNET, TESTNET as t1 } from "../../utils/values";
import { Disclosure, } from '@headlessui/react';
import { CreditCardIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import LiquidityPool from "../LiquidityPool/LiquidityPool";

function Wallet() {

  const navigation = [
    { name: 'Home', href: '/', current: true },
    { name: "All Ovens", href: '#', current: false },
    { name: "Docs", href: '#', current: false },
    { name: "Liquidity Pool", href: '/liq', current: false },
    { name: "Saving Rate", href: '#', current: false },
    { name: "Farming", href: '#', current: false },
    { name: "Governance", href: '#', current: false }]


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

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


  return (

    <div>



      {/* NavBar and kolibri logo */}

      <Disclosure as="nav" className="relative bg-transparent">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src="https://kolibri.finance/img/kolibri-brand.b0cd3374.png"
                      alt="Kolibri"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src="https://kolibri.finance/img/kolibri-brand.b0cd3374.png"
                      alt="Kolibri"
                    />
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            item.current ? 'bg-dark-blue text-white' : 'text-gray-300 hover:bg-blue-700 hover:text-white',
                            'px-3 py-2 rounded-md text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>






                {/* wallet and connection button */}
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="m-3 text-white p-1 h-auto w-auto border-solid border-2 border-white rounded-full">

                    {walletInfo
                      ? walletInfo.address.slice(0, 4) +
                      "..." +
                      walletInfo.address.slice(walletInfo.address.length - 4, walletInfo.address.length)
                      : "Connect"}

                  </div>
                  <button
                    type="button"
                    className="mr-3 bg-white p-1 rounded-full text-blue-700 hover:text-white hover:bg-blue-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    onClick={walletInfo ? handleDisconnectWallet : handleConnectWallet}
                  >
                    <span className="sr-only">Connect wallet</span>
                    <CreditCardIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

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



              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? 'bg-white text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block px-3 py-2 rounded-md text-base font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>


          </>
        )}
      </Disclosure>





      {/* balance windows */}

      <div className="m-7 text-white relative flex items-center justify-center h-16">
        <div className="p-3 h-auto w-auto border-solid border-2 border-white rounded-lg">
          {xtzBalance ? "User xtz balance: " + xtzBalance : "No account connected (xtz)"}
        </div>
        <div className="m-10"></div>
        <div className="p-3 h-auto w-auto border-solid border-2 border-white rounded-lg">
          {kolibriBalance != null ? "User kUSD balance: " + kolibriBalance : " No account connected (kUSD)"}
        </div>
      </div>


      {/* content here */}
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

          <Route
            path='/liq'
            element={<LiquidityPool />}
          />
        </Routes>
      </BrowserRouter>


      {/* footer place here */}
      <Footer />
      

    </div>

  )


}

export default Wallet;