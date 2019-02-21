# -*- coding: utf-8 -*-
##
#  Oracle application
##

# Data providers
from web3 import Web3, HTTPProvider
from ipfsapi import connect

# Network adapters 
from Exchange import Exchange
from ERC20 import Token
from ETH import Ethereum
from BTC import Bitcoin

WEB3_PROVIDER = 'https://kovan.infura.io/v3/4023cac5af2548e682ffe03d06c5dfef' 
IPFS_PROVIDER = 'https://ipfs.infura.io'

BTCETH_MARKET = '0x96a3f85adb42475b09225424479877991c78c1f39f943c591462b4228de0494b'

TAKER_TRANSFER_CONFIRMED = 1
MAKER_TRANSFER_CONFIRMED = 2
WAITING_FOR_TRANSFER = 4

class Oracle:
    def __init__(self, exchange_address, trade_id):
        self.web3 = Web3(HTTPProvider(WEB3_PROVIDER))
        self.ipfs = connect(IPFS_PROVIDER) 

        self.exchange = Exchange(self.web3, exchange_address) 
        self.trade = self.exchange.getTrade(int(trade_id))
        self.market = self.exchange.getMarket(self.trade[0])

    def main(self):
        maker_params = self.ipfs.get_json(self.trade[10])
        taker_params = self.ipfs.get_json(self.trade[11])

        # TODO: check deal hash

        taker_res = self.taker_transfer_check(maker_params)
        maker_res = self.maker_transfer_check(taker_params)

        print(taker_res | maker_res)

    def taker_timeout(self):
        return self.trade[8] == 0 and self.trade[7] + self.market[1] < self.web3.eth.blockNumber

    def maker_timeout(self):
        return self.trade[8] > 0 and self.trade[8] + self.market[0] < self.web3.eth.blockNumber

    def taker_transfer_check(self, params):
        if self.taker_timeout():
            return 0

        if self.trade[0] == BTCETH_MARKET and Ethereum(self.web3).balanceOf(params['account']) == params['buy']:
            return MAKER_TRANSFER_CONFIRMED

        return WAITING_FOR_TRANSFER

    def maker_transfer_check(self, params):
        if self.taker_timeout() or self.maker_timeout():
            return 0

        if self.trade[0] == BTCETH_MARKET and Bitcoin().balanceOf(params['account']) == params['buy']:
            return TAKER_TRANSFER_CONFIRMED

        return WAITING_FOR_TRANSFER
