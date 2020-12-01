// SPDX-License-Identifier: MIT
pragma solidity ^0.6.2;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract AssetDonation is ERC721, AccessControl {
    uint256 lastAssetId;
    uint256 lastRequestId;
    uint256 constant maxNoOfReqsPerAsst = 3;

    mapping(address => bool) public donors;
    mapping(address => bool) public receivers;

    constructor() public ERC721("MyToken", "MTS") AccessControl() {
        lastAssetId = 0;
        lastRequestId = 0;
    }

    bytes32 public constant DONOR = keccak256("DONOR");
    bytes32 public constant RECEIVER = keccak256("RECEIVER");

    enum Status {Free, Requested, Donated, Inactive, Burned}

    // struct AssetType{
    //   string assetType;
    // }

    struct Asset {
        uint assetId; 
        string assetDescription;
        uint256 availablityDate;
        string location;
        Status status;
        address owner;
        address recipient;
        uint256 donatedDateFrom;
        uint256 donatedDateTo;
        //mapping (uint=>Request) requestList;
        //Request[maxNoOfReqsPerAsst] requestList;
        uint256 requestCount;
        //   AssetType assetType;
    }

    mapping(uint256 => Asset) public donationList;

    struct Request {
        address receiver;
        string requestDescription;
        uint256 requestDateFrom;
        uint256 requestDateTo;
        //   AssetType assetType;
    }
    mapping(uint256 => mapping(uint256 => Request)) public assetRequestList;

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
        string memory location /*isDonor(msg.sender)*/
    ) public {
        //Request[maxNoOfReqsPerAsst] storage requests;
        //mapping(uint=>Request) memory
        uint256 assetId = mintToken(msg.sender);
        donationList[assetId] = Asset({
            assetId:assetId,
            assetDescription: assetDescription,
            availablityDate: availablityDate,
            location: location,
            status: Status.Free,
            owner: msg.sender,
            recipient: address(0),
            donatedDateFrom: 0,
            donatedDateTo: 0, //requestList: requests,
            requestCount: 0
        });
    }

    function getDonations() public view returns (Asset[16] memory) {
        uint256 tokenCount = balanceOf(msg.sender);
        uint256 index = 0;
        uint256 tokenId;
        Asset[16] memory assetList;
        if (tokenCount <= 16) {
            index = tokenCount;
        } else {
            index = 16;
        }
        for (uint256 i = 0; i < index; i++) {
            tokenId = tokenOfOwnerByIndex(msg.sender, i);
            assetList[i] = donationList[tokenId];
        }
        return assetList;
    }

    function getAllDonations() public view returns (Asset[16] memory) {
        uint256 index = 0;
        Asset[16] memory assetList;
        if (lastAssetId <= 16) {
            index = lastAssetId;
        } else {
            index = 16;
        }
        for (uint256 i = 0; i < index; i++) {
            assetList[i] = donationList[i];
        }
        return assetList;
    }

    function getDonationRequests(uint256 assetId)
        public
        view
        returns (Request[16] memory)
    {
        Request[16] memory requestArray;


            mapping(uint256 => Request) storage requestMapping
         = assetRequestList[assetId];
        for (uint256 i = 0; i < donationList[assetId].requestCount; i++) {
            requestArray[i] = requestMapping[i];
        }
        return requestArray;
    }

    function mintToken(address assetOwner) public returns (uint256) {
        _safeMint(assetOwner, lastAssetId);
        return lastAssetId++;
    }

    modifier assetIsFree(uint256 assetId) {
        require(donationList[assetId].recipient == address(0));
        _;
    }

    function donateAsset(uint256 assetId, address recipientAddress)
        public
        /*isDonor(msg.sender) isRequester(recipientAddress)*/
        assetIsFree(assetId)
    {
        donationList[assetId].recipient = recipientAddress;
        donationList[assetId].status = Status.Donated;
    }

    function addReceiver() public {
        receivers[msg.sender] = false;
    }

    function approveReceiver(address receiverAddress) public {
        grantRole(RECEIVER, receiverAddress);
        receivers[receiverAddress] = true;
    }

    function requestAsset(
        address receiver,
        uint256 assetId,
        string memory requestDescription,
        uint256 requestDateFrom,
        uint256 requestDateTo
    ) public {
        Asset storage requestedItem = donationList[assetId];
        //if (requestedItem.requestCount < maxNoOfReqsPerAsst) {
        assetRequestList[assetId][requestedItem.requestCount] = Request({
            receiver: receiver,
            requestDescription: requestDescription,
            requestDateFrom: requestDateFrom,
            requestDateTo: requestDateTo
        });
        donationList[assetId].status = Status.Requested;
        requestedItem.requestCount++;
        //}
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
