pragma solidity ^0.6.2;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/SafeCast.sol";

/// @title A Asset donation smart contract
/// @author Fatemeh Heidari Soureshjani
/// @notice This contract facilitates donation of physical assets for specific periods of time between asset owners and receivers
/// @dev time

contract Administration is AccessControl, Pausable {
    //bool noAdmin;

    constructor() public AccessControl() Pausable() {
        //noAdmin = true;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    bytes32 public constant DONOR = keccak256("DONOR");
    bytes32 public constant RECEIVER = keccak256("RECEIVER");
    struct donor {
        bool exists;
        bool approved;
        uint32 donationCount;
        //uint32 pageNo;
    }

    struct receiver {
        bool exists;
        bool approved;
        uint32 requestCount;
        //uint32 pageNo;
    }

    mapping(address => donor) public donors;
    mapping(address => receiver) public receivers;
    modifier isAdmin() {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Sender is not ADMIN."
        );
        _;
    }

    // modifier isDonor(address donorAddress) {
    //     if (!noAdmin) {
    //         require(hasRole(DONOR, donorAddress));
    //     }
    //     _;
    // }
    // modifier isReceiver(address receiverAddress) {
    //     if (!noAdmin) {
    //         require(hasRole(RECEIVER, receiverAddress));
    //     }
    //     _;
    // }

    function addDonor(address donorAddress) public {
        donor storage d = donors[donorAddress];
        if (!d.exists) {
            donors[donorAddress] = donor({
                exists: true,
                approved: false,
                donationCount: 1
            });
        } else {
            d.donationCount = SafeCast.toUint32(
                SafeMath.add(uint256(donors[donorAddress].donationCount), 1)
            );
        }
    }

    /// @notice Adds an address to list of receivers
    function addReceiver(address receiverAddress) public {
        receiver storage r = receivers[receiverAddress];
        if (!r.exists) {
            receivers[receiverAddress] = receiver({
                exists: true,
                approved: false,
                requestCount: 1
            });
        } else {
            r.requestCount = SafeCast.toUint32(
                SafeMath.add(
                    uint256(receivers[receiverAddress].requestCount),
                    1
                )
            );
        }
    }

    function getReceiver(address receiverAddress)
        public
        view
        returns (receiver memory)
    {
        return receivers[receiverAddress];
    }

    function getDonor() public view returns (donor memory) {
        return donors[msg.sender];
    }

    /// @notice Admin approves an address to have the donor role
    /// @param donorAddress The address of donor to be approved
    function approveDonor(address donorAddress) public {
        grantRole(DONOR, donorAddress);
        donors[donorAddress].approved = true;
    }

    /// @notice Adds an address to list of receivers
    // function addReceiver() public {
    //     if (!receivers[msg.sender]) {
    //         receivers[msg.sender] = false;
    //     }
    // }

    /// @notice Admin approves an address to have the receiver role
    /// @param receiverAddress The address of receiver to be approved
    function approveReceiver(address receiverAddress) public {
        grantRole(RECEIVER, receiverAddress);
        receivers[receiverAddress].approved = true;
    }

    function pause() public isAdmin {
        _pause();
    }

    // function getAdmin() public returns(address){
    //     return getRoleAdmin(DEFAULT_ADMIN_ROLE);
    // }

    function unpause() public isAdmin {
        _unpause();
    }

    function systemPaused() public view returns (bool) {
        bool paused = paused();
        return paused;
    }

    function isAdminUser() public view returns (bool) {
        if (hasRole(DEFAULT_ADMIN_ROLE, msg.sender)) return true;
        else return false;
    }
}
