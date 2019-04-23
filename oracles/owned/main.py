# -*- coding: utf-8 -*-
##
#  Oraclize oracle main
##
import codecs
from os import environ
from time import sleep
from json import loads
from eth_keys import keys
from Oracle import Oracle
from Oracle import WAITING_FOR_TRANSFER, MAKER_TRANSFER_CONFIRMED, TAKER_TRANSFER_CONFIRMED
from logging import debug, info, basicConfig, INFO, DEBUG
from threading import Timer, Thread
from web3 import Web3, WebsocketProvider

basicConfig(format=u'[%(asctime)s] %(levelname)-8s %(message)s', level=DEBUG)

WEB3_PROVIDER = 'wss://kovan.infura.io/ws/v3/4023cac5af2548e682ffe03d06c5dfef'
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
    info('Enon oracle :: v0.1')
    exchange_address = environ['ARG0']
    oracle_address = environ['ARG1']
    oracle = Oracle(exchange_address, oracle_address)

    web3 = Web3(WebsocketProvider(WEB3_PROVIDER))
    private_key = codecs.decode(environ['ARG2'], 'hex')
    account_address = keys.PrivateKey(private_key).public_key.to_checksum_address()
    info('Use account: {}'.format(account_address))
    def send_tx(tx_gen):
        nonce = web3.eth.getTransactionCount(account_address)
        unsigned = tx_gen.buildTransaction({
            'chainId': 42,
            'gas': 300000,
            'gasPrice': web3.toWei(1, 'gwei'),
            'nonce': nonce})
        signed = web3.eth.account.signTransaction(unsigned, private_key=private_key)
        web3.eth.sendRawTransaction(signed.rawTransaction)

    oracle_contract = web3.eth.contract(oracle_address, abi=OWNED_ORACLE_ABI)
    event_filter = oracle_contract.eventFilter('CheckTrade') 
    def check_trades():
        debug('Poll contract events')
        for e in event_filter.get_new_entries():
            trade_id = e['args']['id']
            debug('Pending trade: id = {}'.format(trade_id))

            def trade_check_thread():
                info('Started transfer tracker: trade_id = {}'.format(trade_id))
                res = WAITING_FOR_TRANSFER
                while res & WAITING_FOR_TRANSFER > 0:
                    debug('Waiting for transfers trade_id = {}'.format(trade_id))
                    sleep(30)
                    res = oracle.main(trade_id)
                    debug('Oracle returns {} for trade_id = {}'.format(res, trade_id))

                    if res & MAKER_TRANSFER_CONFIRMED > 0:
                        info('Maker transfer confirmed: trade_id = {}'.format(trade_id))
                        send_tx(oracle_contract.functions.confirmMakerTransfer(trade_id))

                    if res & TAKER_TRANSFER_CONFIRMED > 0:
                        info('Taker transfer confirmed: trade_id = {}'.format(trade_id))
                        send_tx(oracle_contract.functions.confirmTakerTransfer(trade_id))
            Thread(target=trade_check_thread, daemon=True).start()
        Timer(10, check_trades).start()

    info('Starting event listener...')
    check_trades()
    info('Event listener started')
