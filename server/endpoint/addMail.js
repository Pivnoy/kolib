import { updateMailList } from "../smtp/mail.js";


export const addMail = async (req, res) => {
    let mail;

    try {
        console.log(req.body);
        mail = req.body.mail;

        if (mail == null) {
            throw new Error("Incorrect data");
        }
    }
    catch (e) {
        console.log('Error in add mail endpoint ', e);
        return res.status(200).send("Bad request");
    }

    console.log(mail);

    updateMailList(mail);

    return res.status(200).send("Added new mail!");
}