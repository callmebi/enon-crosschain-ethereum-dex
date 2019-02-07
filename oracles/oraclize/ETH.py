# -*- coding: utf-8 -*-
##
#  Ethereum network interface 
##
from json import loads
from web3 import Web3, HTTPProvider

WEB3_PROVIDER = 'https://kovan.infura.io/v3/4023cac5af2548e682ffe03d06c5dfef'

class Ethereum:
    def __init__(self):
        self.web3 = Web3(HTTPProvider(WEB3_PROVIDER))

    def balanceOf(self, address):
        return self.web3.eth.getBalance(address)
