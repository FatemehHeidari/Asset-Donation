
let BN = web3.utils.BN
let DonateAsset = artifacts.require('DonateAsset')
let ReceiveAsset = artifacts.require('ReceiveAsset')
let catchRevert = require("./exceptionsHelpers.js").catchRevert

contract('donationTest', function (accounts) {

    const admin = accounts[0]
    const donor = accounts[1]
    const receiver = accounts[2]
    const other = accounts[3]
    const emptyAddress = '0x0000000000000000000000000000000000000000'

    const des = "RV"
    const availablitydate = 3545435445;
    const loc = "albuquerque";
    const ipfsHash = "QmdBC2po8FGwh4niygC8i4NfpVXAiPY6Ei2eisNy76ThaW";



    it("should revert if pause is called by a non admin role", async() =>{

        let instanceDonate = await DonateAsset.deployed();
        await catchRevert(instanceDonate.pause({ from: other }))
    })
    
    it("should revert if addAsset is called in paused situation", async() =>{
        let instanceDonate = await DonateAsset.deployed();
        const tx = await instanceDonate.addDonor({ from: donor });
        const tx1 = await instanceDonate.approveDonor(donor,{ from: admin });
        const t2 = await instanceDonate.addDonor( { from: donor })
        const t3 = await instanceDonate.pause( { from: admin })
        await catchRevert(instanceDonate.addAsset(des, availablitydate, loc, ipfsHash, { from: donor }))
        const t4 = await instanceDonate.unpause( { from: admin })
    })

    it("add an asset", async () => {
        let instanceDonate = await DonateAsset.deployed();
        //const tx = await instanceDonate.addDonor({ from: donor });
        //const tx1 = await instanceDonate.approveDonor(donor,{ from: admin });
        // let instance = await DonateAsset.deployed();
        const tx2 = await instanceDonate.addAsset(des, availablitydate, loc, ipfsHash, { from: donor })

        const result = await instanceDonate.getDonation.call(0)

        assert.equal(result.assetDescription, des, 'asset description is not saved properly')
        assert.equal(result.availablityDate, availablitydate, 'availablitydate is not saved properly')
        assert.equal(result.location, loc, 'location is not saved properly')
        assert.equal(result.status, 0, 'the status should be Free')
        assert.equal(result.owner, donor, 'the owner of asset should be equal to donor')
        assert.equal(result.recipient, emptyAddress, 'the receiver address should be empty')
        assert.equal(result.imageIPFSHash, ipfsHash, 'the stored ipfs Hash should be equal to ipfsHash')
    })

    it("emit LogFree event when an asset is added", async()=> {
        let eventEmitted = false
        let instanceDonate = await DonateAsset.deployed();
        const tx = await instanceDonate.addAsset(des, availablitydate, loc,ipfsHash,{from: donor})

        if (tx.logs[1].event == "LogFree") {
            eventEmitted = true
        }

        assert.equal(eventEmitted, true, 'adding an asset should emit a Free event')
    })

    const requestDescription = 'Request 0 Asset 0';
    const requestDateFrom = 12345678;
    const requestDateTo = 12345789;

    it("request an asset", async () => {
        //let instance = await DonateAsset.deployed();
        //let instanceReceive = await ReceiveAsset.deployed(instance.address);
        let instanceDonate = await DonateAsset.deployed();
        //const tx = await instanceDonate.addDonor({ from: donor });
        //const tx1 = await instanceDonate.approveDonor(donor,{ from: admin });
        let instanceReceive = await ReceiveAsset.deployed(instanceDonate.address);
        //const tx2 = await instanceReceive.addReceiver({ from: receiver });
        //const tx3 = await instanceReceive.approveReceiver(receiver,{  from: admin });
        const tx4 = await instanceDonate.addAsset(des, availablitydate, loc, ipfsHash, { from: donor })
        const tx5 = await instanceReceive.requestAsset(0, requestDescription,
            requestDateFrom,
            requestDateTo, { from: receiver })

        const resultAsset = await instanceDonate.getDonation.call(0)
        const result = await instanceReceive.getRequest.call(0,0)

        assert.equal(result[0], receiver, 'receiver is not saved properly')
        assert.equal(result[1], requestDescription, 'requestDescription is not saved properly')
        assert.equal(result[2].toString(10), requestDateFrom, 'requestDateFrom is not saved properly')
        assert.equal(result[3].toString(10), requestDateTo, 'requestDateTo is not saved properly')
        assert.equal(resultAsset.status, 1, 'the status should be Requested')
        assert.equal(resultAsset.requestCount, 1, 'the status should be Requested')
    })

    it("request asset emitts LogRequested", async () => {
        let eventEmitted = false
        let instanceDonate = await DonateAsset.deployed();
        let instanceReceive = await ReceiveAsset.deployed(instanceDonate.address);
        const tx4 = await instanceDonate.addAsset(des, availablitydate, loc, ipfsHash, { from: donor })
        const tx5 = await instanceReceive.requestAsset(0, requestDescription,
            requestDateFrom,
            requestDateTo, { from: receiver })
            
            if (tx5.logs[0].event == "LogRequested") {
                eventEmitted = true
            }
    
            assert.equal(eventEmitted, true, 'request asset should emit a Requested event')            
    })    

    it("should revert if donateAsset is not called by owner", async () => {
        let instanceDonate = await DonateAsset.deployed();
        const tx = await instanceDonate.addDonor({ from: donor });
        const tx1 = await instanceDonate.approveDonor(donor,{ from: admin });
        //let instance = await DonateAsset.deployed();
        const tx2 = await instanceDonate.addAsset(des, availablitydate, loc, ipfsHash, { from: donor })

        await catchRevert(instanceDonate.donateAsset(0,receiver, { from: other }))
        
    })

    it("donate an asset", async () => {
        let instanceDonate = await DonateAsset.deployed();
        //const tx = await instanceDonate.addDonor({ from: donor });
        //const tx1 = await instanceDonate.approveDonor(donor,{ from: admin });
        //let instance = await DonateAsset.deployed();
        const tx2 = await instanceDonate.addAsset(des, availablitydate, loc, ipfsHash, { from: donor })

        const tx3 = await instanceDonate.donateAsset(0,receiver, { from: donor })
        
        const resultAsset = await instanceDonate.getDonation.call(0)

        assert.equal(resultAsset.status, 2, 'the status should be Donated')
        assert.equal(resultAsset.recipient, receiver, 'the recipient address should be updated to receiver')
    })

    it("donate asset emitts LogDonated", async () => {
        let eventEmitted = false
        let instanceDonate = await DonateAsset.deployed();
        //const tx = await instanceDonate.addDonor({ from: donor });
        //const tx1 = await instanceDonate.approveDonor(donor,{ from: admin });
        //let instance = await DonateAsset.deployed();
        const tx = await instanceDonate.addAsset(des, availablitydate, loc, ipfsHash, { from: donor })

        const tx1 = await instanceDonate.donateAsset(1,receiver, { from: donor })
        if (tx1.logs[0].event == "LogDonated") {
            eventEmitted = true
        }

        assert.equal(eventEmitted, true, 'donate asset should emit a LogDonated event')            

    })



    // it("should allow someone to purchase an item and update state accordingly", async() => {

    //     await instance.addItem(name, price, {from: alice})
    //     var aliceBalanceBefore = await web3.eth.getBalance(alice)
    //     var bobBalanceBefore = await web3.eth.getBalance(bob)

    //     await instance.buyItem(0, {from: bob, value: excessAmount})

    //     var aliceBalanceAfter = await web3.eth.getBalance(alice)
    //     var bobBalanceAfter = await web3.eth.getBalance(bob)

    //     const result = await instance.fetchItem.call(0)

    //     assert.equal(result[3].toString(10), 1, 'the state of the item should be "Sold", which should be declared second in the State Enum')
    //     assert.equal(result[5], bob, 'the buyer address should be set bob when he purchases an item')
    //     assert.equal(new BN(aliceBalanceAfter).toString(), new BN(aliceBalanceBefore).add(new BN(price)).toString(), "alice's balance should be increased by the price of the item")
    //     assert.isBelow(Number(bobBalanceAfter), Number(new BN(bobBalanceBefore).sub(new BN(price))), "bob's balance should be reduced by more than the price of the item (including gas costs)")
    // })

    // it("should error when not enough value is sent when purchasing an item", async()=>{
    //     await instance.addItem(name, price, {from: alice})
    //     await catchRevert(instance.buyItem(0, {from: bob, value: 1}))
    // })

    // it("should emit LogSold event when and item is purchased", async()=>{
    //     var eventEmitted = false

    //     await instance.addItem(name, price, {from: alice})
    //     const tx = await instance.buyItem(0, {from: bob, value: excessAmount})

    //     if (tx.logs[0].event == "LogSold") {
    //         eventEmitted = true
    //     }

    //     assert.equal(eventEmitted, true, 'adding an item should emit a Sold event')
    // })

    // it("should revert when someone that is not the seller tries to call shipItem()", async()=>{
    //     await instance.addItem(name, price, {from: alice})
    //     await instance.buyItem(0, {from: bob, value: price})
    //     await catchRevert(instance.shipItem(0, {from: bob}))
    // })

    // it("should allow the seller to mark the item as shipped", async() => {

    //     await instance.addItem(name, price, {from: alice})
    //     await instance.buyItem(0, {from: bob, value: excessAmount})
    //     await instance.shipItem(0, {from: alice})

    //     const result = await instance.fetchItem.call(0)

    //     assert.equal(result[3].toString(10), 2, 'the state of the item should be "Shipped", which should be declared third in the State Enum')
    // })

    // it("should emit a LogShipped event when an item is shipped", async() => {
    //     var eventEmitted = false

    //     await instance.addItem(name, price, {from: alice})
    //     await instance.buyItem(0, {from: bob, value: excessAmount})
    //     const tx = await instance.shipItem(0, {from: alice})

    //     if (tx.logs[0].event == "LogShipped") {
    //         eventEmitted = true
    //     }

    //     assert.equal(eventEmitted, true, 'adding an item should emit a Shipped event')
    // })

    // it("should allow the buyer to mark the item as received", async() => {
    //     await instance.addItem(name, price, {from: alice})
    //     await instance.buyItem(0, {from: bob, value: excessAmount})
    //     await instance.shipItem(0, {from: alice})
    //     await instance.receiveItem(0, {from: bob})

    //     const result = await instance.fetchItem.call(0)

    //     assert.equal(result[3].toString(10), 3, 'the state of the item should be "Received", which should be declared fourth in the State Enum')
    // })

    // it("should revert if an address other than the buyer calls receiveItem()", async() =>{
    //     await instance.addItem(name, price, {from: alice})
    //     await instance.buyItem(0, {from: bob, value: excessAmount})
    //     await instance.shipItem(0, {from: alice})

    //     await catchRevert(instance.receiveItem(0, {from: alice}))
    // })

    // it("should emit a LogReceived event when an item is received", async() => {
    //     var eventEmitted = false

    //     await instance.addItem(name, price, {from: alice})
    //     await instance.buyItem(0, {from: bob, value: excessAmount})
    //     await instance.shipItem(0, {from: alice})
    //     const tx = await instance.receiveItem(0, {from: bob})

    //     if (tx.logs[0].event == "LogReceived") {
    //         eventEmitted = true
    //     }

    //     assert.equal(eventEmitted, true, 'adding an item should emit a Shipped event')
    // })

})
