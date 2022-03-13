
import { createTezosKit, wallet } from "../../utils/wallet_api/wallet";
import { createOvenClient, createOvens, harbringerClient, stableCoinClient } from '../../utils/kolibri_api/kolibri';
import { React, useEffect, useState } from "react";
import { getOvenDescription } from "../../utils/kolibri_api/ovens";
import { ovenButtons } from "../../utils/kolibri_api/oven_buttons";
import { Button, ButtonGroup } from "@mui/material";
import OvensInteractions from "./OvensInteractions";
import { MUTEZ_TO_SHARD } from "../../utils/values";


function Ovens() {

    const [ownedOvens, setOwnedOvens] = useState([]);

    const [ovensAdr, setOvensAdr] = useState([]);

    const [chosenOven, setChosenOven] = useState(0);

    const [chosenButton, setChosenButton] = useState(ovenButtons.borrow);

    const [xtzPrise, setXtzPrise] = useState(null);


    const borrowFromOven = async (e) => {
        const ovenClient = createOvenClient(e.target.value);
        await (await ovenClient.borrow(1)).confirmation();
        console.log('borrowed');
    }

    const getOvenRatio = async (ovenAddress) => {
        const ovenClient = createOvenClient(ovenAddress);

        let ratio = await ovenClient.getCollateralUtilization();

        let ovenRatio = null;

        if (ratio.isNaN()) {
            ovenRatio = 0;
        }
        else {
            ovenRatio = (ratio * 10).toFixed(2);
        }
        return (
            <span>
                {ovenRatio}
            </span>
        )
    }

    const handleOvenClick = (e) => {
        console.log(e.target.value);
        console.log('asd');
        setChosenOven(e.target.value);
    }

    const handleOvenButtonClick = (e) => {
        console.log(e.target.value);
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
                        className="bg-white text-blue-500">
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

            let { price }  = await harbringerClient.getPriceData();

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
    }, []);


    return (
        <div>
            <div
                className="absolute insert-0 right-0">
                {renderOwnedOvens()}
            </div>
            <div
                className="text-white">
                <ButtonGroup
                    variant="text"
                    aria-label="text button group"
                >
                    <Button
                        value={ovenButtons.deposit}
                        onClick={handleOvenButtonClick}>
                        Deposit
                    </Button>
                    <Button
                        value={ovenButtons.withdraw}
                        onClick={handleOvenButtonClick}>
                        Withdraw
                    </Button>
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
                </ButtonGroup>
                <OvensInteractions
                    oven={ownedOvens[chosenOven]} 
                    btn={chosenButton}
                    price={xtzPrise}/>
            </div>
        </div>
    )
}

export default Ovens;