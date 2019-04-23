# -*- coding: utf-8 -*-
##
#  Exchange contract interface
##
from json import loads

ABI = loads('''
  [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "id",
          "type": "bytes32"
        }
      ],
      "name": "NewMarket",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "TradeStart",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "TradePartial",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "TradeFinish",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "oracle",
          "type": "address"
        }
      ],
      "name": "TakerTransferConfirmation",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "TakerTransferConfirmed",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "id",
          "type": "uint256"
        },
        {
          "indexed": true,
          "name": "oracle",
          "type": "address"
        }
      ],
      "name": "MakerTransferConfirmation",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "name": "id",
          "type": "uint256"
        }
      ],
      "name": "MakerTransferConfirmed",
      "type": "event"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getTrade",
      "outputs": [
        {
          "name": "market",
          "type": "bytes32"
        },
        {
          "name": "deal",
          "type": "bytes32"
        },
        {
          "name": "maker",
          "type": "address"
        },
        {
          "name": "taker",
          "type": "address"
        },
        {
          "name": "collateral",
          "type": "uint256"
        },
        {
          "name": "makerTransferConfirmations",
          "type": "uint256"
        },
        {
          "name": "takerTransferConfirmations",
          "type": "uint256"
        },
        {
          "name": "startBlock",
          "type": "uint256"
        },
        {
          "name": "partialBlock",
          "type": "uint256"
        },
        {
          "name": "finishBlock",
          "type": "uint256"
        },
        {
          "name": "makerExtra",
          "type": "bytes"
        },
        {
          "name": "takerExtra",
          "type": "bytes"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [
        {
          "name": "_id",
          "type": "bytes32"
        }
      ],
      "name": "getMarket",
      "outputs": [
        {
          "name": "makerTimeout",
          "type": "uint256"
        },
        {
          "name": "takerTimeout",
          "type": "uint256"
        },
        {
          "name": "oracles",
          "type": "address[]"
        },
        {
          "name": "minimalConfirmations",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_makerTimeout",
          "type": "uint256"
        },
        {
          "name": "_takerTimeout",
          "type": "uint256"
        },
        {
          "name": "_oracles",
          "type": "address[]"
        },
        {
          "name": "_minimalConfirmations",
          "type": "uint256"
        }
      ],
      "name": "addMarket",
      "outputs": [
        {
          "name": "id",
          "type": "bytes32"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "makerOrder",
          "type": "bytes"
        },
        {
          "name": "makerSignature",
          "type": "bytes"
        },
        {
          "name": "takerOrder",
          "type": "bytes"
        },
        {
          "name": "takerSignature",
          "type": "bytes"
        }
      ],
      "name": "startTrade",
      "outputs": [
        {
          "name": "id",
          "type": "uint256"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "confirmTakerTransfer",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "confirmMakerTransfer",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "constant": false,
      "inputs": [
        {
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "finishTrade",
      "outputs": [
        {
          "name": "success",
          "type": "bool"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]
''')

class Exchange:
    def __init__(self, web3, address):
        self._contract = web3.eth.contract(address, abi=ABI)

    def getTrade(self, trade_id):
        return self._contract.functions.getTrade(trade_id).call()

    def getMarket(self, market_id):
        return self._contract.functions.getMarket(market_id).call()
