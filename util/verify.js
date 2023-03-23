const { run } = require("hardhat") //importing the run task from the hardhat package.

const verify = async function (contractAddress, args) {
    console.log("verifying the contract...")
    try {
        //running the verify task with the contract address and the args.
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
        } else {
            console.log(e)
        }
    }
}


module.exports = {verify}