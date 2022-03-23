import moment from "moment";
import { sendBuyMail, sendSellMail } from "../smtp/mail.js";
import { getkUSDNormalPrice } from "./getRate.js";

let checksSinceLastMail = 6;

export const startCheck = () => {
    setInterval(async () => {
        
        // get kUSD current actual price
        const price = await getkUSDNormalPrice();

        console.log('Checked price at ', moment().format('MMMM Do YYYY, h:mm:ss').toString());
        console.log('Current price is ', price);

        // price is high, send sell mail
        if (price - 1 >= 0.03) {
            if (checksSinceLastMail >= 6) {
                console.log('Sending sell mail...');
                checksSinceLastMail = 0;
                sendSellMail();
            }
        }
        // price is low, send buy mail
        else if (1 - price <= 0.01) {
            if (checksSinceLastMail >= 6) {
                console.log('Sending buy mail...');
                checksSinceLastMail = 0;
                sendBuyMail();
            }
        }

        checksSinceLastMail++;
    }, 1000 * 60 * 60 * 4);
}