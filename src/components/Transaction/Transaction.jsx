import { IconButton } from "@mui/material";
import CompareArrowsOutlinedIcon from '@mui/icons-material/CompareArrowsOutlined';
import { React, useEffect, useState } from "react";
import { createOvens, estimateOutput } from '../../utils/kolibri_api/kolibri';
import { KOLIBRI_TOKEN_ADDRESS } from "../../utils/values";
import { swapToken } from "../../utils/wallet_api/swap";
import LoadingButton from '@mui/lab/LoadingButton';
import { createTezosKit } from "../../utils/wallet_api/wallet";


function Transaction(props) {

    const [currencyFrom, setCurrencyFrom] = useState('tez');
    const [currencyFromNumber, setCurrencyFromNumber] = useState("");
    const [currencyTo, setCurrencyTo] = useState(KOLIBRI_TOKEN_ADDRESS);
    const [currencyToNumber, setCurrencyToNumber] = useState("");

    const [loading, setLoading] = useState(false);

    const [rate, setRate] = useState(null);

    const { TESTNET, reget, connect, wal, balance } = props;


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
        setLoading(true);
        try {
            await swapToken(currencyFrom, currencyTo, currencyFromNumber);
        }
        catch (e) {
            setLoading(false);
        }
        setLoading(false);
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

        <div className="sm:pl-10 h-fit bg-transparent flex items-center justify-center">
            <div className="w-full sm:w-6/12 bg-white dark:bg-dark-grey p-8 shadow-lg rounded-lg">
                <div className="mb-6 pl-2 text-light-grey dark:text-white text-left font-light">Swap</div>
                <div className="flex">

                {/* all inputs with button and holdings */}
                    <div>
                        {/* all inputs */}
                        <div>
                            <div className="relative mb-5 bg-dark-white dark:bg-black border-transparent h-28 w-80 sm:w-96 rounded-lg hover:border-green border-2">

                                <div className="text-light-grey absolute inset-3 font-light"> From</div>

                                <img src={currencyFrom === 'tez' ? "./Tezos.png" : "./KolibriCurrency.png"}
                                    alt="Currency Icon"
                                    className="absolute bottom-7 left-2 p-1 rounded-md"
                                    style={{ background: "rgba(37, 137, 145, 10%)" }}
                                />

                                <div className="dark:text-white font-light absolute bottom-8 left-14 ">
                                    {currencyFrom === 'tez' ? "XTZ" : "kUSD"}
                                </div>

                                <input
                                    type="number"
                                    onChange={handleChangeFromNumber}
                                    value={currencyFromNumber}
                                    placeholder="0.0"
                                    className="absolute bottom-8 right-3 h-7 sm:w-56 bg-transparent border-2 border-grey"
                                    style={{ border: "none", borderBottom: "2px solid #324054", outline: "0", color: "#FFFFFF" }}
                                />

                            </div>



                            <div className="flex justify-between w-72 sm:w-96 items-center mb-5">
                                <div className="text-green bg-dark-white dark:bg-black h-9 w-52 ml-5 sm:ml-20 pt-2 rounded-md flex justify-center">
                                    Rate: {rate}
                                </div>
                                <IconButton
                                    className="rotate-90 rounded-full border-gr"
                                    style={{ height: "40px", width: "40px", border: "solid #324054", background: "#0E1012", transform: "rotate(90deg)", color: "#258991" }}
                                    onClick={handleChangeCurrencies}>
                                    <CompareArrowsOutlinedIcon />
                                </IconButton>
                            </div>

                            <div className="relative mb-3 bg-dark-white dark:bg-black border-transparent h-28 w-80 sm:w-96 rounded-lg hover:border-green border-2">
                                <div className="text-light-grey absolute inset-3 font-light"> To</div>
                                <img src={currencyTo === 'tez' ? "./Tezos.png" : "./KolibriCurrency.png"}
                                    alt="Currency Icon" className="absolute bottom-7 left-2 p-1 rounded-md" style={{ background: "rgba(37, 137, 145, 10%)" }}></img>
                                <div className="dark:text-white font-light absolute bottom-8 left-14 ">
                                    {currencyTo === 'tez' ? "XTZ" : "kUSD"}
                                </div>
                                <input
                                    type="number"
                                    placeholder="0.0"
                                    onChange={handleChangeToNumber}
                                    value={currencyToNumber}
                                    className="absolute bottom-8 right-3 h-7 sm:w-56 bg-transparent border-2 border-grey"
                                    style={{ border: "none", borderBottom: "2px solid #324054", outline: "0", color: "#FFFFFF" }}
                                />
                            </div>

                        </div>


                        <div className="pt-4 flex items-center justify-center">
                            <LoadingButton
                                loading={loading}
                                onClick={wal == null ? connect : handleSwapToken}
                                sx={{ color: "white" }}
                                className="m-4 w-40 bg-gradient-to-r from-light-blue via-turquouse to-emerald p-2 text-white rounded-lg shadow-lg font-light"
                            >
                                {wal == null ? "Connect" : "Swap"}
                            </LoadingButton>
                        </div>
                    </div>

                    <div className="hidden sm:block ml-4 text-light-green dark:text-white font-light space-y-1">
                        <div
                            style={{ background: 'linear-gradient(to right, transparent 50%, rgba(37, 137, 145, 20%) 50%)' }}
                            className="justify-between rounded-lg flex p-3 h-auto w-80 border-solid border-2 border-green dark:border-grey"
                        >
                            <div>Tezos Holdings</div>
                            <div>{balance.xtzBalance} XTZ</div>
                        </div>
                        <div
                            style={{ background: 'linear-gradient(to right, transparent 50%, rgba(37, 137, 145, 20%) 50%)' }}
                            className="justify-between flex p-3 h-auto w-auto border-solid border-2 border-green dark:border-grey rounded-lg"
                        >
                            <div>kUSD Holdings</div>
                            <div>{balance.kolibriBalance} kUSD</div>
                        </div>
                    </div>
                </div>

            </div>

        </div>

    )
}

export default Transaction;
