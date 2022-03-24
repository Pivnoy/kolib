import pkg from "@hover-labs/kolibri-js"
import pkg2 from "@quipuswap/sdk";
import { TezosToolkit } from "@taquito/taquito";


const { CONTRACTS, HarbingerClient } = pkg;

const { estimateSwap } = pkg2;


const getRateForSwap = async () => {

    const from = 'tez';

    const to = { contract: CONTRACTS.MAIN.TOKEN }

    const amount = 1;

    const fact = {
        fa1_2Factory: ['KT1FWHLMk5tHbwuSsp31S4Jum4dTVmkXpfJw', 'KT1Lw8hCoaBrHeTeMXbqHPG4sS4K1xn7yKcD'],
        fa2Factory: ['KT1PvEyN1xCFCgorN92QCfYjw3axS6jawCiJ', 'KT1SwH9P1Tx8a58Mm6qBExQFTcy2rwZyZiXS']
    };

    const tz_1 = new TezosToolkit("https://mainnet.smartpy.io");

    try {
        const value = await estimateSwap(
            tz_1,
            fact,
            from,
            to,
            { inputValue: amount }
        );

        return value.dividedBy(1_000_000_000_000).toFixed(3);
    }
    catch (e) {
        console.log('Estimated swap conducted error: ', e);
        return 0;
    }
}

const priceOracle = new HarbingerClient("https://mainnet.smartpy.io",
    CONTRACTS.MAIN.HARBINGER_NORMALIZER);

const getRate = async () => {
    const { price } = await priceOracle.getPriceData();
    return price;
}

export const getkUSDNormalPrice = async () => {
    const XTZprice = await getRate();
    const kUSD_price = await getRateForSwap();

    const shard_price = XTZprice.dividedBy(1_000_000).toFixed(3);

    const actual_price = shard_price / kUSD_price;

    return actual_price;
}