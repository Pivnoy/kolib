
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

    const getAllOvenData = async (e) => {
        const ovenClient = createOvenClient(e.target.value);
        console.log((await stableCoinClient.getRequiredCollateralizationRatio()).toNumber());
        console.log('balance ', (await ovenClient.getBalance()).dividedBy(1_000_000).toNumber()); //xtz
        console.log('borrowed ', (await (await ovenClient.getBorrowedTokens()).dividedBy(1_000_000_000_000_000_000)).toNumber()); //kUSD
        console.log('stab fee ', (await ovenClient.getStabilityFees()).dividedBy(1_000_000_000_000_000_000).toNumber()); // kUSD
        console.log('outs token ', (await ovenClient.getTotalOutstandingTokens()).dividedBy(1_000_000_000_000_000_000).toNumber()); // ?
        console.log('ratio', (await ovenClient.getCollateralizationRatio()).precision(10).toNumber()); //?
    }


    const renderOwnedOvens = () => {
        return ownedOvens.map((ov, i) => (
            <>
                <br />
                <button
                    className="bg-blue-900"
                    key={i}
                    value={ov}
                    onClick={showOvenClient}>
                    {ov}
                </button>
                <Popup
                    trigger={
                        <button
                            className="bg-red-900">
                            Interact with oven
                        </button>
                    }
                    position="center center"
                    className="bg-white text-black"
                    modal
                    nested
                >
                    <div
                        className="bg-white">
                        Pop up content
                        <br />
                        <button
                            value={ov}
                            onClick={showOvenBalance}>
                            GetBaker
                        </button>
                        <br />
                        <button
                            value={ov}
                            onClick={borrowFromOven}>
                            Borrow
                        </button>
                        <br />
                        <button
                            value={ov}
                            onClick={getAllOvenData}>
                            Get all data!
                        </button>
                    </div>
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