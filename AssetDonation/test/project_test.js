
let BN = web3.utils.BN
let ProjectFactory = artifacts.require('ProjectFactory')
let catchRevert = require("./exceptionsHelpers.js").catchRevert

contract('ProjectFactory', function (accounts) {

    const admin = accounts[0];
    const projectOwner = accounts[1];
    const other = accounts[2];
    const initialBalance = 10;
    const projectDescription = "Desc";
    const projectTitle = "Title";
    const projectKickOffTime = 12345678;
    const projectKickOffMinBalance = 10;

    // it("add new project", async() =>{

    //     let instance = await ProjectFactory.deployed();
    //     const tx = await instance.createProject(projectDescription,projectTitle,projectKickOffTime,projectKickOffMinBalance,{from:projectOwner,value:initialBalance});
    //     const tx1 = await instance.createProject(projectDescription,projectTitle,projectKickOffTime,projectKickOffMinBalance,{from:projectOwner,value:initialBalance});
    //     const result = await instance.getProjects();
    //     assert.equal(result.length, 3, 'update projects array appropriately')
    //     //await catchRevert(instance.approveDonor(donor, { from: other }))
    // })


    it("add new project", async() =>{

        let instance = await ProjectFactory.deployed();
        const tx = await instance.createProject(projectDescription,projectTitle,projectKickOffTime,projectKickOffMinBalance,{from:projectOwner,value:initialBalance});
        const tx1 = await instance.createProject(projectDescription,projectTitle,projectKickOffTime,projectKickOffMinBalance,{from:projectOwner,value:initialBalance});
        const result = await instance.getProject(0);
        assert.equal(result[0], projectTitle, 'return project data')
        //await catchRevert(instance.approveDonor(donor, { from: other }))
    })    

    it("transfer ether", async () => {

        let instance = await ProjectFactory.deployed();
        const result = await instance.donateToProject(0, { from: other, value: 10 });
        const result1 = await instance.getProjectBalance(0, { from: other });
        assert.equal(result1, 10, 'return project data')
        //await catchRevert(instance.approveDonor(donor, { from: other }))
    })
    it("get list", async () => {

        let instance = await ProjectFactory.deployed();
        const result = await instance.donateToProject(0, { from: other, value: 10 });
        const result1 = await instance.getProjects({ from: other });
        assert.equal(result1.length, 8, 'return project data')
        //await catchRevert(instance.approveDonor(donor, { from: other }))
    })    
})
