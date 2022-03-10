
import { createTezosKit, wallet } from "../../utils/wallet";
import { createOvenClient, createOvens, stableCoinClient } from '../../utils/kolibri';
import { React, useEffect, useState } from "react";
import Popup from "reactjs-popup";


function Ovens() {

    const [ownedOvens, setOwnedOvens] = useState([]);

    const showOvenClient = async (e) => {
        const ovenClient = createOvenClient(e.target.value);
        console.log(await ovenClient.getOwner());
    }

    const showOvenBalance = async (e) => {
        const ovenClient = createOvenClient(e.target.value);
        console.log(await ovenClient.getBalance());
    }

    const borrowFromOven = async (e) => {
        const ovenClient = createOvenClient(e.target.value);
        await (await ovenClient.borrow(1)).confirmation();
        console.log('borrowed');
    }

    const getAllOvenData = async(e) => {
        const ovenClient = createOvenClient(e.target.value);
        console.log((await ovenClient.getBorrowedTokens()).toNumber());
        console.log((await ovenClient.getStabilityFees()).toNumber());
        console.log((await ovenClient.getTotalOutstandingTokens()).toNumber());
        console.log((await ovenClient.getCollateralizationRatio()).precision(10).toNumber());
    }


    const renderOwnedOvens = () => {
        return ownedOvens.map((ov, i) => (
            <>
                <br />
                <button
                    className="bg-red-600"
                    key={i}
                    value={ov}
                    onClick={showOvenClient}>
                    {ov}
                </button>
                <Popup
                    trigger={
                        <button>
                            Interact with oven
                        </button>
                    }
                    position="center center"
                    modal
                    nested
                >
                    Pop up content
                    <br/>
                    <button
                        value={ov}
                        onClick={showOvenBalance}>
                        GetBaker
                    </button>
                    <br/>
                    <button
                        value={ov}
                        onClick={borrowFromOven}>
                        Borrow
                    </button>
                    <br/>
                    <button
                        value={ov}
                        onClick={getAllOvenData}>
                        Get all data!
                    </button>
                </Popup>
                <br />
            </>
        ))
    };

    useEffect(() => {
        const fl = async () => {
            if (!stableCoinClient) {
                await createTezosKit();
                createOvens();
            }
            let ovens = await stableCoinClient.ovensOwnedByAddress(await wallet.getPKH());
            setOwnedOvens(ovens);
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