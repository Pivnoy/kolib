import { tz, wallet } from "./wallet"


import {
    CONTRACTS,
    HarbingerClient,
    Network,
    OvenClient,
    StableCoinClient,
    TokenClient,
} from "@hover-labs/kolibri-js";

import { estimateSwap } from "@quipuswap/sdk";
import { FACTORIES, HARBRINGER, KOLIBRI_TOKEN_ADDRESS, MINTER_ADDRESS, NETWORK, OVEN_ADDRESS, OVEN_FACTORY_ADDRESS, OVEN_REGISTRY_ADDRESS, RPC_URL } from "./values";


const tokenClient = new TokenClient(RPC_URL, KOLIBRI_TOKEN_ADDRESS);


const stableCoinClient = new StableCoinClient(
    RPC_URL,
    NETWORK,
    OVEN_REGISTRY_ADDRESS,
    MINTER_ADDRESS,
    OVEN_FACTORY_ADDRESS
);

const harbringerClient = new HarbingerClient(
    RPC_URL,
    HARBRINGER
);

const ovenClient = new OvenClient(
    RPC_URL,
    tz.memorySigner,
    OVEN_ADDRESS,
    stableCoinClient,
    harbringerClient
);



const getBalanceKolibri = async () => {

    try {
        let kUSD_balance = 12;
        kUSD_balance = (await tokenClient
            .getBalance(await wallet.getPKH())).dividedBy(1_000_000_000_000_000_000).precision(6).toNumber();
        console.log(kUSD_balance);
        return kUSD_balance;
    }
    catch (e) {
        console.log("Error in getting kUSD balance: ", e);
    }
}

const estimateOutput = async (from, to, amount) => {

    if (from !== 'tez') {
        from = { contract: from };
    }

    if (to !== 'tez') {
        to = { contract: to };
    }

    try {
        console.log(from, to, amount);
        const value = await estimateSwap(
            tz,
            FACTORIES,
            from,
            to,
            { inputValue: amount }
        );

        if (from === 'tez') {
            return value.dividedBy(1_000_000_000_000_000_000).precision(3).toNumber();
        }

        if (to === 'tez') {
            return value.dividedBy(1_000_000).precision(3).toNumber();
        }

    }
    catch (e) {
        console.log(e);
        return 0;
    }
}





export {
    estimateOutput,
    getBalanceKolibri
}