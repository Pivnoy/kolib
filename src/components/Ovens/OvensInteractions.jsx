
import React, { useState, useEffect } from "react";
import { ovenButtons } from "../../utils/kolibri_api/oven_buttons";
import { KOLIBRI_TOKEN_ADDRESS, MUTEZ_TO_SHARD, SHARD_PRECISION } from "../../utils/values";
import {
    FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput,
    Select,
} from "@mui/material";

function OvensInteractions(props) {

    const { oven, btn, price } = props;

    const [currency, setCurrency] = useState(null);

    const [ovenRatio, setOvenRatio] = useState(null);

    // pass dispersion
    const updateCollateral = (balance, token) => {

        const shard_price = price * MUTEZ_TO_SHARD;

        const token_shard = oven.token.times(18);

        const balance_shard = (oven.balance * 1_000_000)  * MUTEZ_TO_SHARD;

        const changed_balace = balance_shard + (balance * SHARD_PRECISION);

        const changed_token = token_shard + token;
        
        const ovenValue = (changed_balace * shard_price) / SHARD_PRECISION;

        console.log(changed_balace, token_shard, shard_price);

        console.log(token_shard / ovenValue);

        setOvenRatio(((token_shard / ovenValue) * 10).toFixed(2));
    }


    const handleOvenInput = (e) => {
        if (Number(e.target.value) >= 0) {
            updateCollateral(1, 0);
        }
    }

    useEffect(() => {

        if (btn == ovenButtons.borrow || btn == ovenButtons.payback) {
            setCurrency(KOLIBRI_TOKEN_ADDRESS);
        }
        else {
            setCurrency('tez');
        }
        if (oven != null) {
            setOvenRatio(oven.ratio);
        }
    }, [btn, oven]);

    return (
        <div
            className="text-red-400">
            {oven == null ? 'not connected' : oven.ratio}
            <br />
            {btn}
            <br />
            {currency}
            <br />
            {oven == null ? 'no oven?' :
                <div>
                    borrowed tokens: {oven.borrowed}
                    <br />
                    oven balance: {oven.balance}
                    <br />
                    current collateral utilization: {oven.ratio}
                    <br />
                    new collateral utilization: {ovenRatio}
                </div>
            }
            <InputLabel htmlFor="outlined-adornment-amount">From</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-amount"
                                value={12}
                                onChange={handleOvenInput}
                                type="number"
                                placeholder="0.0"
                                startAdornment={
                                    <InputAdornment position="start">
                                        
                                    </InputAdornment>}
                                label="Amount"
                            />
        </div>
    )

}

export default OvensInteractions;