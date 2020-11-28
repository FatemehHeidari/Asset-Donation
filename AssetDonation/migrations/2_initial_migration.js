var AssetDonation = artifacts.require('./AssetDonation.sol');

module.exports = function(deployer) {
    deployer.deploy(AssetDonation);
};