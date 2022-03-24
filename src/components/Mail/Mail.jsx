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
        <div className="h-fit bg-transparent flex items-center justify-center">
            <div className="ml-10 h-96 w-96 bg-dark-grey p-8 shadow-lg rounded-lg justify-center">
                <div className="text-xl h-28 text-white border-solid border-2 border-green p-2 py-4 rounded-lg text-center">
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
                            sx={{background:"#0E1012", borderRadius: "8px", input: { color: '#FFFFFF' } }} 
                        />
                    </div>
                    <div className="flex items-center justify-center"> 
                        <Button
                            disabled={changeValidEmailInput()}
                            onClick={handleSubscription}
                            sx={{background: "linear-gradient(#258991, #298B93, #00717A)", color: "#FFFFFF"}}
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