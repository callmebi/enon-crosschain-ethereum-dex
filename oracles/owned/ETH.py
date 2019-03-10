# -*- coding: utf-8 -*-
##
#  Ethereum network interface 
##
from json import loads

class Ethereum:
    def __init__(self, web3):
        self.web3 = web3

    def balanceOf(self, address):
        return self.web3.eth.getBalance(address)
