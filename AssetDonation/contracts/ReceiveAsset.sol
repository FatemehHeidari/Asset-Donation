pragma solidity ^0.6.2;
pragma experimental ABIEncoderV2;

contract DonateAsset {
    function getAssetRequestCount(uint32 assetId)
        public
        view
        returns (uint32)
    {}

    function UpdateAsset(Asset memory asset) public {}
}

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import './Administration.sol';

/// @title A Asset donation smart contract
/// @author Fatemeh Heidari Soureshjani
/// @notice This contract facilitates donation of physical assets for specific periods of time between asset owners and receivers
/// @dev time
enum Status {Free, Requested, Donated, Inactive, Burned}

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
}

contract ReceiveAsset is Administration{

    DonateAsset DA;
    uint32 lastRequestId;

    constructor(address _DA) public Administration() {
        DA = DonateAsset(_DA);
        lastRequestId = 0;
    }

    struct Request {
        address receiver;
        string requestDescription;
        uint32 requestDateFrom;
        uint32 requestDateTo;
    }
    mapping(uint32 => mapping(uint32 => Request)) public assetRequestList;

    event LogRequested(uint32 assetId);

    /// @notice retrieves all request for a specific donation
    /// @dev There must be better way than returing always an array of 16
    /// @param assetId the unique asset id of donation
    /// @return Request returns an array of type Request and length 16
    function getDonationRequests(
        uint32 assetId,
        uint256 requestCount
    ) public view returns (Request[16] memory) {
        Request[16] memory requestArray;
            mapping(uint32 => Request) storage requestMapping
         = assetRequestList[assetId];
        for (uint32 i = 0; i < requestCount; i++) {
            requestArray[i] = requestMapping[i];
        }
        return requestArray;
    }

    /// @notice A receiver can register a request for a specific donation previousely added
    /// @notice to list of donation by a donor
    /// @dev date conflicts can be checked
    /// @param assetId The unique id of donation
    /// @param requestDescription The description entered by the receiver
    /// @param requestDateFrom The starting date receiver needs this asset
    /// @param requestDateTo The ending date receiver needs this asset
    function requestAsset(
        uint32 assetId,
        string memory requestDescription,
        uint32 requestDateFrom,
        uint32 requestDateTo
    ) public
             whenNotPaused{
        uint32 requestCount = DA.getAssetRequestCount(assetId); ///donationList[assetId];
        //if (requestedItem.requestCount < maxNoOfReqsPerAsst) {
        assetRequestList[assetId][requestCount] = Request({
            receiver: msg.sender,
            requestDescription: requestDescription,
            requestDateFrom: requestDateFrom,
            requestDateTo: requestDateTo
        });
        requestCount++;
        Asset memory asset = Asset({
            assetId: assetId,
            assetDescription: "",
            availablityDate: 0,
            location: "",
            status: Status.Requested,
            owner: address(0),
            recipient: address(0),
            donatedDateFrom: 0,
            donatedDateTo: 0,
            requestCount: requestCount,
            imageIPFSHash: ""
        });
        DA.UpdateAsset(asset);
        emit LogRequested(assetId);
        //donationList[assetId].status = Status.Requested;
        //requestedItem.requestCount++;
    }

    function getRequest(uint32 assetId, uint32 requestId)
        public
        view
        returns (
            address receiver,
            string memory requestDescription,
            uint32 requestDateFrom,
            uint32 requestDateTo
        )
    {
        Request storage request = assetRequestList[assetId][requestId];
        receiver = request.receiver;
        requestDescription = request.requestDescription;
        requestDateFrom = request.requestDateFrom;
        requestDateTo = request.requestDateTo;
        return (receiver, requestDescription, requestDateFrom, requestDateTo);
    }
}
