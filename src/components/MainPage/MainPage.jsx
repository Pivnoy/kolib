import {
  connectWallet,
  getActiveAccount,
  disconnectWallet,
  getBalanceXtz,
  createTezosKit
} from "../../utils/wallet_api/wallet";

import { React, useEffect, useState, Fragment } from "react";
import Ovens from '../Ovens/Ovens';
import { BrowserRouter, Routes, Route, Link, MemoryRouter } from "react-router-dom";
import Footer from "../Footer/Footer";
import { createOvens, getBalanceKolibri } from '../../utils/kolibri_api/kolibri';
import Transaction from '../Transaction/Transaction';
import { changeTESTNET, TESTNET as t1 } from "../../utils/values";
import { Disclosure, Menu, Transition } from '@headlessui/react';
import LiquidityPool from "../LiquidityPool/LiquidityPool";
import Mail from "../Mail/Mail";
import { RssIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

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
              <div className="max-w-screen h-36 px-2 sm:px-6 lg:px-8 bg-">
                <div className="relative flex items-center justify-center">
                <Disclosure.Button  className="sm:hidden absolute right-3 top-3 items-center justify-center p-2 rounded-md
                 text-light-grey hover:text-white focus:outline-none focus:ring-2 focus:ring-inset ">
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                        )}
                    </Disclosure.Button>
                  <div className="flex items-center justify-center sm:items-stretch sm:justify-start">

                    <div>
                      <Link
                        to="/"
                        onClick={() => {handleHavBarClick(0)}}
                      >
                      <img
                        className="hidden sm:flex h-24 w-fit mt-4 mr-5"
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
                            className={(chosenNavBar == i ?
                              'text-green dark:text-white' :
                              'text-light-grey hover:text-green dark:hover:text-white') +
                              ' mt-12 px-3 py-2 font-light'}
                             style ={chosenNavBar === i ? {border: "none", borderBottom: "2px solid #258991", outline: "0" } : {}}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                    {/* mobile icon */}

                    <div>
                    <img
                        className="sm:hidden absolute top-0 left-2 h-12 w-fit mt-3 mr-5"
                        src="./KolibriIcon.png"
                        alt="Kolibri logo"
                      />
                    </div>

                    {/* mobile changenet */}
                    <div className="sm:hidden absolute right-0">
                      <Menu as="div" className="relative">
                        <div>
                          <Menu.Button className="h-6 w-6 absolute right-16 top-5 text-light-grey">
                            <RssIcon/>

                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                          >
                          <Menu.Items className="origin-top-left rounded-lg absolute right-0 mt-2 mr-28 w-30 bg-black rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(active ? 'text-green' : '', 'block px-4 py-2 text-sm text-light-grey')}
                                >
                                  Mainnet
                                </a>
                              )}
                              </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <a
                                  href="#"
                                  className={classNames(active ? 'text-green' : '', 'block px-4 py-2 text-sm text-light-grey')}
                                >
                                  Testnet
                                </a>
                              )}
                            </Menu.Item>
                      </Menu.Items>


                          </Transition>

                          
                      </Menu>

                    </div>
                    {/* mobile menu */}
                    <div>
                      <Disclosure.Panel className="sm:hidden ">
                      <div className="px-2 pt-2 pb-3 space-y-1">
                        {navigation.map((item, i) => (
                          <Disclosure.Button
                            key={item.name}
                            to={item.href}
                            className={classNames(
                                item.current ? 'text-green' : 'text-light-grey',
                                'block px-3 py-2 font-light'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                          </Disclosure.Button>
                        ))}
                        </div>
                      </Disclosure.Panel>
                    </div>




                    {/* wallet and connection button */}
                    <div className="hidden sm:flex ml-10 font-light flex w-fit items-center pr-2">
                      <div className="text-green border-green border-2 dark:bg-gradient-to-r from-light-blue via-turquouse to-emerald dark:text-white p-2 mt-6 h-auto w-auto rounded-lg">

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
                    <button 
                    id="theme-toggle" 
                    type="button" 
                    class="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5">
                      <svg id="theme-toggle-dark-icon" 
                      class="hidden w-10 h-10 mt-6" 
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                      </svg>
                      <svg id="theme-toggle-light-icon" 
                      class="hidden w-10 h-10 mt-6" 
                      fill="currentColor" 
                      viewBox="0 0 20 20" 
                      xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fill-rule="evenodd" clip-rule="evenodd">
                          </path></svg>
                  </button>
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