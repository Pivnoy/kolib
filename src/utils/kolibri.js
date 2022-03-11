import { tz, wallet } from "./wallet"

import {
    ConversionUtils,
    HarbingerClient,
    OvenClient,
    StableCoinClient,
    TokenClient,
} from "@hover-labs/kolibri-js";

import { estimateSwap } from "@quipuswap/sdk";

import { FACTORIES, HARBRINGER, KOLIBRI_TOKEN_ADDRESS, kUSD_DIGITS, MINTER_ADDRESS, NETWORK, OVEN_FACTORY_ADDRESS, OVEN_REGISTRY_ADDRESS, RPC_URL } from "./values";


let tokenClient = null;

export let stableCoinClient = null;

let harbringerClient = null;

const createOvens = () => {

tokenClient = new TokenClient(RPC_URL, KOLIBRI_TOKEN_ADDRESS);

stableCoinClient = new StableCoinClient(
    RPC_URL,
    NETWORK,
    OVEN_REGISTRY_ADDRESS,
    MINTER_ADDRESS,
    OVEN_FACTORY_ADDRESS
);

harbringerClient = new HarbingerClient(
    RPC_URL,
    HARBRINGER
);

}


export const createOvenClient = (ovenAddress) => {
    const ovenClient = new OvenClient(
        RPC_URL,
        wallet,
        ovenAddress,
        stableCoinClient,
        harbringerClient
    );
    return ovenClient;
}


const getBalanceKolibri = async () => {

    try {
        let kUSD_balance = 12;
        kUSD_balance = (await tokenClient
            .getBalance(await wallet.getPKH()));
        kUSD_balance = ConversionUtils.shardToHumanReadableNumber(kUSD_balance, 2);
        return kUSD_balance;
    }
    catch (e) {
        console.log("Error in getting kUSD balance: ", e);
    }
}

const estimateOutput = async (from, to, amount) => {

    if (from !== 'tez') {
        amount = amount * kUSD_DIGITS;
        from = { contract: from };
    }

    if (to !== 'tez') {
        to = { contract: to };
    }

    try {
        const value = await estimateSwap(
            tz,
            FACTORIES,
            from,
            to,
            { inputValue: amount }
        );

        if (from === 'tez') {
            return value.dividedBy(1_000_000_000_000).toFixed(3);
        }

        if (to === 'tez') {
            return value.dividedBy(1_000_000).toFixed(3);
        }

    }
    catch (e) {
        console.log('Estimated swap conducted error: ', e);
        return 0;
    }
}



export {
    estimateOutput,
    getBalanceKolibri,
    createOvens,
}