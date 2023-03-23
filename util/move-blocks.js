const { network } = require("hardhat")

//This is how we sleep in JS
function sleep(timeInMs){
    //in order to wait for some time we have to use promises
    return new Promise((resolve)=>{
        setTimeout(resolve, timeInMs)
    })
}

async function moveBlocks(amount, sleepAmount=0){
     console.log("Moving Blocks...")
     for(let index=0;index<amount; index++){
        await network.provider.request({
            method: "evm_mine",
            params: []
        })
        if(sleepAmount > 0){
            console.log(`Sleeping for ${sleepAmount}ms`)
            await sleep(sleepAmount)
        }
     }
}

module.exports = { moveBlocks, sleep } 