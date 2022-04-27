import React, { useState, useEffect } from "react";
import { ovenButtons } from "../../utils/kolibri_api/oven_buttons";
import { KOLIBRI_TOKEN_ADDRESS, MUTEZ_PRECISION, MUTEZ_TO_SHARD, SHARD_PRECISION } from "../../utils/values";
import LoadingButton from '@mui/lab/LoadingButton';
import { createOvenClient } from "../../utils/kolibri_api/kolibri";

// let styleForOvensData = "absolute right-4 bottom-10 font-light ml-10 mt-3 text-white p-3 bg-transparent rounded-lg h-auto w-80 border-solid border-2 border-grey order-last";

function OvensInteractions(props) {

    const { oven, btn, price, reget, connect, wal, balance } = props;

    const [currency, setCurrency] = useState(null);

    const [ovenRatio, setOvenRatio] = useState(null);

    const [ovenInput, setOvenInput] = useState('');

    const [loading, setLoading] = useState(false);

    const handleInteractionButton = async () => {
        const ovenClient = createOvenClient(oven.address);
        let op;
        setLoading(true);
        try {
            switch (btn) {
                case (ovenButtons.borrow):
                    op = await ovenClient.borrow(Number(ovenInput) * SHARD_PRECISION);
                    await op.confirmation();
                    console.log(ovenButtons.borrow, 'complited!');
                    break;
                case (ovenButtons.deposit):
                    op = await ovenClient.deposit(Number(ovenInput) * MUTEZ_PRECISION);
                    await op.confirmation();
                    console.log(ovenButtons.deposit, 'complited!');
                    break;
                case (ovenButtons.withdraw):
                    op = await ovenClient.withdraw(Number(ovenInput) * MUTEZ_PRECISION);
                    await op.confirmation();
                    console.log(ovenButtons.withdraw, 'complited!');
                    break;
                case (ovenButtons.payback):
                    op = await ovenClient.repay(Number(ovenInput) * SHARD_PRECISION);
                    await op.confirmation();
                    console.log(ovenButtons.payback, 'complited!');
                    break;
                default:
                    break;
            }
        }
        catch (e) {
            setLoading(false);
        }
        reget.setRegetbalance(!reget.regetBalance);
        setLoading(false);
    }

    // pass dispersion
    const updateCollateral = (balance, token) => {

        const shard_price = price * MUTEZ_TO_SHARD;

        const changed_token = oven.token.plus(token * SHARD_PRECISION);

        const token_shard = changed_token.times(18);

        const balance_shard = (oven.balance * 1_000_000) * MUTEZ_TO_SHARD;

        const changed_balace = balance_shard + (balance * SHARD_PRECISION);

        const ovenValue = (changed_balace * shard_price) / SHARD_PRECISION;

        const finalRatio = ((token_shard / ovenValue) * 10).toFixed(2)

        setOvenRatio(finalRatio >= 100 ? 100 : finalRatio);
    }

    const checkDisabledButton = () => {
        if (wal == null) {
            return false;
        }

        if (!oven) {
            return true;
        }

        if (ovenRatio && ovenRatio >= 80) {
            return true;
        }
    }

    const handleOvenInput = (e) => {
        if (Number(e.target.value) >= 0) {
            setOvenInput(Number(e.target.value));
            if (currency === 'tez') {
                updateCollateral(Number(e.target.value), 0);
            }
            else {
                updateCollateral(0, Number(e.target.value));
            }
        }
    }

    useEffect(() => {

        // eslint-disable-next-line eqeqeq
        if (btn == ovenButtons.borrow || btn == ovenButtons.payback) {
            setCurrency(KOLIBRI_TOKEN_ADDRESS);
        }
        else {
            setCurrency('tez');
        }
        if (oven != null) {
            if (ovenInput === '') {
                setOvenRatio(oven.ratio);
            }
            else {
                // eslint-disable-next-line eqeqeq
                if (btn == ovenButtons.borrow || btn == ovenButtons.payback) {
                    updateCollateral(0, ovenInput);
                }
                else {
                    updateCollateral(ovenInput, 0);
                }
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [btn, oven]);

    return (
        <div>
            <div>
                <div className="relative bg-dark-white dark:bg-black border-transparent h-28 w-96 rounded-lg hover:border-green border-2">
                    <div className="text-light-grey absolute inset-3 font-light"> From</div>

                    <img src={currency === 'tez' ? "./Tezos.png" : "./KolibriCurrency.png"}
                        alt="Currency Icon"
                        className="absolute bottom-7 left-2 p-1 rounded-md"
                        style={{ background: "rgba(37, 137, 145, 10%)" }}
                    />

                    <div className="dark:text-white font-light absolute bottom-8 left-14 ">
                        {currency === 'tez' ? "XTZ" : "kUSD"}
                    </div>

                    <input
                        type="number"
                        placeholder="0.0"
                        value={ovenInput}
                        disabled={!oven}
                        onChange={handleOvenInput}
                        className="absolute bottom-8 right-3 h-7 w-56 bg-transparent border-2 border-grey"
                        style={{ border: "none", borderBottom: "2px solid #324054", outline: "0", color: "#FFFFFF" }}
                    />
                </div>
            </div>

            <div className="flex justify-center">
                <LoadingButton
                    // disabled={checkDisabledButton()}
                    loading={loading || checkDisabledButton()}
                    className="m-40 bg-gradient-to-r from-light-blue via-turquouse to-emerald p-2 text-light-grey dark:text-white rounded-lg shadow-lg font-light"
                    sx={{color: "white", margin: "40px"}}
                    // sx={{ margin: "40px", background: "linear-gradient(to right, #258991, #298B93, #00717A)", fontWeight: "lighter", transform: "capitalize" }}
                    onClick={wal == null ? connect : handleInteractionButton}
                    variant="contained">
                    {wal == null ? 'Connect' : btn}
                </LoadingButton>
            </div>

            <div className="absolute right-4 top-16 mb-12 mt-2">
                <div className="mt-6 ml-10 dark:text-white font-light space-y-1">
                    <div 
                        style={{ background: 'linear-gradient(to right, transparent 50%, rgba(37, 137, 145, 20%) 50%)' }} 
                        className="justify-between rounded-lg flex p-3 h-auto w-80 border-solid border-2 border-grey"
                    >
                        <div>Tezos Holdings</div>
                        <div>{balance.xtzBalance} XTZ</div>
                    </div>
                    <div 
                        style={{ background: 'linear-gradient(to right, transparent 50%, rgba(37, 137, 145, 20%) 50%)' }} 
                        className="justify-between flex p-3 h-auto w-auto border-solid border-2 border-grey rounded-lg"
                    >
                        <div>kUSD Holdings</div>
                        <div>{balance.kolibriBalance} kUSD</div>
                    </div>
                </div>
                <div
                    className="border-solid border-2 border-grey mt-3 ml-10 text-white font-light space-y-1 p-4 rounded-lg"
                    hidden={!oven}
                >
                    <div className="w-full bg-black rounded-full h-2.5">
                        <div
                            className="bg-gradient-to-r from-light-blue via-turquouse to-emerald h-2.5 rounded-full"
                            style={{ width: ovenRatio ? (ovenRatio.toString() + '%') : '0%' }}
                        />
                    </div>
                </div>
            </div>

            

            <div>
                
                {oven == null ?  ' ':
                    <div className="absolute right-4 bottom-10 font-light ml-10 mt-3 dark:text-white p-3 bg-transparent rounded-lg h-auto w-80 border-solid border-2 border-grey">
                        <div className="flex justify-between">
                            Borrowed tokens:<div> {oven.borrowed} XTZ</div>
                        </div>
                        <div className="flex justify-between">
                            Oven balance: <div>{oven.balance} XTZ</div>
                        </div>
                        <div className="flex justify-between">
                            Current collateral utilization: <div>{oven.ratio} %</div>
                        </div>
                        <div className="flex justify-between">
                            New collateral utilization:<div> {ovenRatio} %</div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )

}

export default OvensInteractions;