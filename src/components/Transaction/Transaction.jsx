import {
    connectWallet,
    getActiveAccount,
    disconnectWallet,
    getBalanceXtz,
    wallet,
    tz
} from "../../utils/wallet";
import { Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput,
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
        <div>
            <Container sx={{
            width: 600,
            height: 600,
            backgroundColor: 'transparent', 
                }}> 
                 <div className="grid  bg-blue-200 rounded space-y-9 bg-slate-400">
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
                        className="bg-blue-600 hover:bg-blue-700 py-2 px-10 place-self-center text-white rounded transition duration-500"
                        Swap
                    </button>
                    </div>           
                 </Container>        
            </div>     
    )
};

export default Transaction;