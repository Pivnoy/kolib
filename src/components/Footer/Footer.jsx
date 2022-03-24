
import React from "react"
import { InputAdornment,FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


function Footer(props) {

    
    const [age, setAge] = React.useState('');

    const { TESTNET, handleChangeTESTNET } = props;
  
    const handleChange = (event) => {
      setAge(event.target.value);
    };
    return (
        <div className="absolute bottom-0 p-4 h-24 w-full bg-transparent border-2 rounded-lg shadow dark:bg-white"
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
                <div className="mr-32 relative inline-block hover:block hover:stroke-white">


                  {/* button */}
                  <div className="flex p-2 text-green border-2 border-solid border-green rounded-lg w-36 justify-between items-center">
                      <div>TESTNET</div>
                      <ArrowForwardIosIcon
                    className="text-green"
                    style={{marginRight: "2px", height: "20px", width: "20px", background: "transparent", transform: "rotate(270deg)", color: "#258991" }}
                    >
                    </ArrowForwardIosIcon>
                  </div>
                  {/* menu */}
                  <div 
                  className="absolute p-1 py-1 text-white space-y-1 rounded-lg bg-gradient-to-r from-light-blue via-turquouse to-emerald border-1 w-36 hover:block"
                  style={{bottom: "50px", zIndex: "1"}}
                  onChange={handleChangeTESTNET}
                  value={TESTNET}
                  >
                    <div value={false}>MAINNET</div>
                    <div style={{ border: "none", borderBottom: "2px solid #FFFFFF", outline: "0" }}></div>
                    <div value = {true}>TESTNET</div>

                  </div>

              
                </div>
            </div>
           
           {/* <InputAdornment
                    position="start">
                    <Select
                      variant="standard"
                      style={{width:"120px", background: "#321421", color: "#FFFFFF", padding: "10px", }}
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
    )
}
export default Footer;