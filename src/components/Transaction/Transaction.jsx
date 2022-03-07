import {
    FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput,
    Select,
} from "@mui/material";
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import { React, useEffect, useState } from "react";
import { createOvens, estimateOutput } from '../../utils/kolibri';
import { KOLIBRI_TOKEN_ADDRESS } from "../../utils/values";
import { swapToken } from "../../utils/swap";
import { createTezosKit } from "../../utils/wallet";

function Transaction(props) {

    const [currencyFrom, setCurrencyFrom] = useState('tez');
    const [currencyFromNumber, setCurrencyFromNumber] = useState("");
    const [currencyTo, setCurrencyTo] = useState(KOLIBRI_TOKEN_ADDRESS);
    const [currencyToNumber, setCurrencyToNumber] = useState("");

    const [rate, setRate] = useState(null);

    const { TESTNET, reget, connect, wal } = props;

    const handleChangeFromNumber = async (e) => {
        setCurrencyFromNumber(Number(e.target.value));
        handleChangeToNumber({
            target: {
                value:
                    await estimateOutput(currencyFrom, currencyTo, Number(e.target.value))
            }
        });
    }

    const handleChangeToNumber = (e) => {
        setCurrencyToNumber(Number(e.target.value));
    }

    const onFromSelectChange = (e) => {
        setCurrencyFrom(e.target.value);
    }

    const onToSelectChange = (e) => {
        setCurrencyTo(e.target.value);
    }

    // set rate between swaps btn
    // recreate ovens and  tezos kit to avoid sinc
    const setCurrentRate = async (f, t) => {
        await createTezosKit();
        createOvens();
        setRate(await estimateOutput(f, t, 1));
    }


    // ->/<- button
    const handleChangeCurrencies = async () => {
        const temp = currencyFrom;
        setCurrencyFrom(currencyTo);
        setCurrencyTo(temp);

        reget.setRegetbalance(!reget.regetBalance);

        await setCurrentRate(currencyTo, temp);

        handleChangeToNumber({
            target: {
                value:
                    await estimateOutput(currencyTo, temp, currencyFromNumber)
            }
        });
    }

    const handleSwapToken = async () => {
        await swapToken(currencyFrom, currencyTo, currencyFromNumber);

        // bad practice, but it works so...
        // force this useState trigger to reload main page to rerender user balance
        reget.setRegetbalance(!reget.regetBalance);
    }

    // to handle mui change and don't get missing value
    useEffect(() => {

        if (currencyFrom === 'tez') {
            setCurrencyFrom('tez');
            setCurrencyTo(KOLIBRI_TOKEN_ADDRESS);
            setCurrentRate('tez', KOLIBRI_TOKEN_ADDRESS);
        }
        else {
            setCurrencyFrom(KOLIBRI_TOKEN_ADDRESS);
            setCurrencyTo('tez');
            setCurrentRate(KOLIBRI_TOKEN_ADDRESS, 'tez');
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [TESTNET]);

    return (
        <div>
            <div className="bg-gray-600 py-7 md:rounded-b-2xl">
                <div className="grid space-y-9 bg-slate-400">
                    <div className="flex items-center justify-around space-x-3 flex-col">
                        <div>
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <InputLabel htmlFor="outlined-adornment-amount">From</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    value={currencyFromNumber}
                                    onChange={handleChangeFromNumber}
                                    type="number"
                                    placeholder="0.0"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Select
                                                variant="standard"
                                                onChange={onFromSelectChange}
                                                value={currencyFrom}
                                            >
                                                <MenuItem value='tez'>
                                                    XTZ
                                                </MenuItem>
                                                <MenuItem value='USD'>
                                                    USD
                                                </MenuItem>
                                                <MenuItem value={KOLIBRI_TOKEN_ADDRESS}>
                                                    kUSD
                                                </MenuItem>
                                            </Select>
                                        </InputAdornment>}
                                    label="Amount"
                                />
                            </FormControl>
                        </div>

                        <div className="flex flex-col items-center border-black">
                            <p>
                                Rate: {rate}
                            </p>
                            <IconButton
                                style={{ height: "45px", width: "45px" }}
                                onClick={handleChangeCurrencies}>
                                <CompareArrowsOutlinedIcon />
                            </IconButton>
                        </div>

                        <div >
                            <FormControl>
                                <InputLabel htmlFor="outlined-adornment-amount">To</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    value={currencyToNumber}
                                    onChange={handleChangeToNumber}
                                    type="number"
                                    placeholder="0.0"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Select
                                                variant="standard"
                                                onChange={onToSelectChange}
                                                value={currencyTo}
                                            >
                                                <MenuItem value='tez'>
                                                    XTZ
                                                </MenuItem>
                                                <MenuItem value='USD'>
                                                    USD
                                                </MenuItem>
                                                <MenuItem value={KOLIBRI_TOKEN_ADDRESS}>
                                                    kUSD
                                                </MenuItem>
                                            </Select>
                                        </InputAdornment>}
                                    label="Amount"
                                />
                            </FormControl>
                        </div>

                    </div>

                    <button
                        onClick={wal == null ? connect:  handleSwapToken}
                        className="py-2 px-10 place-self-center bg-white hover:shadow-sm text-black rounded transition duration-500">
                        {wal == null ? "Connect" : "Swap"}
                    </button>
                </div>
            </div>
        </div>
    )


};

export default Transaction;