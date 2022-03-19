
import { createTezosKit, wallet } from "../../utils/wallet_api/wallet";
import { createOvens, harbringerClient, stableCoinClient } from '../../utils/kolibri_api/kolibri';
import { React, useEffect, useState } from "react";
import { getOvenDescription } from "../../utils/kolibri_api/ovens";
import { ovenButtons } from "../../utils/kolibri_api/oven_buttons";
import { Button, ButtonGroup } from "@mui/material";
import OvensInteractions from "./OvensInteractions";
import {Disclosure} from '@headlessui/react';
import BigNumber from 'bignumber.js'
import { width } from "@mui/system";


//delete later

let xtzBalance = 12345;
let kolibriBalance = 54321;


function Ovens(props) {


    const [ownedOvens, setOwnedOvens] = useState([]);

    const { TESTNET, reget, connect, wal } = props;

    const [ovensAdr, setOvensAdr] = useState([]);

    const [chosenOven, setChosenOven] = useState(0);

    const [chosenButton, setChosenButton] = useState(ovenButtons.borrow);
    
    const [xtzPrise, setXtzPrise] = useState(null);

    const handleOvenClick = (e) => {
        setChosenOven(e.target.value);
    }

    const handleOvenButtonClick = (e) => {
        setChosenButton(e.target.value);
    }

    const renderOwnedOvens = () => {

        console.log('started render');

        const showedOvens = [];

        for (let i = 0; i < ovensAdr.length; i++) {
            if (ownedOvens[i] == null) {
                // this element is still loading
                // set animation playing here
                showedOvens.push(
                    <div
                        className="px-40 mt-4 font-light flex items-center justify-center h-32 w-12/12 shadow-lg border-solid border-2 border-light-grey rounded-lg bg-transparent text-white">
                        Still loading . . .
                    </div>
                );
            }
            else {
                // already loaded, with full oven info in it
                let styleForOvens = '';
                let styleForOvenCode = {};
                let ClassNameForOvenCode= '';
                // eslint-disable-next-line eqeqeq
                if (i == chosenOven) {
                    styleForOvens= 'border-solid border-2 border-green bg-transparent';
                    ClassNameForOvenCode='pl-2 m-2 w-28 text-green rounded-lg p-2 font-medium'
                    styleForOvenCode={background: "rgba(37, 137, 145, 25%)"};
                } else {
                    styleForOvens ='border-solid border-2 border-transparent bg-transparent';
                    styleForOvenCode = {background: "rgba(83, 103, 132, 25%)"};
                    ClassNameForOvenCode= 'w-28 text-light-grey rounded-lg p-2 m-2 font-medium'
                }

                styleForOvens+=' text-white px-5 mt-4 font-light items-center justify-between h-32 w-12/12 shadow-lg rounded-lg'
                let styleForCurrency ='text-white text-lg'
                showedOvens.push(
                    <button
                        value={i}
                        onClick={handleOvenClick}
                        className={styleForOvens}>
                        <div className="">
                            <div className="flex items-center">
                                <div className={ClassNameForOvenCode} style={styleForOvenCode}>
                                {ownedOvens[i].address.slice(0, 4) + '...' +
                                    ownedOvens[i].address.slice(ownedOvens[i].address.length - 4)
                                }
                                
                                </div>
                                <div className="w-full bg-grey rounded-full h-2.5">
                                    <div className="bg-gradient-to-r from-light-blue via-turquouse to-emerald h-2.5 rounded-full" style={{width: "30%"}} ></div>
                                    {/* {ownedOvens[i].ratio} */}
                                </div>
                            </div>
                            <div className="text-xs flex text-light-grey">
                                <div className="px-2 flex-none">
                                    Collateral value 
                                    <div className={styleForCurrency}>
                                        {(new BigNumber(ownedOvens[i].balance * xtzPrise)).dividedBy(1_000_000).toFixed(2)} USD
                                    </div>
                                </div>
                                <div className="px-2 flex-none">
                                Balance 
                                    <div className={styleForCurrency}>
                                        {ownedOvens[i].balance} XTZ
                                    </div>
                                </div>
                                <div className="px-2 flex-none">
                                Loan amt
                                    <div className={styleForCurrency}> 
                                        {ownedOvens[i].borrowed} kUSD
                                    </div>
                                </div>
                                <div className="px-2 flex-none">
                                Stability fee 
                                    <div className={styleForCurrency}> 
                                        {ownedOvens[i].fee}
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </button>
                )
            }
        }

        return showedOvens.map((ov, i) => (
            <div
                key={i}>
                {ov}
            </div>
        ))
    };



    const OvenButton = [
        {name: "Borrow kUSD", value: ovenButtons.borrow, onClick: handleOvenButtonClick },
        {name: "PayBack kUSD" },
        {name: "Withdraw XTZ" },
        {name: "Deposit XTZ" },
    ]
    



    useEffect(() => {
        const fl = async () => {

            if (!stableCoinClient) {
                await createTezosKit();
                createOvens();
            }

            let { price } = await harbringerClient.getPriceData();

            // price = price  * MUTEZ_TO_SHARD;

            setXtzPrise(price);

            let ovensAddresses = await stableCoinClient.ovensOwnedByAddress(await wallet.getPKH());

            setOvensAdr(ovensAddresses);

            for (let address of ovensAddresses) {
                let oven = await getOvenDescription(address);
                console.log(oven);
                setOwnedOvens(arr => [...arr, oven]);

            };

            console.log('done');
        }
        fl();
    }, [TESTNET, reget.regetBalance]);


    return (
        <div className="mx-w-full flex justify-center space-x-20">
            <div className=" inset-0 top-0 h-fit bg-transparent flex items-start">
                <div className=" h-fit w-fit bg-dark-grey p-8 shadow-lg rounded-lg">
                    {/* nav for ovens  */}


                    <div className="items-center justify-between"> 
                        <div
                            className="relative inset-0 top-0">
                            
                                <button 
                                className="p-2 text-grey hover:text-white active:text-white"
                                    value={ovenButtons.borrow}
                                    onClick={handleOvenButtonClick}>
                                    Borrow kUSD
                                </button>
                                
                                <button
                                className="p-2 text-grey hover:text-white active:text-white"
                                    value={ovenButtons.payback}
                                    onClick={handleOvenButtonClick}>
                                    Payback kUSD
                                </button>
                                <button
                                className="p-2 text-grey hover:text-white active:text-white"
                                    value={ovenButtons.withdraw}
                                    onClick={handleOvenButtonClick}>
                                    Withdraw XTZ
                                </button>
                                <button
                                className="p-2 text-grey hover:text-white active:text-white"
                                    value={ovenButtons.deposit}
                                    onClick={handleOvenButtonClick}>
                                    Deposit XTZ
                                </button>
                        </div>
                       




                        {/* balance */}
                        <div className="flex mt-4">
                            <div className="text-white font-light">
                                <OvensInteractions
                                    oven={ownedOvens[chosenOven]}
                                    btn={chosenButton}
                                    price={xtzPrise}
                                    reget={reget}
                                    connect={connect}
                                    wal={wal}
                                />
                            </div>
                            <div className="mb-12">
                                <div className="mt-6 ml-10 text-white font-light space-y-1">
                                    <div style={{ background: 'linear-gradient(to right, transparent 50%, rgba(37, 137, 145, 20%) 50%)' }} className="justify-between rounded-lg flex p-3 h-auto w-80 border-solid border-2 border-grey">
                                        <div>Tezos Holdings</div>
                                        <div className="">{xtzBalance} XTZ</div>
                                    </div>
                                    <div className=""></div>
                                    <div style={{ background: 'linear-gradient(to right, transparent 50%, rgba(37, 137, 145, 20%) 50%)' }} className="justify-between flex p-3 h-auto w-auto border-solid border-2 border-grey rounded-lg">
                                        <   div>kUSD Holdings</div>
                                        <div className="">{kolibriBalance} kUSD</div>
                                    </div>
                                </div>
                                <div className="border-solid border-2 border-grey mt-3 ml-10 text-white font-light space-y-1 p-4 rounded-lg">
                                    <div className="w-full bg-black rounded-full h-2.5">
                                    <div className="bg-gradient-to-r from-light-blue via-turquouse to-emerald h-2.5 rounded-full" style={{width: "30%"}} ></div>
                                    {/* {ownedOvens[i].ratio} */}
                                    </div>
                                </div>
                                <div
                                    className="font-light ml-10 mt-3 text-white p-3 bg-transparent rounded-lg h-auto w-80 border-solid border-2 border-grey order-last">
                                    {/* {oven == null ? 'no oven?' : */}{
                                        <div className="">
                                            <div className="flex justify-between">
                                            Borrowed tokens <div>1234 XTZ</div> {/*{oven.borrowed}*/}
                                            </div>
                                            <div className="flex justify-between">
                                            Oven balance <div>4311 XTZ</div> {/*{oven.balance}*/}
                                            </div>
                                            <div className="flex justify-between">
                                            Current collateral utilization <div>18 %</div>{/*{oven.ratio}*/}
                                            </div>
                                            <div className="flex justify-between">
                                            New collateral utilization <div>12 %</div>{/*{ovenRatio}*/}
                                            </div>
                                        </div>
                                            }
                                        </div>
                            </div> 
                            
                        </div>
                    </div>
                </div>
            </div>
            <div className="">
                <div className="">
                    <div
                        className="">
                        {renderOwnedOvens()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Ovens;