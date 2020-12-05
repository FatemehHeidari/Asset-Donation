pragma solidity ^0.6.2;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/// @title A Asset donation smart contract
/// @author Fatemeh Heidari Soureshjani
/// @notice This contract facilitates donation of physical assets for specific periods of time between asset owners and receivers
/// @dev time

contract AssetDonation {//is ERC721 {
    uint32 lastAssetId;
    uint32 lastRequestId;
    uint32 constant maxNoOfReqsPerAsst = 3;

    // mapping(address => bool) public donors;
    // mapping(address => bool) public receivers;

    // constructor() public ERC721("MyToken", "MTS") AccessControl() {
    //     lastAssetId = 0;
    //     lastRequestId = 0;
    // }



    // enum Status {Free, Requested, Donated, Inactive, Burned}

    // struct Asset {
    //     uint32 assetId;
    //     string assetDescription;
    //     uint32 availablityDate;
    //     string location;
    //     Status status;
    //     address owner;
    //     address recipient;
    //     uint32 donatedDateFrom;
    //     uint32 donatedDateTo;
    //     uint32 requestCount;
    //     string imageIPFSHash;
    // }

    // mapping(uint32 => Asset) public donationList;

    // struct Request {
    //     address receiver;
    //     string requestDescription;
    //     uint32 requestDateFrom;
    //     uint32 requestDateTo;
    // }
    // mapping(uint32 => mapping(uint32 => Request)) public assetRequestList;

    // modifier isDonor(address donorAddress) {
    //     require(hasRole(DONOR, donorAddress));
    //     _;
    // }

    // modifier assetIsFree(uint32 assetId) {
    //     require(donationList[assetId].recipient == address(0));
    //     _;
    // }

    // modifier assetExists(uint32 assetId) {
    //     require(donationList[assetId].owner != address(0),"Invalid asset");
    //     _;
    // }

    // event LogFree(uint32 assetId);
    // event LogRequested(uint32 assetId);
    // event LogDonated(uint32 assetId);
    // event LogInactive(uint32 assetId);
    // event LogIBurned(uint32 assetId);

    // modifier isReceiver(address receiverAddress) {
    //     require(hasRole(RECEIVER, receiverAddress));
    //     _;
    // }

    // /// @notice Add a new donor
    // function addDonor() public {
    //     donors[msg.sender] = false;
    //     //approveDonor(msg.sender);
    // }

    // /// @notice Admin approves an address to have the donor role
    // /// @param donorAddress The address of donor to be approved
    // function approveDonor(address donorAddress) public {
    //     grantRole(DONOR, donorAddress);
    //     donors[donorAddress] = true;
    // }

    // /// @notice Adds a new asset to list of donated assets(Should be called by a donor)
    // /// @dev other asset struct members should be added
    // /// @param assetDescription Descrption of the asset entered by owner
    // /// @param availablityDate the first date the owner can donate the asset
    // /// @param location the location of the donated asset
    // /// @param imageIPFSHash IPFS hash of the asset image uploaded by owner and saved to IPFS
    // function addAsset(
    //     string memory assetDescription,
    //     uint32 availablityDate,
    //     string memory location, /*isDonor(msg.sender)*/
    //     string memory imageIPFSHash
    // ) public {
    //     uint32 assetId = mintToken(msg.sender);
    //     donationList[assetId] = Asset({
    //         assetId: assetId,
    //         assetDescription: assetDescription,
    //         availablityDate: availablityDate,
    //         location: location,
    //         status: Status.Free,
    //         owner: msg.sender,
    //         recipient: address(0),
    //         donatedDateFrom: 0,
    //         donatedDateTo: 0,
    //         requestCount: 0,
    //         imageIPFSHash: imageIPFSHash
    //     });
    //     emit LogFree(assetId);
    // }

    // /// @notice Returns all donations of an donor(it shoud be called by a donor)
    // /// @dev There must be better way than returing always an array of 16
    // /// @return Asset returns an array of type asset and length 16 of donations of msg.sender
    // function getDonationsByOwner()
    //     public
    //     view
    //     isDonor(msg.sender)
    //     returns (Asset[16] memory)
    // {
    //     uint32 tokenCount = uint32(balanceOf(msg.sender));
    //     uint32 index = 0;
    //     uint32 tokenId;
    //     Asset[16] memory assetList;
    //     if (tokenCount <= 16) {
    //         index = tokenCount;
    //     } else {
    //         index = 16;
    //     }
    //     for (uint32 i = 0; i < index; i++) {
    //         tokenId = uint32(tokenOfOwnerByIndex(msg.sender, i));
    //         assetList[i] = donationList[tokenId];
    //     }
    //     return assetList;
    // }

    // /// @notice returns all donations
    // /// @dev There must be better way than returing always an array of 16
    // /// @return Asset returns an array of type asset and length 16 of all donations
    // function getAllDonations() public view returns (Asset[16] memory) {
    //     uint32 index = 0;
    //     Asset[16] memory assetList;
    //     if (lastAssetId <= 16) {
    //         index = lastAssetId;
    //     } else {
    //         index = 16;
    //     }
    //     for (uint32 i = 0; i < index; i++) {
    //         assetList[i] = donationList[i];
    //     }
    //     return assetList;
    // }

    // /// @notice retrieves all request for a specific donation
    // /// @dev There must be better way than returing always an array of 16
    // /// @param assetId the unique asset id of donation
    // /// @return Request returns an array of type Request and length 16
    // function getDonationRequests(uint32 assetId)
    //     public assetExists(assetId)
    //     view
    //     returns (Request[16] memory)
    // {
    //     Request[16] memory requestArray;
    //     mapping(uint32 => Request) storage requestMapping
    //      = assetRequestList[assetId];
    //     for (uint32 i = 0; i < donationList[assetId].requestCount; i++) {
    //         requestArray[i] = requestMapping[i];
    //     }
    //     return requestArray;
    // }

    // /// @notice The ERC721 stadard for nunfungible token is used to maintain ownership of assets
    // /// @notice everytime a new token is minted based on current value of lastAssetId for assetOwner address, and then lastAssetId is increased
    // /// @param assetOwner the owner of the new asset
    // /// @return returns the id of new minted token
    // function mintToken(address assetOwner) public returns (uint32) {
    //     _safeMint(assetOwner, lastAssetId);
    //     uint32 assetId = lastAssetId;
    //     lastAssetId++;
    //     return assetId;
    // }

    

    // /// @notice a donor can approve a specific request and this function assigns the recipient of this asset to the recipientAddress
    // /// @notice caller should be a donor and recipient should be a receiver
    // /// @param assetId unique id of asset to be donated
    // /// @param recipientAddress donation receiver
    // function donateAsset(uint32 assetId, address recipientAddress)
    //     public assetExists(assetId)
    //     isDonor(msg.sender)
    //     isReceiver(recipientAddress)
    //     assetIsFree(assetId)
    // {
    //     donationList[assetId].recipient = recipientAddress;
    //     donationList[assetId].status = Status.Donated;
    // }

    // /// @notice Adds an address to list of receivers
    // function addReceiver() public {
    //     receivers[msg.sender] = false;
    // }

    // /// @notice Admin approves an address to have the receiver role
    // /// @param receiverAddress The address of receiver to be approved
    // function approveReceiver(address receiverAddress) public {
    //     grantRole(RECEIVER, receiverAddress);
    //     receivers[receiverAddress] = true;
    // }

    // /// @notice A receiver can register a request for a specific donation previousely added
    // /// @notice to list of donation by a donor
    // /// @dev date conflicts can be checked
    // /// @param assetId The unique id of donation
    // /// @param requestDescription The description entered by the receiver
    // /// @param requestDateFrom The starting date receiver needs this asset
    // /// @param requestDateTo The ending date receiver needs this asset
    // function requestAsset(
    //     uint32 assetId,
    //     string memory requestDescription,
    //     uint32 requestDateFrom,
    //     uint32 requestDateTo
    // ) public assetExists(assetId){
    //     Asset storage requestedItem = donationList[assetId];
    //     //if (requestedItem.requestCount < maxNoOfReqsPerAsst) {
    //     assetRequestList[assetId][requestedItem.requestCount] = Request({
    //         receiver: msg.sender,
    //         requestDescription: requestDescription,
    //         requestDateFrom: requestDateFrom,
    //         requestDateTo: requestDateTo
    //     });
    //     donationList[assetId].status = Status.Requested;
    //     requestedItem.requestCount++;
    // }

//     function getDonation(uint32 assetId)
//         public
//         view
//         returns (
//             string memory assetDescription,
//             uint32 availablityDate,
//             string memory location,
//             Status status,
//             address owner,
//             address recipient,
//             string memory imageIPFSHash
//         )
//     {
//         assetDescription = donationList[assetId].assetDescription;
//         availablityDate = donationList[assetId].availablityDate;
//         location = donationList[assetId].location;
//         status = donationList[assetId].status;
//         owner = donationList[assetId].owner;
//         recipient = donationList[assetId].recipient;
//         imageIPFSHash = donationList[assetId].imageIPFSHash;
//         return (
//             assetDescription,
//             availablityDate,
//             location,
//             status,
//             owner,
//             recipient,
//             imageIPFSHash
//         );
//     }
//     function getRequest(uint32 assetId, uint32 requestId)
//         public
//         view
//         returns (
//             address receiver,
//             string memory requestDescription,
//             uint32 requestDateFrom,
//             uint32 requestDateTo
//         )
//     {
// Request storage request = assetRequestList[assetId][requestId];
//             receiver = request.receiver;
//             requestDescription = request.requestDescription;
//             requestDateFrom = request.requestDateFrom;
//             requestDateTo = request.requestDateTo;
//         return (
//             receiver,
//             requestDescription,
//             requestDateFrom,
//             requestDateTo
//         );
//     }
}
