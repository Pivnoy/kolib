import {createTransport} from "nodemailer"
import { mailLogin, mailPassword } from "./mailSecret.js"

const transporter = createTransport({
    service: "gmail",
    auth: {
        user: mailLogin,
        pass: mailPassword
    }
});

const mailList = "lagusmax8@gmail.com";

const mailOptions = {
    from: mailLogin,
    to: mailList,
    subject: "testing mail 1231",
    text: "if i will be able to see it"
};

transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
        console.log('Error - ', err);
    }
    if (info) {
        console.log('Succsess ! = ', info);
    }
});

