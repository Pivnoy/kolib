import { batchify, swap } from "@quipuswap/sdk";
import { FACTORIES } from "../values";
import { tz } from "./wallet"

export async function swapToken(
    from,
    to,
    amount
) {
    try {

        if (from !== 'tez') {
            amount = amount * 1_000_000_000_000_000;
            amount = amount * 1_000;
            from = { contract: from };
        }
    
        if (to !== 'tez') {
            amount = amount * 1_000_000;
            to = { contract: to };
        }

        // some economic constant for swaps
        const slippageTolerance = 0.005; // 0.5%

        const swapParams = await swap(
            tz,
            FACTORIES,
            from,
            to,
            amount,
            slippageTolerance
        );

        const operationDetails = await batchify(
            tz.wallet.batch([]),
            swapParams
        ).send();

        await operationDetails.confirmation(1);
        console.info("Completed swap!");
    } catch (err) {
        console.error("Error in swap! : ", err);
    }
}