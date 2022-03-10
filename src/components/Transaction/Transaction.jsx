import {
    connectWallet,
    getActiveAccount,
    disconnectWallet,
    getBalanceXtz,
    wallet,
    tz
} from "../../utils/wallet";
import {
    Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput,
    Select, SelectChangeEvent
} from "@mui/material";
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import { React, useEffect, useState } from "react";
import { estimateOutput, getBalanceKolibri } from '../../utils/kolibri';
import { KOLIBRI_TOKEN_ADDRESS } from "../../utils/values";
import { swapToken } from "../../utils/swap";
import Footer from "../Footer/Footer";

function Transaction(props) {

    const [currencyFrom, setCurrencyFrom] = useState('tez');
    const [currencyFromNumber, setCurrencyFromNumber] = useState("");
    const [currencyTo, setCurrencyTo] = useState(KOLIBRI_TOKEN_ADDRESS);
    const [currencyToNumber, setCurrencyToNumber] = useState("");

    const { TESTNET } = props;


    const handleChangeFromNumber = async (e) => {
        console.log(e.target.value);
        setCurrencyFromNumber(Number(e.target.value));
        handleChangeToNumber({
            target: {
                value:
                    await estimateOutput(currencyFrom, currencyTo, Number(e.target.value))
            }
        });
    }

    const handleChangeToNumber = (e) => {
        console.log(e.target.value);
        setCurrencyToNumber(Number(e.target.value));
    }

    const onFromSelectChange = (e) => {
        console.log(e.target.value);
        setCurrencyFrom(e.target.value);
    }
    const onToSelectChange = (e) => {
        console.log(e.target.value);
        setCurrencyTo(e.target.value);
    }

    const handleChangeCurrencies = () => {
        const temp = currencyFrom;
        setCurrencyFrom(currencyTo);
        setCurrencyTo(temp);
    }

    const handleSwapToken = async () => {
        await swapToken(currencyFrom, currencyTo, currencyFromNumber);
    }

    // to handle mui change
    useEffect(() => {
        setCurrencyTo(KOLIBRI_TOKEN_ADDRESS);
    }, [TESTNET]);

    return (


        // trader, left untouched, fixed window

        <body className="h-full bg-transparent flex items-center justify-center">
            <div className="m-10"></div>
            <div className="absolute insert-0 top-10 m-40 h-fit w-96 bg-white p-8 shadow-lg rounded-lg">
                <div className="text-black">
                    <div className="pb-5 text-center font-bold">TRADER</div>
                    <div className="mb-5">
                        <FormControl fullWidth sx={{ m: 0 }}>
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

                    <div>
                        <FormControl fullWidth sx={{ m: 0 }}>
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
                        <div className="pt-4 flex items-center justify-center">
                            <button
                                onClick={handleSwapToken}
                                className="m-4 w-40 bg-blue-600 hover:bg-blue-700 p-2 text-white rounded-lg shadow-lg">
                                Swap
                            </button>
                        </div>
                    </div>
                </div>
            </div>








            {/* footer, why not in wallet?*/}
            <Footer />

        </body>

    )
}

export default Transaction;
