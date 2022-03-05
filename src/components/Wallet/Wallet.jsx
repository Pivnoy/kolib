import {
  connectWallet,
  getActiveAccount,
  disconnectWallet,
  getBalanceXtz,
  wallet,
  createTezosKit
} from "../../utils/wallet";

import { React, useEffect, useState, Fragment } from "react";
import {Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput,
  Popover,Select, SelectChangeEvent} from "@mui/material"; 
import { createOvens, getBalanceKolibri } from '../../utils/kolibri';
import Transaction from '../Transaction/Transaction';
import { changeTESTNET, TESTNET as t1 } from "../../utils/values";
import { Disclosure, Menu, Transition} from '@headlessui/react';
import { CreditCardIcon, DatabaseIcon, MenuIcon, XIcon } from '@heroicons/react/outline'

function Wallet() {
  const navigation = [
    {name: 'Home', href: '#', current: true},
    {name:"All Ovens", href: '#', current: false},
    {name:"Docs", href: '#', current: false},
    {name:"Liquidity Pool", href: '#', current: false},
    {name:"Saving Rate", href: '#', current: false},
    {name:"Farming", href: '#', current: false},
    {name:"Governance", href: '#', current: false}]

  const [walletInfo, setWalletInfo] = useState(null);
  const [xtzBalance, setXtzBalance] = useState(null);
  const [TESTNET, setTESTNET] = useState(t1);
  const [kolibriBalance, setKolibriBalance] = useState(null);

  const handleChangeTESTNET = async(e) => {
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

  }, []);
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  
  

  return(
    // navigation
    <div>
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
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="bg-white p-1 rounded-full text-blue-700 hover:text-white hover:bg-blue-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  onClick={walletInfo ? handleDisconnectWallet : handleConnectWallet}
                >
                  {" "}
                  {walletInfo
                    ? walletInfo.address.slice(0, 4) +
                    "..." +
                    walletInfo.address.slice(walletInfo.address.length - 4, walletInfo.address.length)
                    : ""}
                  <span className="sr-only">Connect wallet</span>
                  <CreditCardIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className="bg-white p-1 rounded-full text-blue-700 hover:text-white hover:bg-blue-700  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Change net</span>
                      <DatabaseIcon
                        className="h-6 w-6 rounded-full"
                        alt=""
                      />
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
                    <Menu.Items 
                      variant="standard"
                      onChange={handleChangeTESTNET}
                      value={TESTNET} 
                      className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item value={false}>
                        {({ active }) => (
                          <a
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            MAINNET
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item value={true}>
                        {({ active }) => (
                          <a
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            TESTNET
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
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
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
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
    
    <div className="text-white relative flex items-center justify-between h-16 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 ">
      <div className="absolute inset-y-0 left-0">
          {xtzBalance ? "User xtz balance: " + xtzBalance : "No account connected (xtz)"} 
          <div className="">
          {kolibriBalance != null ? "User kUSD balance: " + kolibriBalance : " No account connected (kUSD)"}
          </div> 
        </div>

    {/*footer */}
    <footer className="absolute inset-x-0 bottom-0  p-4 bg-transparent rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-800">
            
            <div className="sm:flex sm:items-center sm:justify-between">
                <a href="#" class="flex items-center mb-4 sm:mb-0">
                    <img src="https://kolibri.finance/img/kolibri-brand.b0cd3374.png" class="mr-3 h-8" alt="Kolibri Logo" />
                </a>
                <ul class="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6 ">About</a>
                    </li>
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" class="mr-4 hover:underline md:mr-6 ">Licensing</a>
                    </li>
                    <li>
                        <a href="#" class="hover:underline">Contact</a>
                    </li>
                </ul>
            </div>
            <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
            <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2022 <a href="#" class="hover:underline">Kolibri™</a>. All Rights Reserved.
            </span>
           
        </footer>
      </div>
  )

 }
    
export default Wallet;