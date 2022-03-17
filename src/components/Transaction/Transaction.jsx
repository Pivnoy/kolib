import {
    FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput,
    Select,
} from "@mui/material";
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import { React, useEffect, useState } from "react";
import { createOvens, estimateOutput } from '../../utils/kolibri_api/kolibri';
import { KOLIBRI_TOKEN_ADDRESS } from "../../utils/values";
import { swapToken } from "../../utils/wallet_api/swap";
import { createTezosKit } from "../../utils/wallet_api/wallet";

let xtzBalance = 12345;
let kolibriBalance =54321;

const CurrencyLogo = [
    {name:'xtz', href:'./Tezos.png'},
    {name: 'kUSD', href:'./KolibriCurrency.png'},
]

function Transaction(props) {

    const [currencyFrom, setCurrencyFrom] = useState('tez');
    const [currencyFromNumber, setCurrencyFromNumber] = useState("");
    const [currencyTo, setCurrencyTo] = useState(KOLIBRI_TOKEN_ADDRESS);
    const [currencyToNumber, setCurrencyToNumber] = useState("");

    const [rate, setRate] = useState(null);

    const { TESTNET, reget, connect, wal } = props;


    const handleChangeFromNumber = async (e) => {
        if (Number(e.target.value) >= 0) {
            setCurrencyFromNumber(Number(e.target.value));
            handleChangeToNumber({
                target: {
                    value:
                        await estimateOutput(currencyFrom, currencyTo, Number(e.target.value))
                }
            });
        }
    }

    const handleChangeToNumber = (e) => {
        if (Number(e.target.value) >= 0) {
            setCurrencyToNumber(Number(e.target.value));
        }
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

        

        <div className="h-fit bg-transparent flex items-center justify-center">
            <div className="insert-0 top-10 m-10 h-fit w-fit bg-dark-grey p-8 shadow-lg rounded-lg">
                <div className="mb-6 text-white text-left font-light">Swap</div>
                <div className="flex">


                <div className="mr-5">
                    <div className="mb-5 ">
                        <FormControl className="bg-black w-full rounded-lg active:bg-gradient-to-r from-light-blue via-turquouse to-emerald hover:">
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
                                            
                                            <MenuItem value={KOLIBRI_TOKEN_ADDRESS}>
                                                kUSD
                                            </MenuItem>
                                        </Select>
                                    </InputAdornment>}
                                label="Amount"
                            />
                        </FormControl>
                    </div>



                    <div className="flex justify-center">
                        <div className="text-green bg-black h-7 rounded-md items-center justify-center ml-10 pl-10 w-36">
                            Rate: {rate}
                        </div>
                        <IconButton
                            className="rotate-90 rounded-full border-gr relative inset-0 right-0"
                            style={{ height: "40px", width: "40px", border: "solid #324054", background:"#0E1012", transform: "rotate(90deg)", color: "#258991"}}
                            onClick={handleChangeCurrencies}>
                            <CompareArrowsOutlinedIcon />
                        </IconButton>
                    </div>



                    <div>
                        
                        <FormControl className="bg-black w-full rounded-lg hover:border-green">
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
                                            <MenuItem value={KOLIBRI_TOKEN_ADDRESS}>
                                            
                                                kUSD
                                            </MenuItem>
                                        </Select>
                                    </InputAdornment>}
                                label="Amount"
                            />
                        </FormControl>
                    </div>


                        <div className="pt-4 flex items-center justify-center">
                            <button
                                onClick={wal == null ? connect : handleSwapToken}
                                className="m-4 w-40 bg-gradient-to-r from-light-blue via-turquouse to-emerald p-2 text-white rounded-lg shadow-lg">
                                {wal == null ? "Connect" : "Swap"}
                            </button>
                        </div>
                </div>


                
                        {/* balance */}
                        <div className="ml-10 text-white font-light space-y-1">
                            <div style={{background: 'linear-gradient(to right, transparent 50%, rgba(37, 137, 145, 20%) 50%)'}} className="rounded-lg flex p-3 h-auto w-80 border-solid border-2 border-grey">
                                    <div>Tezos Holdings:</div> 
                                    <div className=""> XTZ</div>
                            </div>
                            <div className=""></div>
                                <div style={{background: 'linear-gradient(to right, transparent 50%, rgba(37, 137, 145, 20%) 50%)'}} className=" flex p-3 h-auto w-auto border-solid border-2 border-grey rounded-lg">
                                <div>kUSD Holdings:</div> 
                                <div className="">{kolibriBalance} kUSD</div>
                            </div>
                        </div>
                        </div>
                    
                <div>

                </div>
            </div>
            
            {/* place for graph and other info */}
            <div className="insert-0 top-10 m-10 h-fit w-96 bg-dark-grey p-8 shadow-lg rounded-lg">

            </div>








            {/* footer, why not in wallet?*/}
            {/* <Footer /> */}

        </div>

    )
}

export default Transaction;
