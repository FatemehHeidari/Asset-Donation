// var AssetDonation = artifacts.require('./AssetDonation.sol');

// module.exports = function(deployer) {
//     deployer.deploy(AssetDonation);
// };

var DonateAsset = artifacts.require('./DonateAsset.sol');
var ReceiveAsset = artifacts.require('./ReceiveAsset.sol');

module.exports = async function (deployer) {
    deployer.deploy(DonateAsset).then(() => { return deployer.deploy(ReceiveAsset, DonateAsset.address); })
};