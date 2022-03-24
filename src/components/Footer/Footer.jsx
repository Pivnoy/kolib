
import React from "react"
import { InputAdornment,FormControl, InputLabel, MenuItem, Select } from "@mui/material";
let x = 0;

function Footer() {

    
    const [age, setAge] = React.useState('');
  
    const handleChange = (event) => {
      setAge(event.target.value);
    };
    return (
        <div className="absolute bottom-0 p-4 h-20 w-full bg-transparent border-2 rounded-lg shadow dark:bg-white"
        style={{border: "none", borderTop: "1px solid #324054" }}>

            <div className="flex justify-between">
              <div>
                <a href="#" className="font-light flex ml-20 mt-2 items-center mb-4 sm:mb-0">
                    
                </a>
                <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6 ">Hover Labs</a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="mr-4 hover:underline md:mr-6 ">Terms of Service</a>
                    </li>
                </ul>
              </div>
                {/* place changenet here */}
                <div className="mr-32 relative inline-block">
                  <div className="p-2 text-green border-2 border-solid border-green rounded-lg w-32 justify-center items-center">TESTNET</div>
                  <div className="flex hidden hover:block p-1 rounded-lg bg-gradient-to-r from-light-blue via-turquouse to-emerald border-1 absolute top-0 bg-white w-32">
                    <div>MAINNET</div>
                    <div>TESTNET</div>

                  </div>


                
                
                
                
                {/* <InputAdornment
                    position="start">
                    <Select
                      variant="standard"
                      style={{ color: "white" }}
                      onChange={x}
                      value = {x}
                      // onChange={handleChangeTESTNET}
                      // value={TESTNET}
                    >
                      <MenuItem
                        value={false}>
                        MAINNET
                      </MenuItem>
                      <MenuItem
                        value={true}>
                        TESTNET
                      </MenuItem>
                    </Select>
                  </InputAdornment> */}
              </div>
            </div>
           
            
        </div> 
    )
}
export default Footer;