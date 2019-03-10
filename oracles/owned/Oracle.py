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

TAKER_TRANSFER_CONFIRMED = 1
MAKER_TRANSFER_CONFIRMED = 2
WAITING_FOR_TRANSFER = 4

class Oracle:
    def __init__(self, exchange_address, oracle_address):
        self.web3 = Web3(HTTPProvider(WEB3_PROVIDER))
        self.ipfs = connect(IPFS_PROVIDER) 

        self.exchange = Exchange(self.web3, Web3.toChecksumAddress(exchange_address)) 


    def main(self, trade_id):
        trade = self.exchange.getTrade(trade_id)
        market = self.exchange.getMarket(self.trade[0])

        maker_params = self.ipfs.get_json(trade[10])
        taker_params = self.ipfs.get_json(trade[11])

        # TODO: check deal hash

        taker_res = self.taker_transfer_check(trade, market, maker_params)
        maker_res = self.maker_transfer_check(trade, market, taker_params)

        return (taker_res | maker_res)

    def taker_timeout(self, trade, market):
        return trade[8] == 0 and trade[7] + market[1] < self.web3.eth.blockNumber

    def maker_timeout(self):
        return trade[8] > 0 and trade[8] + market[0] < self.web3.eth.blockNumber

    def taker_transfer_check(self, trade, market, params):
        if self.taker_timeout(trade, market) or trade[8] > 0:
            return 0

        if Bitcoin().balanceOf(params['account']) >= int(params['buy']):
            return TAKER_TRANSFER_CONFIRMED

        return WAITING_FOR_TRANSFER

    def maker_transfer_check(self, trade, market, params):
        if self.taker_timeout(trade, market) or self.maker_timeout(trade, market):
            return 0

        if trade[8] > 0 and Ethereum(self.web3).balanceOf(params['account']) >= int(params['buy']):
            return MAKER_TRANSFER_CONFIRMED

        return WAITING_FOR_TRANSFER
