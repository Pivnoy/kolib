
import { createTezosKit, wallet } from "../../utils/wallet";
import { createOvenClient, createOvens, stableCoinClient } from '../../utils/kolibri';
import { React, useEffect, useState } from "react";
import Popup from "reactjs-popup";
import { ConversionUtils } from "@hover-labs/kolibri-js";
import { getOvenDescription } from "../../utils/ovens";


function Ovens() {

    const [ownedOvens, setOwnedOvens] = useState([]);

    const [ovensAdr, setOvensAdr] = useState([]);

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


    const renderOwnedOvens = () => {

        console.log('started render');

        const showedOvens = [];

        for (let i = 0; i < ovensAdr.length; i++) {
            console.log(i, ':', ownedOvens[i]);
            console.log(ownedOvens);
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
                showedOvens.push(
                    <div
                        className="bg-white">
                        {ownedOvens[i].ratio}
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
            {renderOwnedOvens()}
        </div>
    )
}

export default Ovens;