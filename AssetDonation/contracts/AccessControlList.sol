pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract AccessControlList is AccessControl {
    using Counters for Counters.Counter;
    Counters.Counter private _recourceIds;
    Counters.Counter private _roleIds;

    enum SubjectType {Role, Address}

    enum ActionType {Autorized, Denied, Penalized}

    struct ABACL {
        string resourceName;
        address SubjectAddress;
    }

    struct RBACL {
        uint256 ResourceID;
        bytes32 SubjectRole;
        ActionType Action;
    }

    struct RBACLRoleData {
        bool exists;
        bool approved;
    }

    struct Resource {
        uint256 ResourceID;
        string Title;
        string Description;
    }

    struct AccessStatistic {
        uint256 requestCount;
        uint256 lastAccessDate;
        bool activated;
    }

    mapping(uint256 => mapping(bytes32 => RBACL)) public PolicyList;
    mapping(string => bytes32) public RoleList;
    mapping(uint256 => Resource) public ResourceList;
    mapping(address => AccessStatistic) public AccessStatistics;

    uint256 requestCountTreshhold;
    uint256 requestTimeTreshhold;

    string[] roleNames;

    function addRole(string memory roleName) public {
        roleNames[_roleIds.current()] = roleName;
        _roleIds.increment();
        bytes32 newRole = keccak256(abi.encodePacked(roleName));
        RoleList[roleName] = newRole;
    }

    function grantRole(string memory roleName, address _address) public {
        grantRole(roleName, _address);
        if (!AccessStatistics[_address].activated) {
            AccessStatistics[_address] = AccessStatistic({
                requestCount: 0,
                lastAccessDate: 0,
                activated: true
            });
        }
    }

    function addResource(string memory resTitle, string memory resDescription)
        public
        returns (uint256)
    {
        uint256 newResourceId = _recourceIds.current();
        ResourceList[newResourceId] = Resource({
            ResourceID: newResourceId,
            Title: resTitle,
            Description: resDescription
        });
        _recourceIds.increment();
        return newResourceId;
    }

    function addPolicy(
        uint256 resourceID,
        string memory role,
        uint256 action
    ) public {
        PolicyList[resourceID][RoleList[role]] = RBACL({
            ResourceID: resourceID,
            SubjectRole: RoleList[role],
            Action: getActionEnumValue(action)
        });
    }

    function getActionEnumValue(uint256 action) public returns (ActionType) {
        if (action == 0) {
            return ActionType.Autorized;
        } else if (action == 1) {
            return ActionType.Denied;
        }
    }

    function requestResource(uint256 resourceID, address _address)
        public
        returns (ActionType)
    {
        ActionType act = ActionType.Denied;
        AccessStatistic storage accessStatistic = AccessStatistics[_address];
        if (accessStatistic.activated) {
            uint256 chainStartTime = now;
            if (
                chainStartTime - accessStatistic.lastAccessDate <
                requestCountTreshhold
            ) {
                accessStatistic.requestCount += 1;
                if (accessStatistic.requestCount >= requestCountTreshhold) {
                    act = ActionType.Penalized;
                    return act;
                }
            }
        }
        for (uint256 i = 0; i < _roleIds.current(); i++) {
            if (hasRole(RoleList[roleNames[i]], _address)) {
                if (
                    PolicyList[resourceID][RoleList[roleNames[i]]].Action ==
                    ActionType.Autorized
                ) {
                    act = ActionType.Autorized;
                    break;
                }
            }
        }
        return act;
    }

    function getRole(string memory role) public view returns (bytes32) {
        return RoleList[role];
    }

    function getRole(uint256 _roleID)
        public
        view
        returns (string memory name, bytes32 ID)
    {
        return (roleNames[_roleID], RoleList[roleNames[_roleID]]);
    }

    function getPolicy(uint256 resourceID, string memory role)
        public
        view
        returns (uint256)
    {
        return uint256(PolicyList[resourceID][RoleList[role]].Action);
    }

    function getResource(uint256 resourceID)
        public
        view
        returns (
            uint256 ResourceID,
            string memory Title,
            string memory Description
        )
    {
        return (
            ResourceList[resourceID].ResourceID,
            ResourceList[resourceID].Title,
            ResourceList[resourceID].Description
        );
    }

    function getResourceCount() public view returns (uint256 resourceCount) {
        return _recourceIds.current();
    }

    function getRoleCount() public view returns (uint256 resourceCount) {
        return _roleIds.current();
    }
}
