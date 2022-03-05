import { batchify, swap } from "@quipuswap/sdk";
import { FACTORIES, TESTNET } from "./values";
import { wallet, tz } from "./wallet"

export async function swapToken(
    from,
    to,
    amount
) {
    try {

        if (from !== 'tez') {
            from = { contract: from };
        }
    
        if (to !== 'tez') {
            to = { contract: to };
        }

        // some economic constant for swaps
        const slippageTolerance = 0.005; // 0.5%

        console.log(TESTNET, tz);

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

        await operationDetails.confirmation();
        console.info("Completed swap!");
    } catch (err) {
        console.error("Error in swap! : ", err);
    }
}