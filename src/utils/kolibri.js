import { rpcURL, tz, wallet } from "./wallet"


import {
    CONTRACTS,
    HarbingerClient,
    Network,
    OvenClient,
    StableCoinClient,
    TokenClient,
} from "@hover-labs/kolibri-js";

const ovenAddress = "KT1VXhDpn5sqQEmhS2H3wmGALVimkLcD9AKH";

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