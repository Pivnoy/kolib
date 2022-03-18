import {
    FormControl, IconButton, InputAdornment, InputLabel, MenuItem, OutlinedInput,
    Select, Input
} from "@mui/material";
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import { React, useEffect, useState } from "react";
import { createOvens, estimateOutput } from '../../utils/kolibri_api/kolibri';
import { KOLIBRI_TOKEN_ADDRESS } from "../../utils/values";
import { swapToken } from "../../utils/wallet_api/swap";
import { createTezosKit } from "../../utils/wallet_api/wallet";
import { black } from "tailwindcss/colors";


//delete later
let xtzBalance = 12345;
let kolibriBalance = 54321;

const CurrencyLogo = [
    { name: 'xtz', href: './Tezos.png' },
    { name: 'kUSD', href: './KolibriCurrency.png' },
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

    const onFromSelectChange = async (e) => {
        // setCurrencyFrom(e.target.value);
        await handleChangeCurrencies();
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

        //need to: add pics of kUSD and XTZ (see const currencyLogo), make from and to inside frame, make color of frame, change text-color (text-white, bg-black,
        // border-black active:border-gradient-to-r from-light-blue via-turquouse to-emerald, font-light)

        <div className="h-fit bg-transparent flex items-center justify-center">
            <div className="insert-0 top-10 m-10 h-fit w-fit bg-dark-grey p-8 shadow-lg rounded-lg">
                <div className="mb-6 text-white text-left font-light">Swap</div>
                <div className="flex">

                    <div className="mr-5">
                        <div className="mb-5 ">

                            <FormControl className="h-20 w-full rounded-lg active:bg-gradient-to-r from-light-blue via-turquouse to-emerald hover:">
                                <InputLabel htmlFor="component-simple">From</InputLabel>
                                <Input
                                    id="component-simple"
                                    value={currencyFromNumber}
                                    onChange={handleChangeFromNumber}
                                    type="number"
                                    placeholder="0.0"
                                    startAdornment={
                                        <InputAdornment position="start">
                                            <Select
                                                variant="standard"
                                                sx={{ color: "white" }}
                                                onChange={onFromSelectChange}
                                                value={currencyFrom}
                                            >
                                                <MenuItem
                                                    value='tez'>
                                                    <img src="./Tezos.png" alt="Tezos icon" />
                                                    XTZ
                                                </MenuItem>

                                                <MenuItem
                                                    value={KOLIBRI_TOKEN_ADDRESS}>
                                                    <img src="./KolibriCurrency.png" alt="Kolibri icon" />
                                                    kUSD
                                                </MenuItem>
                                            </Select>
                                        </InputAdornment>}
                                    label="Amount"
                                />
                            </FormControl>
                        </div>



                        <div className="flex justify-between w-96 items-center mb-5">
                            <div className="text-green bg-black h-9 w-52 ml-20 pt-2 rounded-md flex justify-center">
                                Rate: {rate}
                            </div>
                            <IconButton
                                className="rotate-90 rounded-full border-gr"
                                style={{ height: "40px", width: "40px", border: "solid #324054", background: "#0E1012", transform: "rotate(90deg)", color: "#258991" }}
                                onClick={handleChangeCurrencies}>
                                <CompareArrowsOutlinedIcon />
                            </IconButton>
                        </div>



                        <div>

                            <FormControl className="h-20 w-full rounded-lg hover:border-green">
                                <InputLabel htmlFor="component-simple">To</InputLabel>
                                <Input
                                    id="component-simple"
                                    value={currencyToNumber}
                                    onChange={handleChangeToNumber}
                                    type="number"
                                    placeholder="0.0"
                                    startAdornment={
                                        <InputAdornment position="start">

                                            <Select
                                                variant="standard"
                                                sx={{ color: "white" }}
                                                onChange={onToSelectChange}
                                                value={currencyTo}

                                            >
                                                <MenuItem value='tez'>
                                                    <img src="./Tezos.png" alt="Tezos icon" />
                                                    XTZ
                                                </MenuItem>
                                                <MenuItem value={KOLIBRI_TOKEN_ADDRESS}>
                                                    <img src="./KolibriCurrency.png" alt="Kolibri icon" />
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



                    {/* balance, place here status hidden when wallet is not connected, also move balance func instead of variables*/}
                    <div className="ml-10 text-white font-light space-y-1">
                        <div style={{ background: 'linear-gradient(to right, transparent 50%, rgba(37, 137, 145, 20%) 50%)' }} className="justify-between rounded-lg flex p-3 h-auto w-80 border-solid border-2 border-grey">
                            <div>Tezos Holdings</div>
                            <div className="">{xtzBalance} XTZ</div>
                        </div>
                        <div className=""></div>
                        <div style={{ background: 'linear-gradient(to right, transparent 50%, rgba(37, 137, 145, 20%) 50%)' }} className="justify-between flex p-3 h-auto w-auto border-solid border-2 border-grey rounded-lg">
                            <   div>kUSD Holdings</div>
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
