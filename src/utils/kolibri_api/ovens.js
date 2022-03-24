import { ConversionUtils } from '@hover-labs/kolibri-js';
import { createOvenClient } from './kolibri';


export const getOvenDescription = async (ovenAddress) => {

    console.log('cum oven', ovenAddress);

    const ovenClient = createOvenClient(ovenAddress);

    const balance = (await ovenClient.getBalance()).dividedBy(1_000_000).toFixed(2);

    let ratio = await ovenClient.getCollateralUtilization();

    let token = await ovenClient.getTotalOutstandingTokens();

    let ovenRatio = null;

    if (ratio.isNaN()) {
        ovenRatio = 0;
    }
    else {
        ovenRatio = (ratio * 10).toFixed(2);
    }

    const borrowed = ConversionUtils.shardToHumanReadableNumber(
        (await ovenClient.getBorrowedTokens()), 2);
    
    const stabilityFee = ConversionUtils.shardToHumanReadableNumber(
        await ovenClient.getStabilityFees(), 4);

    return {
        balance: balance,
        address: ovenAddress,
        ratio: ovenRatio,
        borrowed: borrowed,
        fee: stabilityFee,
        token: token
    }

}