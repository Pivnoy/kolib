import {
    connectWallet,
    getActiveAccount,
    disconnectWallet,
    getBalanceXtz,
    wallet,
    tz
} from "../../utils/wallet";
import {
    Button, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput,
    Select, SelectChangeEvent
} from "@mui/material";
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import { React, useEffect, useState } from "react";
import { estimateOutput, getBalanceKolibri } from '../../utils/kolibri';
import { KOLIBRI_TOKEN_ADDRESS } from "../../utils/values";
import { swapToken } from "../../utils/swap";

function Transaction(props) {

    const [currencyFrom, setCurrencyFrom] = useState('tez');
    const [currencyFromNumber, setCurrencyFromNumber] = useState("");
    const [currencyTo, setCurrencyTo] = useState(KOLIBRI_TOKEN_ADDRESS);
    const [currencyToNumber, setCurrencyToNumber] = useState("");

    const { TESTNET, reget } = props;

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

    const handleChangeCurrencies = async() => {
        const temp = currencyFrom;
        setCurrencyFrom(currencyTo);
        setCurrencyTo(temp);
        handleChangeToNumber({
            target: {
                value:
                    await estimateOutput(currencyTo, temp, currencyFromNumber)
            }
        });
    }

    const handleSwapToken = async () => {
        await swapToken(currencyFrom, currencyTo, currencyFromNumber);
        reget.setRegetbalance(!reget.regetBalance);
    }

    // to handle mui change
    useEffect(() => {

        if (currencyFrom === 'tez') {
            setCurrencyFrom('tez');
            setCurrencyTo(KOLIBRI_TOKEN_ADDRESS);
        }
        else {
            setCurrencyFrom(KOLIBRI_TOKEN_ADDRESS);
            setCurrencyTo('tez');
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
                                Rate: 1.3%
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
                        onClick={handleSwapToken}
                        className="py-2 px-10 place-self-center bg-white hover:shadow-sm text-black rounded transition duration-500">
                        Swap
                    </button>
                </div>
            </div>
        </div>
    )


};

export default Transaction;