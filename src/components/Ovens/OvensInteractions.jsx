import React, { useState, useEffect } from "react";
import { ovenButtons } from "../../utils/kolibri_api/oven_buttons";
import { KOLIBRI_TOKEN_ADDRESS, MUTEZ_PRECISION, MUTEZ_TO_SHARD, SHARD_PRECISION } from "../../utils/values";
import {
    Button,
    InputAdornment, InputLabel, OutlinedInput,
} from "@mui/material";
import { createOvenClient } from "../../utils/kolibri_api/kolibri";


function OvensInteractions(props) {

    const { oven, btn, price, reget, connect, wal } = props;

    const [currency, setCurrency] = useState(null);

    const [ovenRatio, setOvenRatio] = useState(null);

    const [ovenInput, setOvenInput] = useState('');

    const handleInteractionButton = async () => {
        const ovenClient = createOvenClient(oven.address);
        let op;
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
        reget.setRegetbalance(!reget.regetBalance);
    }

    // pass dispersion
    const updateCollateral = (balance, token) => {

        const shard_price = price * MUTEZ_TO_SHARD;

        const changed_token = oven.token.plus(token * SHARD_PRECISION);

        const token_shard = changed_token.times(18);

        const balance_shard = (oven.balance * 1_000_000) * MUTEZ_TO_SHARD;

        const changed_balace = balance_shard + (balance * SHARD_PRECISION);

        const ovenValue = (changed_balace * shard_price) / SHARD_PRECISION;

        console.log(changed_balace, token_shard.toNumber(), shard_price);

        setOvenRatio(((token_shard / ovenValue) * 10).toFixed(2));
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
    }, [btn, oven]);

    return (
        <div>
            <div
                className="mt-1 text-white p-3 bg-transparent rounded-lg h-auto w-80 border-solid border-2 border-grey">
                {oven == null ? 'no oven?' :
                    <div>
                        Borrowed tokens: {oven.borrowed}
                        <br />
                        Oven balance: {oven.balance}
                        <br />
                        Current collateral utilization: {oven.ratio}
                        <br />
                        New collateral utilization: {ovenRatio}
                    </div>
                }
            </div>
            <div>
                <InputLabel htmlFor="outlined-adornment-amount">From</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-amount"
                    value={ovenInput}
                    onChange={handleOvenInput}
                    type="number"
                    placeholder="0.0"
                    size="medium"
                    disabled={oven == null}
                    style={{ backgroundColor: "#0E1012", color: "#FFFFFF"}}
                    startAdornment={
                        <InputAdornment position="start">
                            {currency === 'tez' ? 'ꜩ' : 'kUSD'}
                        </InputAdornment>}
                    label="Amount"
                />
                <Button
                    onClick={wal == null ? connect : handleInteractionButton}
                    variant="contained">
                    {wal == null ? 'Connect' : btn}
                </Button>
            </div>
        </div>
    )

}

export default OvensInteractions;