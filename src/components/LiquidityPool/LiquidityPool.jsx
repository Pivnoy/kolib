import React from "react";
let kUSD = 213091;
function LiquidityPool(props) {

    const { balance } = props;

let classNameForPictures = 'mt-3 relative text-center uppercase text-grey bg-transparent rounded-lg h-28 w-64';
    return (
        <div>
            <div className="space-x-3 h-fit bg-transparent mx-w-5xl flex items-center justify-center">
                <div className={classNameForPictures}>
                    <img src="./PoolSizeBg.png" className="hidden dark:block rounded-lg" alt="Pool size"></img>
                    <img src="./1Group.png" className="dark:hidden shadow-lg rounded-lg" alt="Pool size"></img>
                    <div className="absolute inset-6">
                        <div className="font-light tracking-wide">Pool size</div>
                        <div className="font-light dark:text-white">{kUSD} kUSD</div>
                    </div>
                </div>
                <div className={classNameForPictures}>
                    <img src="./LiqRewardBg.png" className="hidden dark:block rounded-lg" alt="liquidation reward"></img>
                    <img src="./2Group.png" className="shadow-lg dark:hidden rounded-lg" alt="liquidation reward"></img>
                    <div className="absolute inset-6">
                        <div className="font-light tracking-wide">Liquidation reward</div>
                        <div className="font-light dark:text-white">18 %</div>
                    </div>
                </div>
                <div className={classNameForPictures}>
                    <img src="./LpTokensBg.png" className="hidden dark:block rounded-lg" alt="Lp Tokens total"></img>
                    <img src="./3Group.png" className="shadow-lg dark:hidden rounded-lg" alt="Lp Tokens total"></img>
                    <div className="absolute inset-6">
                        <div className="font-light tracking-wide">lp tokens total</div>
                        <div className="font-light dark:text-white">2 531 341, 41</div>
                    </div>
                </div>
                
            
                <div className="dark:text-white font-extralight items-center justify-center 
                text-center h-28 w-96 bg-white dark:bg-dark-grey p-4 shadow-lg rounded-lg">
                    <div className="text-light-grey uppercase tracking-wide">liq pool is currently disabled!</div>
                    <div>Liquidatable Ovens</div>
                    <div>Liquidations via the pool are currently disabled</div>
                </div>
           </div>
           

           <div className="space-x-5 mt-5 h-fit bg-transparent mx-w-full flex items-top justify-center">
                <div className="bg-white shadow-lg dark:bg-dark-grey h-fit w-fit p-6 rounded-lg items-center">
                    <div className="space-y-3 text-light-grey font-light border-solid border-2 border-grey h-fit w-fit rounded-lg p-2 py-4 text-center">
                        <div>1 QLkUSD is currently redeemable for 0.15 kUSD</div>
                        <div>Your 0.00 QLkUSD is ~0.00% of the total supply, entitling you to 0,00 kUSD if you redeem it right now.</div>
                    </div>
                    <div className="flex mt-8 space-x-6 pb-3">
                        <div className="relative bg-dark-white dark:bg-black border-transparent h-28 w-6/12 rounded-lg hover:border-green border-2">
                            <div className="text-light-grey absolute inset-3 font-light"> Deposit </div>
                            <div className="dark:text-white font-light absolute bottom-8 left-3 ">kUSD</div>
                            <input type="number"
                            placeholder="0.0"
                            className="absolute bottom-8 right-3 h-7 bg-transparent border-2 border-grey"
                            style={{border: "none", borderBottom: "2px solid #324054", outline: "0", color: "#FFFFFF"   }}
                            />
                        </div>
                        <div className="relative border-transparent bg-dark-white dark:bg-black h-28 w-6/12 rounded-lg hover:border-green border-2">
                            <div className="text-light-grey absolute inset-3 font-light"> Redeem </div>
                            <div className="dark:text-white font-light absolute bottom-8 left-3 ">QLkUSD</div>
                            <input type="number"
                            placeholder="0.0"
                            className="absolute bottom-8 right-3 h-7 bg-transparent border-2 border-grey"
                            style={{border: "none", borderBottom: "2px solid #324054", outline: "0", color: "#FFFFFF"}}
                            />
                        </div>
                    </div>
                </div>
                
                <div className="space-y-3">
                    <div className="shadow-lg bg-transparent mr-2">
                        <div className="relative ">
                            <img src="./Learn_more.png" className="hidden dark:block" alt="Learn more"/>
                            <img src="./LearnLmore.png" className="dark:hidden" alt="Learn more"/>
                            <button className="absolute top-12 right-9 border-2 rounded-lg border-green p-2 text-green"
                            >
                                Learn more
                            </button>
                        </div>

                    </div>
                    <div className="bg-white shadow-lg dark:bg-dark-grey mr-2 py-4 px-6 rounded-lg w-fit h-fit ">
                        <div className="dark:text-white font-light space-y-1">
                            <div 
                                style={{ background: 'linear-gradient(to right, transparent 50%, rgba(37, 137, 145, 20%) 50%)' }} 
                                className="justify-between rounded-lg flex p-3 h-auto w-80 border-solid border-2 border-grey"
                            >
                                <div>Tezos Holdings</div>
                                <div>{balance.xtzBalance} XTZ</div>
                            </div>
                            <div 
                                style={{ background: 'linear-gradient(to right, transparent 50%, rgba(37, 137, 145, 20%) 50%)' }}
                                className="justify-between flex p-3 h-auto w-auto border-solid border-2 border-grey rounded-lg"
                            >
                                <div>kUSD Holdings</div>
                                <div>{balance.kolibriBalance} kUSD</div>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
           
           
        </div>
    )
}

export default LiquidityPool;