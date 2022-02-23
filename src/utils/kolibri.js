import { rpcURL, tz, wallet } from "./wallet"


import {
    CONTRACTS,
    HarbingerClient,
    Network,
    OvenClient,
    StableCoinClient,
    TokenClient,
} from "@hover-labs/kolibri-js";

import { Asset, estimateSwap, Token } from "@quipuswap/sdk";


const ovenAddress = "KT1VXhDpn5sqQEmhS2H3wmGALVimkLcD9AKH";

const factories = {
    fa1_2Factory: "KT1HrQWkSFe7ugihjoMWwQ7p8ja9e18LdUFn",
    fa2Factory: "KT1Dx3SZ6r4h2BZNQM8xri1CtsdNcAoXLGZB",
  };

const tokenClient = new TokenClient(rpcURL, CONTRACTS.TEST.TOKEN);


const stableCoinClient = new StableCoinClient(
    rpcURL,
    Network.Hangzhou,
    CONTRACTS.TEST.OVEN_REGISTRY,
    CONTRACTS.TEST.MINTER,
    CONTRACTS.TEST.OVEN_FACTORY
);

const harbringerClient = new HarbingerClient(
    rpcURL,
    CONTRACTS.TEST.HARBINGER_NORMALIZER
);

const ovenClient = new OvenClient(
    rpcURL,
    tz.memorySigner,
    ovenAddress,
    stableCoinClient,
    harbringerClient
);



export const getBalanceKolibri = async () => {

    return (await tokenClient.getBalance(await wallet.getPKH())).dividedBy(1_000_000_000_000_000_000).precision(6).toNumber();

}

export const estimateOutput = async(from, to, amount) => {

    const value = await estimateSwap(
        tz,
        factories,
        from,
        to,
        { inputValue: amount }
    )
    
    return value.toNumber();
}