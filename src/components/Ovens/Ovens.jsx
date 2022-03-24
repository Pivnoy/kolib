
import { createTezosKit, wallet } from "../../utils/wallet_api/wallet";
import { createOvens, harbringerClient, stableCoinClient } from '../../utils/kolibri_api/kolibri';
import { React, useEffect, useState } from "react";
import { getOvenDescription } from "../../utils/kolibri_api/ovens";
import { ovenButtons } from "../../utils/kolibri_api/oven_buttons";
import OvensInteractions from "./OvensInteractions";
import BigNumber from 'bignumber.js'


function Ovens(props) {


    const [ownedOvens, setOwnedOvens] = useState([]);

    const { TESTNET, reget, connect, wal, balance } = props;

    const [ovensAdr, setOvensAdr] = useState([]);

    const [chosenOven, setChosenOven] = useState(0);

    const [chosenButton, setChosenButton] = useState(ovenButtons.borrow);

    const [xtzPrise, setXtzPrise] = useState(null);

    const handleOvenClick = (e) => {
        console.log("yep, clicked");
        console.log(e.target);
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
                let ClassNameForOvenCode = '';
                // eslint-disable-next-line eqeqeq
                if (i == chosenOven) {
                    styleForOvens = 'border-solid border-2 border-green bg-transparent';
                    ClassNameForOvenCode = 'pl-2 m-2 w-28 text-green rounded-lg p-2 font-medium'
                    styleForOvenCode = { background: "rgba(37, 137, 145, 25%)" };
                } else {
                    styleForOvens = 'border-solid border-2 border-grey bg-transparent';
                    styleForOvenCode = { background: "rgba(83, 103, 132, 25%)" };
                    ClassNameForOvenCode = 'w-28 text-light-grey rounded-lg p-2 m-2 font-medium'
                }

                styleForOvens += ' text-white px-5 mt-4 font-light items-center justify-between h-32 w-12/12 shadow-lg rounded-lg'

                let styleForCurrency = 'text-white text-lg'

                showedOvens.push(
                    <div
                        className={styleForOvens}
                    >
                        <div
                            value={i}
                            className="flex items-center">

                            <button
                                value={i}
                                onClick={handleOvenClick}
                                className={ClassNameForOvenCode}
                                style={styleForOvenCode}
                            >
                                {ownedOvens[i].address.slice(0, 4) + '...' +
                                    ownedOvens[i].address.slice(ownedOvens[i].address.length - 4)
                                }

                            </button>
                            <div className="w-full bg-grey rounded-full h-2.5">
                                <div className="bg-gradient-to-r from-light-blue via-turquouse to-emerald h-2.5 rounded-full"
                                    style={{ width: ownedOvens[i].ratio.toString() + "%" }} />
                            </div>
                        </div>

                        <div className="space-x-2 text-xs flex text-light-grey">
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


    useEffect(() => {
        const fl = async () => {

            if (!stableCoinClient) {
                await createTezosKit();
                createOvens();
            }

            const { price } = await harbringerClient.getPriceData();

            setXtzPrise(price);

            const ovensAddresses = await stableCoinClient.ovensOwnedByAddress(await wallet.getPKH());

            setOvensAdr(ovensAddresses);

            for (let address of ovensAddresses) {

                //loading oven info in worker thread
                const oven = await getOvenDescription(address);

                console.log(oven);

                setOwnedOvens(arr => [...arr, oven]);

            };

            // rendered all ovens
            console.log('done');
        }
        fl();
    }, [TESTNET, reget.regetBalance]);

    const buttonStyle = "p-2 text-grey hover:text-white active:text-white";

    const chosenButtonStyle = "p-2 text-white hover:text-white active:text-white";

    return (
        <div className="flex justify-center space-x-10">
            <div className=" bg-transparent h-fit flex items-start">
                <div className="relative h-fit w-fit bg-dark-grey p-8 shadow-lg rounded-lg">

                    {/* nav for ovens  */}

                    <div className="items-center justify-between">
                        <div>

                            <button
                                className={chosenButton === ovenButtons.borrow ?
                                    chosenButtonStyle : buttonStyle}
                                value={ovenButtons.borrow}
                                onClick={handleOvenButtonClick}>
                                Borrow kUSD
                            </button>

                            <button
                                className={chosenButton === ovenButtons.payback ?
                                    chosenButtonStyle : buttonStyle}
                                value={ovenButtons.payback}
                                onClick={handleOvenButtonClick}>
                                Payback kUSD
                            </button>

                            <button
                                className={chosenButton === ovenButtons.withdraw ?
                                    chosenButtonStyle : buttonStyle}
                                value={ovenButtons.withdraw}
                                onClick={handleOvenButtonClick}>
                                Withdraw XTZ
                            </button>

                            <button
                                className={chosenButton === ovenButtons.deposit ?
                                    chosenButtonStyle : buttonStyle}
                                value={ovenButtons.deposit}
                                onClick={handleOvenButtonClick}>
                                Deposit XTZ
                            </button>

                            <button 
                                className="ml-24 bg-gradient-to-r from-light-blue via-turquouse to-emerald text-white p-2 h-auto w-auto rounded-lg"> 
                                Create new oven
                            </button>

                        </div>


                        {/* balance */}

                        <div className="flex mt-6 pr-80 pb-20">
                            <div className="text-white font-light">
                                <OvensInteractions
                                    oven={ownedOvens[chosenOven]}
                                    btn={chosenButton}
                                    price={xtzPrise}
                                    reget={reget}
                                    connect={connect}
                                    wal={wal}
                                    balance={balance}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                {renderOwnedOvens()}
            </div>
        </div>
    )
}

export default Ovens;