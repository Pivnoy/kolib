import { CONTRACTS } from "@hover-labs/kolibri-js";



let TESTNET = true;

const changeTESTNET = (testnet) => {
    TESTNET = testnet;
}

const FACTORIES = TESTNET ?
    {
        fa1_2Factory: "KT1HrQWkSFe7ugihjoMWwQ7p8ja9e18LdUFn",
        fa2Factory: "KT1Dx3SZ6r4h2BZNQM8xri1CtsdNcAoXLGZB",
    }
    :
    {
        fa1_2Factory: "KT1FWHLMk5tHbwuSsp31S4Jum4dTVmkXpfJw",
        fa2Factory: "KT1PvEyN1xCFCgorN92QCfYjw3axS6jawCiJ",
    }

const RPC_URL = TESTNET ? "https://hangzhounet.smartpy.io" : "https://mainnet.smartpy.io";


const KOLIBRI_TOKEN_ADDRESS = TESTNET ? CONTRACTS.TEST.TOKEN : CONTRACTS.MAIN.TOKEN;
// const KOLIBRI_TOKEN_ADDRESS = CONTRACTS.TEST.TOKEN;

const OVEN_REGISTRY_ADDRESS = TESTNET ? CONTRACTS.TEST.OVEN_REGISTRY : CONTRACTS.MAIN.OVEN_REGISTRY;

const MINTER_ADDRESS = TESTNET ? CONTRACTS.TEST.MINTER : CONTRACTS.MAIN.MINTER;

const OVEN_FACTORY_ADDRESS = TESTNET ? CONTRACTS.TEST.OVEN_FACTORY : CONTRACTS.MAIN.OVEN_FACTORY;


const HARBRINGER = TESTNET ? CONTRACTS.TEST.HARBINGER_NORMALIZER : CONTRACTS.MAIN.HARBINGER_NORMALIZER;

const NETWORK = TESTNET ? "hangzhounet" : "mainnet";

const OVEN_ADDRESS = TESTNET ? undefined : "KT1VXhDpn5sqQEmhS2H3wmGALVimkLcD9AKH";


export {
    FACTORIES,
    RPC_URL,
    KOLIBRI_TOKEN_ADDRESS,
    NETWORK,
    TESTNET,
    OVEN_ADDRESS,
    OVEN_FACTORY_ADDRESS,
    OVEN_REGISTRY_ADDRESS,
    MINTER_ADDRESS,
    HARBRINGER,
    changeTESTNET
}

