import { CONTRACTS } from "@hover-labs/kolibri-js";

import BigNumber from 'bignumber.js'

let TESTNET = true;

const changeTESTNET = (testnet) => {

    TESTNET = testnet;

    FACTORIES = TESTNET ?
        {
            fa1_2Factory: "KT1HrQWkSFe7ugihjoMWwQ7p8ja9e18LdUFn",
            fa2Factory: "KT1Dx3SZ6r4h2BZNQM8xri1CtsdNcAoXLGZB",
        }
        :
        {
            fa1_2Factory: ['KT1FWHLMk5tHbwuSsp31S4Jum4dTVmkXpfJw', 'KT1Lw8hCoaBrHeTeMXbqHPG4sS4K1xn7yKcD'],
            fa2Factory: ['KT1PvEyN1xCFCgorN92QCfYjw3axS6jawCiJ', 'KT1SwH9P1Tx8a58Mm6qBExQFTcy2rwZyZiXS']
        }
    RPC_URL = TESTNET ? "https://hangzhounet.smartpy.io" : "https://mainnet.smartpy.io";
    KOLIBRI_TOKEN_ADDRESS = TESTNET ? CONTRACTS.TEST.TOKEN : CONTRACTS.MAIN.TOKEN;
    OVEN_REGISTRY_ADDRESS = TESTNET ? CONTRACTS.TEST.OVEN_REGISTRY : CONTRACTS.MAIN.OVEN_REGISTRY;
    MINTER_ADDRESS = TESTNET ? CONTRACTS.TEST.MINTER : CONTRACTS.MAIN.MINTER;
    OVEN_FACTORY_ADDRESS = TESTNET ? CONTRACTS.TEST.OVEN_FACTORY : CONTRACTS.MAIN.OVEN_FACTORY;
    HARBRINGER = TESTNET ? CONTRACTS.TEST.HARBINGER_NORMALIZER : CONTRACTS.MAIN.HARBINGER_NORMALIZER;
    NETWORK = TESTNET ? "hangzhounet" : "mainnet";
    OVEN_ADDRESS = TESTNET ? CONTRACTS.TEST.OVEN_ADDRESS : CONTRACTS.MAIN.OVEN_ADDRESS;
}



let FACTORIES = TESTNET ?
    {
        fa1_2Factory: "KT1HrQWkSFe7ugihjoMWwQ7p8ja9e18LdUFn",
        fa2Factory: "KT1Dx3SZ6r4h2BZNQM8xri1CtsdNcAoXLGZB",
    }
    :
    {
        fa1_2Factory: ['KT1FWHLMk5tHbwuSsp31S4Jum4dTVmkXpfJw', 'KT1Lw8hCoaBrHeTeMXbqHPG4sS4K1xn7yKcD'],
        fa2Factory: ['KT1PvEyN1xCFCgorN92QCfYjw3axS6jawCiJ', 'KT1SwH9P1Tx8a58Mm6qBExQFTcy2rwZyZiXS']
    }


let RPC_URL = TESTNET ? "https://hangzhounet.smartpy.io" : "https://mainnet.smartpy.io";


let KOLIBRI_TOKEN_ADDRESS = TESTNET ? CONTRACTS.TEST.TOKEN : CONTRACTS.MAIN.TOKEN;

let OVEN_REGISTRY_ADDRESS = TESTNET ? CONTRACTS.TEST.OVEN_REGISTRY : CONTRACTS.MAIN.OVEN_REGISTRY;

let MINTER_ADDRESS = TESTNET ? CONTRACTS.TEST.MINTER : CONTRACTS.MAIN.MINTER;

let OVEN_FACTORY_ADDRESS = TESTNET ? CONTRACTS.TEST.OVEN_FACTORY : CONTRACTS.MAIN.OVEN_FACTORY;

let HARBRINGER = TESTNET ? CONTRACTS.TEST.HARBINGER_NORMALIZER : CONTRACTS.MAIN.HARBINGER_NORMALIZER;

let NETWORK = TESTNET ? "hangzhounet" : "mainnet";

let OVEN_ADDRESS = TESTNET ? CONTRACTS.TEST.OVEN_ADDRESS : CONTRACTS.MAIN.OVEN_ADDRESS;

const kUSD_DIGITS = 1_000_000_000_000_000_000;

const MUTEZ_DIGITS = 6
const SHARD_DIGITS = 18

const MUTEZ_TO_SHARD = new BigNumber(Math.pow(10, SHARD_DIGITS - MUTEZ_DIGITS))
const SHARD_PRECISION = new BigNumber(Math.pow(10, SHARD_DIGITS))


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
    changeTESTNET,
    kUSD_DIGITS,
    MUTEZ_TO_SHARD,
    SHARD_PRECISION,
}

