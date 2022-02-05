
let BN = web3.utils.BN
let AccessControlList = artifacts.require('AccessControlList')
let catchRevert = require("./exceptionsHelpers.js").catchRevert

contract('AccessControlList', function (accounts) {

    const admin = accounts[0];
    const donor = accounts[1];
    const other = accounts[2];
    const receiver = accounts[3];

    it("add role", async() =>{

        let instance = await AccessControlList.deployed();
        const tx = await instance.addRole( "DONOR");

        const result = await instance.getRole.call("DONOR");

        assert.equal(result, '0x7220c8c83db3df705edc2f907812addbce8b70b5f7208909f67735d3cf5ad727', 'add role')
    })

    it("add policy", async() =>{

        let instance = await AccessControlList.deployed();
        const tx = await instance.addPolicy(
            1,
            "DONOR",
            1
        );

        const result = await instance.getPolicy.call(1,"DONOR");

        assert.equal(result, 1, 'add policy')
    })
})
