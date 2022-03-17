import React from "react";
let kUSD = 213091238;
function LiquidityPool() {
    
    return (
        <div>
            <div className=" h-fit bg-transparent mx-w-5xl flex items-center justify-center">
                
                    <div className="uppercase text-grey bg-dark-grey rounded-lg h-24 w-36">
                        <img src="./PoolSizeBg.png" className="rounded-lg" alt="Pool size"></img>
                            <div className="">Pool size</div>
                            <div className="">{kUSD}</div>
                        </div>
                    <div className="uppercase text-grey bg-dark-grey rounded-lg h-fit w-fit">
                        <img src="./LiqRewardBg.png" className="rounded-lg" alt="liquidation reward"></img><div className="absolute">Liquidation reward</div>
                            </div>
                    <div className="uppercase text-grey bg-dark-grey rounded-lg h-fit w-fit">
                        <img src="./LpTokensBg.png" className="rounded-lg" alt="Lp Tokens total"></img>lp tokens total</div>
                
                <div className="insert-0 top-10 m-10 mr-20 h-fit w-96 bg-dark-grey p-8 shadow-lg rounded-lg"></div>
           </div>
           <div className="flex">
                <div className="grid-cols-3 insert-0 top-10 pl-4 m-10 ml-20 h-fit w-6/12 bg-dark-grey p-8 shadow-lg rounded-lg flex items-center justify-between"></div>
                <div>
                <div className="grid-cols-3 insert-0 top-10 pl-4 m-10 ml-20 h-fit w-6/12 bg-dark-grey p-8 shadow-lg rounded-lg flex items-center justify-between"></div>
                <div className="grid-cols-3 insert-0 top-10 pl-4 m-10 ml-20 h-fit w-6/12 bg-dark-grey p-8 shadow-lg rounded-lg flex items-center justify-between"></div>
           </div>
           </div>
           
           
        </div>
    )
}

export default LiquidityPool;