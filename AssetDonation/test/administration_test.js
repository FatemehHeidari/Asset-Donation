
let BN = web3.utils.BN
let Administration = artifacts.require('DonateAsset')
let catchRevert = require("./exceptionsHelpers.js").catchRevert

contract('Administration', function (accounts) {

    const admin = accounts[0]
    const donor = accounts[1]

    it("should revert if approveDonor is called by a non admin role", async() =>{

        let instance = await Administration.deployed();
        const tx = await instance.addDonor( { from: donor })
        await catchRevert(instance.approveDonor(donor, { from: donor }))
    })
})
