var Administration = artifacts.require('./Administration.sol');

module.exports = async function (deployer) {
    deployer.deploy(Administration);
};