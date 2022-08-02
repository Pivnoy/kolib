
import React from "react"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';


function Footer(props) {

  // eslint-disable-next-line
  const { TESTNET, handleChangeTESTNET } = props;

  return (
    <div
      className="absolute bottom-0 p-4 h-18 w-full bg-transparent border-2 rounded-lg shadow bg-transparent hidden sm:block "
      style={{ border: "none", borderTop: "1px solid #324054" }}
    >
      <div className="flex justify-between ml-20">
        <div>
          <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400">
            <li>
              <a href="https://hover.engineering/" className="mr-4 hover:underline md:mr-6 ">Hover Labs</a>
            </li>
            <li>
              <a href="https://kolibri.finance/privacy-policy"
                className="mr-4 hover:underline md:mr-6">Privacy Policy</a>
            </li>
            <li>
              <a href="https://kolibri.finance/terms-of-service"
                className="mr-4 hover:underline md:mr-6">
                Terms of Service</a>
            </li>
            <li>
              <a href="https://t.me/tiredofbeeing"
                className="mr-4 hover:underline md:mr-6">
                Levaki</a>
            </li>
          </ul>
        </div>

        {/* place changenet here */}
        <div className="mr-32 relative inline-block hover:block hover:stroke-white">
          <button className="flex p-2 text-green border-2 border-solid border-green rounded-lg w-36 justify-between items-center">
            <div>TESTNET</div>
            <ArrowForwardIosIcon
              className="text-green"
              style={{ marginRight: "2px", height: "20px", width: "20px", background: "transparent", transform: "rotate(270deg)", color: "#258991" }}
            >
            </ArrowForwardIosIcon>
          </button>

          {/* menu */}

          <div
            className="absolute p-1 py-1 text-white space-y-1 rounded-lg bg-gradient-to-r from-light-blue via-turquouse to-emerald border-1 w-36 hover:block"
            style={{ bottom: "50px", zIndex: "1" }}
            onChange={handleChangeTESTNET}
            value={TESTNET}
          >
            <div value={false}>MAINNET</div>
            <div style={{ border: "none", borderBottom: "2px solid #FFFFFF", outline: "0" }}></div>
            <div value={true}>TESTNET</div>

          </div>


        </div>
      </div>

      {/* <InputAdornment
        position="start">
        <Select
          variant="standard"
          style={{ width: "120px", background: "#321421", color: "#FFFFFF", padding: "10px", }}
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