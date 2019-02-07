# -*- coding: utf-8 -*-
##
#  Oraclize oracle main
##
from ERC20 import Token
from ETH import Ethereum
from BTC import Bitcoin

from json import loads
from os import environ

TOKEN = ''

def main():
    data = loads(environ['ARG0'])
    if data['mode'] == 'ERC20':
        print(Token(data['token']).balanceOf(data['account']))
    elif data['mode'] == 'ETH':
        print(Ethereum().balanceOf(data['account']))
    elif data['mode'] == 'BTC':
        print(Bitcoin().balanceOf(data['account']))
    else:
        # Unknown mode, return negative balance
        print('-1')

if __name__ == '__main__':
    main()
