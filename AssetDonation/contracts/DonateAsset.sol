pragma solidity ^0.6.2;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import './Administration.sol';

/// @title A Asset donation smart contract
/// @author Fatemeh Heidari Soureshjani
/// @notice This contract facilitates donation of physical assets for specific periods of time between asset owners and receivers
/// @dev time

contract DonateAsset is ERC721, Administration{
    uint32 lastAssetId;


    constructor() public ERC721("MyToken", "MTS") Administration(){
        lastAssetId = 0;
    }

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

    mapping(uint32 => Asset) public donationList;



    modifier assetIsFree(uint32 assetId) {
        require(donationList[assetId].recipient == address(0));
        _;
    }

    modifier assetExists(uint32 assetId) {
        require(donationList[assetId].owner != address(0), "Invalid asset");
        _;
    }

    event LogFree(uint32 assetId);
    event LogRequested(uint32 assetId);
    event LogDonated(uint32 assetId);
    event LogInactive(uint32 assetId);
    event LogIBurned(uint32 assetId);

    function UpdateAsset(Asset memory asset) public {
        donationList[asset.assetId].status = asset.status;
        donationList[asset.assetId].requestCount = asset.requestCount;
    }



    /// @notice Adds a new asset to list of donated assets(Should be called by a donor)
    /// @dev other asset struct members should be added
    /// @param assetDescription Descrption of the asset entered by owner
    /// @param availablityDate the first date the owner can donate the asset
    /// @param location the location of the donated asset
    /// @param imageIPFSHash IPFS hash of the asset image uploaded by owner and saved to IPFS
    function addAsset(
        string memory assetDescription,
        uint32 availablityDate,
        string memory location,
        string memory imageIPFSHash
    ) public isDonor(msg.sender) whenNotPaused{
        uint32 assetId = mintToken(msg.sender);
        donationList[assetId] = Asset({
            assetId: assetId,
            assetDescription: assetDescription,
            availablityDate: availablityDate,
            location: location,
            status: Status.Free,
            owner: msg.sender,
            recipient: address(0),
            donatedDateFrom: 0,
            donatedDateTo: 0,
            requestCount: 0,
            imageIPFSHash: imageIPFSHash
        });
        emit LogFree(assetId);
    }

    /// @notice Returns all donations of an donor(it shoud be called by a donor)
    /// @dev There must be better way than returing always an array of 16
    /// @return Asset returns an array of type asset and length 16 of donations of msg.sender
    function getDonationsByOwner()
        public
        view
        isDonor(msg.sender)
        returns (Asset[16] memory)
    {
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

    /// @notice returns all donations
    /// @dev There must be better way than returing always an array of 16
    /// @return Asset returns an array of type asset and length 16 of all donations
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

    /// @notice The ERC721 stadard for nunfungible token is used to maintain ownership of assets
    /// @notice everytime a new token is minted based on current value of lastAssetId for assetOwner address, and then lastAssetId is increased
    /// @param assetOwner the owner of the new asset
    /// @return returns the id of new minted token
    function mintToken(address assetOwner) public isDonor(msg.sender) whenNotPaused returns (uint32){
        _safeMint(assetOwner, lastAssetId);
        uint32 assetId = lastAssetId;
        lastAssetId++;
        return assetId;
    }

    /// @notice a donor can approve a specific request and this function assigns the recipient of this asset to the recipientAddress
    /// @notice caller should be a donor and recipient should be a receiver
    /// @param assetId unique id of asset to be donated
    /// @param recipientAddress donation receiver
    function donateAsset(uint32 assetId, address recipientAddress)
        public
        assetExists(assetId)
        //isDonor(msg.sender)
        //isReceiver(recipientAddress)
        assetIsFree(assetId)
        isDonor(msg.sender)
        whenNotPaused
    {
        donationList[assetId].recipient = recipientAddress;
        donationList[assetId].status = Status.Donated;
    }

    function getDonation(uint32 assetId) public view returns (Asset memory) {
        return donationList[assetId];
    }

    function getAssetRequestCount(uint32 assetId) public view returns (uint) {
        return donationList[assetId].requestCount;
    }
}
