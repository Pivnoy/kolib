import { Button, TextField } from "@mui/material";
import validator from 'validator'
import React, {useState} from "react";

function Mail() {

    const serverAddress = "http://localhost:8239/mail";

    const [validEmail, setValidEmail] = useState(true);

    const [email, setEmail] = useState(null);

    const handleEmailInput = (e) => {
        const email_add = e.target.value;
        setEmail(email_add);
        setValidEmail(validator.isEmail(email_add));
    }

    const handleSubscription = async () => {
        fetch(serverAddress, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({mail: email})
        }).then(resp => {console.log(resp)});
    }

    const changeValidEmailInput = () => {
        if (!email) {
            return true;
        }
        if (!validEmail) {
            return true;
        }
        if (email == "") {
            return true;
        }
        return false;
    }

    return (
        <div>
            <div
                className="bg-green"    
            >
                Do you want to benefit from floating kUSD rate 
                and help to peg kUSD to real dollar?
            </div>
            <TextField
                error={!validEmail}
                type="text"
                value={email}
                placeholder="example@gmail.com"
                onChange={handleEmailInput}
            />
            <Button
                disabled={changeValidEmailInput()}
                onClick={handleSubscription}
            >
                Subcribe to Rate notifications!
            </Button>
        </div>
    )
}

export default Mail;