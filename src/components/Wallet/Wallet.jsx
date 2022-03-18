import {
  connectWallet,
  getActiveAccount,
  disconnectWallet,
  getBalanceXtz,
  createTezosKit
} from "../../utils/wallet_api/wallet";

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
  Link,
} from "react-router-dom";
import Footer from "../Footer/Footer";
import { createOvens, getBalanceKolibri } from '../../utils/kolibri_api/kolibri';
import Transaction from '../Transaction/Transaction';
import { changeTESTNET, TESTNET as t1 } from "../../utils/values";
import { Disclosure, } from '@headlessui/react';
import { CreditCardIcon, MenuIcon, XIcon, PlusCircleIcon } from '@heroicons/react/outline'
import LiquidityPool from "../LiquidityPool/LiquidityPool";

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

      {/* content here */}
      <BrowserRouter>


      {/* NavBar and kolibri logo */}

      <Disclosure as="nav" className="bg-transparent  relative font-light">
        {({ open }) => (
          <>
            <div className="h-40  px-2 sm:px-6 lg:px-8">
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
                    {/* <img
                      className="block lg:hidden h-8 w-auto"
                      src="./Logo.png"
                      alt="Kolibri logo"
                    /> */}
                    <img
                      className="h-24 w-fit mt-4" 
                      src="./Logo.png"
                      alt="Kolibri logo"
                    />
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-3 content-center items-center self-center">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current ? 'underline underline-offset-6' : 'text-light-grey hover:text-white',
                            'mt-3 px-3 py-8 font-light text-white'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>






                {/* wallet and connection button */}
                <div className="font-light flex w-fit items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <div className="bg-gradient-to-r from-light-blue via-turquouse to-emerald text-white p-2 h-auto w-auto rounded-lg">
                  
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
                      : "Connect Wallet" }
                      {/* delete or not delete plus icon? */}
                      {/* <PlusCircleIcon className="h-6 w-6"/> */}

                  
                    
                  </button>
                  </div>
                </div>


                  {/* <InputAdornment
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
                  </InputAdornment> */}



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
                        item.current ? 'bg-white text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'block px-3 py-2 rounded-md text-base font-light'
                      )}
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




      {/* <div className="m-7 text-white relative flex items-center justify-center h-16">
        <div className="p-3 h-auto w-auto border-solid border-2 border-white rounded-lg">
          {xtzBalance ? "User xtz balance: " + xtzBalance : "No account connected (xtz)"}
        </div>
        <div className="m-10"></div>
        <div className="p-3 h-auto w-auto border-solid border-2 border-white rounded-lg">
          {kolibriBalance != null ? "User kUSD balance: " + kolibriBalance : " No account connected (kUSD)"}
        </div>
      </div> */}




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
            element={
              <Ovens
                TESTNET={TESTNET}
                reget={{ regetbalance: regetbalance, setRegetbalance: setRegetbalance }}
                connect={handleConnectWallet}
                wal={walletInfo}
              />}
          />

          <Route
            path='/liquidity-pool'
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