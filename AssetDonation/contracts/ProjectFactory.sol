pragma solidity ^0.6.2;
pragma experimental ABIEncoderV2;

import "./ProjectFunding.sol";
struct Project {
    string projectTitle;
    string projectDescription;
    address projectOwner;
    uint32 projectKickOffMinBalance;
    uint32 projectKickOffTime;
}

contract ProjectFactory {
    address payable[] public projects;
    event projectCreated(ProjectFunding project);
    event logBalance(uint256 x);

    address private Owner;

    constructor() public {
        Owner = msg.sender;
    }

    function createProject(
        string memory _projectDescription,
        string memory _projectTitle,
        uint32 _projectKickOffTime,
        uint32 _projectKickOffMinBalance
    ) public payable {
        ProjectFunding project = new ProjectFunding(
            msg.sender,
            uint32(msg.value),
            _projectDescription,
            _projectTitle,
            _projectKickOffTime,
            _projectKickOffMinBalance
        );
        address nftAddress = address(project);
        address payable addr = address(uint160(nftAddress));
        //addr.send(address(this).balance);
        projects.push(addr);
        emit projectCreated(project);
    }

    function getProjects() external view returns (Project[8] memory) {
        Project[8] memory projectList;
        string memory _projectTitle;
        string memory _projectDescription;
        address _projectOwner;
        uint32 _projectKickOffMinBalance;
        uint32 _projectKickOffTime;
        for (uint32 i = 0; i < projects.length; i++) {
            (
                _projectTitle,
                _projectDescription,
                _projectOwner,
                _projectKickOffMinBalance,
                _projectKickOffTime
            ) = this.getProject(i);
            Project memory p = Project({
                projectTitle: _projectTitle,
                projectDescription: _projectDescription,
                projectOwner: _projectOwner,
                projectKickOffMinBalance: _projectKickOffMinBalance,
                projectKickOffTime: _projectKickOffTime
            });
            projectList[i] = p;
        }
        return projectList;
    }
 function getProjectAddress(uint projectId) external view returns (address) {
        return projects[projectId];
    }
    // function getProject(uint32 projectId)
    //     external
    //     view
    //     returns (Project memory
    //     )
    // {
    //     return ProjectFunding(projects[projectId]).getProject();
    // }

    function getProject(uint32 projectId)
        external
        view
        returns (
            string memory,
            string memory,
            address,
            uint32,
            uint32
        )
    {
        return ProjectFunding(projects[projectId]).getProject();
    }

    function getProjectByAddress(address payable projectAddress)
        external
        view
        returns (
            string memory,
            string memory,
            address,
            uint32,
            uint32
        )
    {
        return ProjectFunding(projectAddress).getProject();
    }

    function donateToProject(uint32 projectId) public payable {
        projects[projectId].transfer(msg.value);
    }

    function getProjectBalance(uint32 projectId)
        external
        view
        returns (uint256)
    {
        return projects[projectId].balance; //.getBalance();
        //emit logBalance(x);
        //return x;
    }

    function getProjectBalanceByAddress(address payable projectAddress)
        external
        view
        returns (uint256)
    {
        return projectAddress.balance; //.getBalance();
        //emit logBalance(x);
        //return x;
    }    

    function getProjectAddress(uint32 projectId)
        public
        view
        returns (address payable)
    {
        return projects[projectId];
    }
}
