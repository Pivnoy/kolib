import {createTransport} from "nodemailer"
import { mailLogin, mailPassword } from "./mailSecret.js"

const transporter = createTransport({
    service: "gmail",
    auth: {
        user: mailLogin,
        pass: mailPassword
    }
});

let mailList = "lagusmax8@gmail.com";

export const updateMailList = (new_mail) => {
    mailList = mailList + ', ' + new_mail;
    console.log(mailList);
}

const mailOptionsHigher = {
    from: 'Kolibri project ' + mailLogin,
    to: mailList,
    subject: "kUSD is availiable sell!!",
    text: "if i will be able to see it"
};

const mailOptionsLower = {
    from: 'Kolibri project ' + mailLogin,
    to: mailList,
    subject: "kUSD is availiable buy!!!",
    text: "if i will be able to see it"
};

export const sendBuyMail = () => {
    transporter.sendMail(mailOptionsLower, (err, info) => {
        if (err) {
            console.log('Error in buying mail ', err);
        }
        if (info) {
            console.log('Sended buy mail ', info);
        }
    })
}

export const sendSellMail = () => {
    transporter.sendMail(mailOptionsHigher, (err, info) => {
        if (err) {
            console.log('Error in selling mail ', err);
        }
        if (info) {
            console.log('Sended sell mail ', info);
        }
    })
}