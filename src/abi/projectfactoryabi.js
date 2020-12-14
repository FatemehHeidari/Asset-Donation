export const ProjectFactory = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "x",
        "type": "uint256"
      }
    ],
    "name": "logBalance",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "contract ProjectFunding",
        "name": "project",
        "type": "address"
      }
    ],
    "name": "projectCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "projects",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_projectDescription",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_projectTitle",
        "type": "string"
      },
      {
        "internalType": "uint32",
        "name": "_projectKickOffTime",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "_projectKickOffMinBalance",
        "type": "uint32"
      }
    ],
    "name": "createProject",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [],
    "name": "getProjects",
    "outputs": [
      {
        "components": [
          {
            "internalType": "string",
            "name": "projectTitle",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "projectDescription",
            "type": "string"
          },
          {
            "internalType": "address",
            "name": "projectOwner",
            "type": "address"
          },
          {
            "internalType": "uint32",
            "name": "projectKickOffMinBalance",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "projectKickOffTime",
            "type": "uint32"
          }
        ],
        "internalType": "struct Project[8]",
        "name": "",
        "type": "tuple[8]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "projectId",
        "type": "uint32"
      }
    ],
    "name": "getProject",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "projectAddress",
        "type": "address"
      }
    ],
    "name": "getProjectByAddress",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      },
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "projectId",
        "type": "uint32"
      }
    ],
    "name": "donateToProject",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function",
    "payable": true
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "projectId",
        "type": "uint32"
      }
    ],
    "name": "getProjectBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address payable",
        "name": "projectAddress",
        "type": "address"
      }
    ],
    "name": "getProjectBalanceByAddress",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "projectId",
        "type": "uint256"
      }
    ],
    "name": "getProjectAddress",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "projectId",
        "type": "uint32"
      }
    ],
    "name": "getProjectAddress",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]