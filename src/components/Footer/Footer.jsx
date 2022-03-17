
import React from "react"

function Footer() {

    return (
        <footer className="absolute inset-x-0 bottom-0  p-4 bg-transparent rounded-lg shadow dark:bg-gray-800">
            <div className="sm:flex sm:items-center sm:justify-between">
                
                <a href="#" className="flex items-center mb-4 sm:mb-0">
                    
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
                
                {/* place changenet here */}
                {/* <InputAdornment
                    position="start">
                    <Select
                      variant="standard"
                      style={{ color: "white" }}
                      onChange={handleChangeTESTNET}
                      value={TESTNET}
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
           
            
        </footer> 
    )
}

export default Footer;