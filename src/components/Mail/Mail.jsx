import { Button, TextField } from "@mui/material";
import validator from 'validator'
import React, { useState } from "react";

function Mail() {

    const serverAddress = "http://alex.dyndns.ws:8239/mail";

    const [validEmail, setValidEmail] = useState(true);

    const [email, setEmail] = useState('');

    const handleEmailInput = (e) => {
        const email_add = e.target.value;
        setEmail(email_add);
        setValidEmail(validator.isEmail(email_add));
    }

    const handleSubscription = async () => {
        try {
            await fetch(serverAddress, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ mail: email })
            })
            alert('You successfully submited your emal');
        }
        catch (e) {
            alert('Something went wrong');
        }
    }

    const changeValidEmailInput = () => {
        if (!email) {
            return true;
        }
        if (!validEmail) {
            return true;
        }
        // eslint-disable-next-line eqeqeq
        if (email == "") {
            return true;
        }
        return false;
    }


    return (
        <div className="h-fit bg-transparent flex items-center justify-center">
            <div className="sm:ml-10 h-96 w-96 bg-white dark:bg-dark-grey p-8 shadow-lg rounded-lg justify-center">
                <div className="text-xl h-28 text-green shadow-lg dark:text-white border-solid border-2 border-green p-2 py-4 rounded-lg text-center">
                    Do you want to benefit from floating kUSD rate
                    and help to peg kUSD to real dollar?
                </div>
                <div className="py-12 space-y-12 justify-center items-center">
                    <div className="flex items-center justify-center">
                        <TextField
                            error={!validEmail}
                            type="text"
                            value={email}
                            placeholder="example@gmail.com"
                            onChange={handleEmailInput}
                            sx={{ background: "#0E1012", borderRadius: "8px", input: { color: '#FFFFFF' } }}
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <Button
                            disabled={changeValidEmailInput()}
                            onClick={handleSubscription}
                            className="m-40 bg-gradient-to-r from-light-blue via-turquouse to-emerald p-2 text-white rounded-lg shadow-lg font-light"
                            sx={{ color: "white" }}
                        >
                            Subcribe to Rate notifications!
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mail;