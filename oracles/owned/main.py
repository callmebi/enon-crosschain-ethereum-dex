# -*- coding: utf-8 -*-
##
#  Oraclize oracle main
##
from os import environ
from Oracle import Oracle
from threading import Thread

OWNED_ORACLE_ABI = loads('''
  [
    {
      "constant": true,
      "inputs": [],
      "name": "dex",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "constant": true,
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "name": "",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "name": "_dex",
          "type": "address"
        },
        {
          "name": "_onwer",
          "type": "address"
        }
      ],
      "payable": false,
      "stateMutability": "nonpayable",
      "type": "constructor"
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
      "name": "CheckTrade",
      "type": "event"
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
          "name": "",
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
      "name": "confirmTakerTransfer",
      "outputs": [
        {
          "name": "",
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
          "name": "_dex",
          "type": "address"
        },
        {
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "checkTrade",
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

if __name__ == '__main__':
    exchange_address = environ['ARG0']
    oracle_address = environ['ARG1']
    oracle = Oracle(environ['ARG0'], environ['ARG1'])

    oracle_contract = oracle.web3.contract(oracle_address, abi=OWNED_ORACLE_ABI)
    event_filter = oracle_contract.eventFilter('CheckTrade') 
    def check_trades():
        for e in event_filter.get_new_entries():
            trade_id = e['args']['id']
            res = oracle.main(trade_id)
            if RES == 1:
                oracle_contract.functions.confirmMakerTransfer(trade_id).transact()
            elif RES == 2:
                oracle_contract.functions.confirmTakerTransfer(trade_id).transact()
        Timer(10, check_trades).start()
