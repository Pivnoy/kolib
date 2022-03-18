
import { createTezosKit, wallet } from "../../utils/wallet_api/wallet";
import { createOvens, harbringerClient, stableCoinClient } from '../../utils/kolibri_api/kolibri';
import { React, useEffect, useState } from "react";
import { getOvenDescription } from "../../utils/kolibri_api/ovens";
import { ovenButtons } from "../../utils/kolibri_api/oven_buttons";
import { Button, ButtonGroup } from "@mui/material";
import OvensInteractions from "./OvensInteractions";

//delete later

let xtzBalance = 12345;
let kolibriBalance =54321;

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
                        className="bg-transparent text-white">
                        Still loading . . .
                    </div>
                );
            }
            else {
                // already loaded, with full oven info in it
                let bg_color = '';
                // eslint-disable-next-line eqeqeq
                if (i == chosenOven) {
                    bg_color = 'bg-red-500'
                } else {
                    bg_color = 'bg-white'
                }
                showedOvens.push(
                    <button
                        value={i}
                        onClick={handleOvenClick}
                        className={bg_color}>
                        {ownedOvens[i].address}
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
                console.log(ownedOvens);
            };

            console.log('done');
        }
        fl();
    }, [TESTNET, reget.regetBalance, wal]);


    return (
        <div className="flex justify-center">
            <div className="h-fit bg-transparent flex items-center justify-center">
                <div className="insert-0 top-10 m-10 h-fit w-fit bg-dark-grey p-8 shadow-lg rounded-lg">
                    {/* nav for ovens  */}

                    <div className="h-fit mx-w-5xl flex items-center justify-center">
                        <div
                            className="text-white">
                            <ButtonGroup
                                variant="text"
                                aria-label="text button group"
                            >
                                <Button
                                    value={ovenButtons.borrow}
                                    onClick={handleOvenButtonClick}>
                                   
                                    Borrow
                                </Button>
                                <Button
                                    value={ovenButtons.payback}
                                    onClick={handleOvenButtonClick}>
                                    Payback
                                </Button>
                                <Button
                                    value={ovenButtons.withdraw}
                                    onClick={handleOvenButtonClick}>
                                    Withdraw
                                </Button>
                                <Button
                                    value={ovenButtons.deposit}
                                    onClick={handleOvenButtonClick}>
                                    Deposit
                                </Button>
                            </ButtonGroup>
                            
                        </div>
                        {/* balance */}
                        <div>
                            <div className="ml-10 text-white font-light space-y-1">
                                <div style={{background: 'linear-gradient(to right, transparent 50%, rgba(37, 137, 145, 20%) 50%)'}} className="justify-between rounded-lg flex p-3 h-auto w-80 border-solid border-2 border-grey">
                                        <div>Tezos Holdings</div> 
                                        <div className="">{xtzBalance} XTZ</div>
                                </div>
                                <div className=""></div>
                                    <div style={{background: 'linear-gradient(to right, transparent 50%, rgba(37, 137, 145, 20%) 50%)'}} className="justify-between flex p-3 h-auto w-auto border-solid border-2 border-grey rounded-lg">
                                    <   div>kUSD Holdings</div> 
                                    <div className="">{kolibriBalance} kUSD</div>
                                </div>
                            </div>
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
                        </div>
                    </div>
                </div>
                </div>
                <div className="h-fit bg-transparent flex items-center justify-center">
                    <div className="insert-0 top-10 m-10 h-fit w-fit border-green bg-dark-grey p-8 shadow-lg rounded-lg">
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