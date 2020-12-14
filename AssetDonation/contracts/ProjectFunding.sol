pragma solidity ^0.6.2;
pragma experimental ABIEncoderV2;

enum Status {Free, Requested, Donated, Inactive, Burned}

struct Asset {
    uint32 assetId;
    string assetTitle;
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

contract ProjectFunding {
    address payable owner;
    Asset[] donatedAssets;
    uint32 balance;
    Project public project;

    struct Project {
        string projectTitle;
        string projectDescription;
        address payable projectOwner;
        uint32 projectKickOffMinBalance;
        uint32 projectKickOffTime;
    }

    constructor(
        address payable _owner,
        uint32 initialBalance,
        string memory _projectDescription,
        string memory _projectTitle,
        uint32 _projectKickOffTime,
        uint32 _projectKickOffMinBalance
    ) public payable {
        owner = _owner;
        balance = initialBalance;
        project.projectDescription = _projectDescription;
        project.projectOwner = _owner;
        project.projectTitle = _projectTitle;
        project.projectKickOffTime = _projectKickOffTime;
        project.projectKickOffMinBalance = _projectKickOffMinBalance;
    }
    modifier onlyOwner(address ad) {
        require(ad == project.projectOwner, "Only Owner.");
        _;
    }
    // function getProject() public view returns (Project memory) {
    //     return project;
    // }

    function getProject()
        public
        view
        returns (
            string memory,
            string memory,
            address payable,
            uint32,
            uint32
        )
    {
        return (
            project.projectTitle,
            project.projectDescription,
            project.projectOwner,
            project.projectKickOffMinBalance,
            project.projectKickOffTime
        );
    }

    function claimDonation(address claimAddress) public payable onlyOwner(claimAddress) {
        project.projectOwner.transfer(address(this).balance);
    }

    fallback() external payable {}
    receive() external payable{}
}
