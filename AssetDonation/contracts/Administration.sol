pragma solidity ^0.6.2;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

/// @title A Asset donation smart contract
/// @author Fatemeh Heidari Soureshjani
/// @notice This contract facilitates donation of physical assets for specific periods of time between asset owners and receivers
/// @dev time

contract Administration is AccessControl, Pausable {
    bool noAdmin;

    constructor() public AccessControl() Pausable() {
        noAdmin = true;
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    bytes32 public constant DONOR = keccak256("DONOR");
    bytes32 public constant RECEIVER = keccak256("RECEIVER");
    // struct donors{
    //     bool exists;
    //     bool approved;
    //     uint32 donationCount;
    //     uint32 pageNo;
    // }

    mapping(address => bool) public donors;
    mapping(address => bool) public receivers;
    modifier isAdmin() {
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender));
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

    function addDonor() public {
        if (!donors[msg.sender]) {
            donors[msg.sender] = false;
        }
    }

    /// @notice Admin approves an address to have the donor role
    /// @param donorAddress The address of donor to be approved
    function approveDonor(address donorAddress) public {
        grantRole(DONOR, donorAddress);
        donors[donorAddress] = true;
    }

    /// @notice Adds an address to list of receivers
    function addReceiver() public {
        if (!receivers[msg.sender]) {
            receivers[msg.sender] = false;
        }
    }

    /// @notice Admin approves an address to have the receiver role
    /// @param receiverAddress The address of receiver to be approved
    function approveReceiver(address receiverAddress) public {
        grantRole(RECEIVER, receiverAddress);
        receivers[receiverAddress] = true;
    }

    function pause() public isAdmin{
        _pause();
    }

    function unpause() public isAdmin{
        _unpause();
    }
}
