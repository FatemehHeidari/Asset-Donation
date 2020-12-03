// SPDX-License-Identifier: MIT
pragma solidity ^0.6.2;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract AssetDonation is ERC721, AccessControl {
    uint32 lastAssetId;
    uint32 lastRequestId;
    uint32 constant maxNoOfReqsPerAsst = 3;

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
        uint32 assetId; 
        string assetDescription;
        uint32 availablityDate;
        string location;
        Status status;
        address owner;
        address recipient;
        uint32 donatedDateFrom;
        uint32 donatedDateTo;
        uint32 requestCount;
        string imageIPFSHash;
        //AssetType assetType;
    }

    mapping(uint32 => Asset) public donationList;

    struct Request {
        address receiver;
        string requestDescription;
        uint32 requestDateFrom;
        uint32 requestDateTo;
        //   AssetType assetType;
    }
    mapping(uint32 => mapping(uint32 => Request)) public assetRequestList;

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
        uint32 availablityDate,
        string memory location /*isDonor(msg.sender)*/
    ) public {
        //Request[maxNoOfReqsPerAsst] storage requests;
        //mapping(uint=>Request) memory
        uint32 assetId = mintToken(msg.sender);
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
        uint32 tokenCount = uint32(balanceOf(msg.sender));
        uint32 index = 0;
        uint32 tokenId;
        Asset[16] memory assetList;
        if (tokenCount <= 16) {
            index = tokenCount;
        } else {
            index = 16;
        }
        for (uint32 i = 0; i < index; i++) {
            tokenId = uint32(tokenOfOwnerByIndex(msg.sender, i));
            assetList[i] = donationList[tokenId];
        }
        return assetList;
    }

    function getAllDonations() public view returns (Asset[16] memory) {
        uint32 index = 0;
        Asset[16] memory assetList;
        if (lastAssetId <= 16) {
            index = lastAssetId;
        } else {
            index = 16;
        }
        for (uint32 i = 0; i < index; i++) {
            assetList[i] = donationList[i];
        }
        return assetList;
    }

    function getDonationRequests(uint32 assetId)
        public
        view
        returns (Request[16] memory)
    {
        Request[16] memory requestArray;


            mapping(uint32 => Request) storage requestMapping
         = assetRequestList[assetId];
        for (uint32 i = 0; i < donationList[assetId].requestCount; i++) {
            requestArray[i] = requestMapping[i];
        }
        return requestArray;
    }

    function mintToken(address assetOwner) public returns (uint32) {
        _safeMint(assetOwner, lastAssetId);
        uint assetId = lastAssetId;
        lastAssetId++;
        return assetId;
    }

    modifier assetIsFree(uint32 assetId) {
        require(donationList[assetId].recipient == address(0));
        _;
    }

    function donateAsset(uint32 assetId, address recipientAddress)
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
        uint32 assetId,
        string memory requestDescription,
        uint32 requestDateFrom,
        uint32 requestDateTo
    ) public {
        Asset storage requestedItem = donationList[assetId];
        //if (requestedItem.requestCount < maxNoOfReqsPerAsst) {
        assetRequestList[assetId][requestedItem.requestCount] = Request({
            msg.sender,
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
