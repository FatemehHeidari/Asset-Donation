# Decentralized Asset Donation
Tradittional donations are base on money donation, in ethereum blockchain based Dapps based on ethers or other tokens. In this DApp a platform in developed to let you tokenize your physical assets and donate them to whom they may require them. 
It is based on two ideas of donation:
1. Donation of assets from a donor to an individual.
2. Fund and Asset raising from donors for projects which can be defined in this platform.


## developement
The smart contracts are build using truffle and tested locally using ganache-cli. The project is also deployed on rinkedby testnet. The front end is developed using React.js.

IPFS is also used to store image files related to donated assets.

## test DApp on reinkedby
it is assumed that you have nodejs and yarn installed. You also need to have metamask extension added to your chrome beowser.

The next steps will be:
1. Clone project
2. yarn in main directory will install all dependencies
```
yarn
```
3. yarn start will run DApp http://localhost:3000/
```
yarn start
```
If you are going to redeploy the contracts to testtnet you can use:
```
truffle migrate --reset --network rinkeby
```
## test locally using ganache
You need to install truffle and ganache and truffle hdwallet-provider to compile, migrate, and test smart contracts locally.
In a command line window run: ganache-cli
Move to another command line window.
In AssetDonation sub-directory:
```
1. truffle compile
```
```
2. truffle migrate
```
```
3. truffle console
```
```
4. truffle test
```

## Used libraries and additional services
1. ERC721 from openzeppeline is used to control the ownership and safe transfer of assets
2. IPFS used for saving image files and theIPFS hash of images saved on blockchain
