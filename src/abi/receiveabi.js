export const ReceiveAsset =  [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_da",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_adm",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint32",
        "name": "assetId",
        "type": "uint32"
      }
    ],
    "name": "LogRequested",
    "type": "event"
  },
  {
    "inputs": [
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
    "name": "assetRequestList",
    "outputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "requestDescription",
        "type": "string"
      },
      {
        "internalType": "uint32",
        "name": "requestDateFrom",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "requestDateTo",
        "type": "uint32"
      },
      {
        "internalType": "enum ReceiveAsset.RequestStatus",
        "name": "status",
        "type": "uint8"
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
        "name": "assetId",
        "type": "uint32"
      },
      {
        "internalType": "uint256",
        "name": "requestCount",
        "type": "uint256"
      }
    ],
    "name": "getDonationRequests",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "receiver",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "requestDescription",
            "type": "string"
          },
          {
            "internalType": "uint32",
            "name": "requestDateFrom",
            "type": "uint32"
          },
          {
            "internalType": "uint32",
            "name": "requestDateTo",
            "type": "uint32"
          },
          {
            "internalType": "enum ReceiveAsset.RequestStatus",
            "name": "status",
            "type": "uint8"
          }
        ],
        "internalType": "struct ReceiveAsset.Request[16]",
        "name": "",
        "type": "tuple[16]"
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
        "name": "assetId",
        "type": "uint32"
      },
      {
        "internalType": "string",
        "name": "requestDescription",
        "type": "string"
      },
      {
        "internalType": "uint32",
        "name": "requestDateFrom",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "requestDateTo",
        "type": "uint32"
      }
    ],
    "name": "requestAsset",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint32",
        "name": "assetId",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "requestId",
        "type": "uint32"
      }
    ],
    "name": "getRequest",
    "outputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "requestDescription",
        "type": "string"
      },
      {
        "internalType": "uint32",
        "name": "requestDateFrom",
        "type": "uint32"
      },
      {
        "internalType": "uint32",
        "name": "requestDateTo",
        "type": "uint32"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  }
]