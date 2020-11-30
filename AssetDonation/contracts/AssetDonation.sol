// SPDX-License-Identifier: MIT
pragma solidity ^0.6.2;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract AssetDonation is ERC721, AccessControl {


    uint256 lastAssetId;
    uint256 lastRequestId;
    uint constant maxNoOfReqsPerAsst = 3;

    mapping (address=>bool) public donors;
    mapping (address=>bool) public receivers;


    constructor() ERC721("MyToken","MTS") AccessControl() public {
      lastAssetId = 0;
      lastRequestId = 0;
    }



    bytes32 public constant DONOR = keccak256("DONOR");
    bytes32 public constant RECEIVER = keccak256("RECEIVER");

    enum Status {Free, Donated, Inactive, Burned}

    // struct AssetType{
    //   string assetType;
    // }

    struct Asset {
        string assetDescription;
        uint256 availablityDate;
        string location;
        Status status;
        address owner;
        address recipient;
        uint256 donatedDateFrom;
        uint256 donatedDateTo;
        address[maxNoOfReqsPerAsst] requestList;
        uint requestCount;
        //   AssetType assetType;
    }
    
    mapping(uint256 => Asset) public donationList;

    modifier isDonor(address donorAddress) {
        require(hasRole(DONOR, donorAddress));
        _;
    }

    function addDonor() public {
        donors[msg.sender] = false;
        approveDonor(msg.sender);
    }

    function approveDonor(address donorAddress) public {
        grantRole(DONOR, donorAddress);
        donors[donorAddress] = true;
    }

    function addAsset(
        string memory assetDescription,
        uint256 availablityDate,
        string memory location
    ) public /*isDonor(msg.sender)*/ {
        address[maxNoOfReqsPerAsst] memory requests;
        uint256 assetId = mintToken(msg.sender);
        donationList[assetId] = Asset({
            assetDescription: assetDescription,
            availablityDate: availablityDate,
            location: location,
            status: Status.Free,
            owner: msg.sender,
            recipient: address(0),
            donatedDateFrom: 0,
            donatedDateTo: 0,
            requestList: requests,
            requestCount:0
        });
    }

    function getDonations() public view returns (Asset[16] memory) {
        uint tokenCount = balanceOf(msg.sender);
        uint index = 0;
        uint tokenId;
        Asset[16] memory assetList;
        if(tokenCount <= 16){
            index = tokenCount;
        }
        else{
            index = 16;
        }
        for(uint i = 0; i < index; i++){
            tokenId = tokenOfOwnerByIndex(msg.sender,i);
            assetList[i]=donationList[tokenId];
        } 
        return assetList;
    }

    function mintToken(address assetOwner) public returns (uint256) {
        _safeMint(assetOwner, lastAssetId);
        return lastAssetId++;
    }

    modifier assetIsFree(uint tokenId){
      require(donationList[tokenId].recipient == address(0));
      _;
    }

    function donateAsset(uint tokenId,address recipientAddress)/*isDonor(msg.sender) isRequester(recipientAddress)*/ assetIsFree(tokenId)  public{
      donationList[tokenId].recipient = recipientAddress;
    }

    function addReceiver() public {
        receivers[msg.sender] = false;
    }

    function approveReceiver(address receiverAddress) public {
        grantRole(RECEIVER, receiverAddress);
        receivers[receiverAddress] = true;
    }

    function requestAsset(address receiver, uint assetId) public{
        Asset storage requestedItem = donationList[assetId];
        if(requestedItem.requestCount<maxNoOfReqsPerAsst)
        {
            requestedItem.requestList[requestedItem.requestCount] = receiver;
            requestedItem.requestCount++;
        }
    }

    // function addAsset(address assetOwner, string memory ownerName,AssetType memory assetType) isDonor public{
    //   _safeMint(assetOwner, lastAssetId);
    //   donationList[lastAssetId]=Asset({ownerName:ownerName,status:Status.Free,recipient:address(0),assetType:assetType});
    //   lastAssetId ++;
    // }

    // struct AssetRequest{
    //   address recipient;
    //   AssetType assetType;
    // }

    // mapping (uint => AssetRequest) public requestList;


    // modifier isRecipient(address recipientAddress){
    //   _;
    // }
    // modifier isDonor(address donorAddress){
    //   _;
    // }


    // function requestAsset(address recipientAddress, AssetType memory assetType) isRecipient public{
    //   requestList[lastRequestId] = AssetRequest({recipientAddress:recipientAddress,assetType:assetType});
    // }

}
