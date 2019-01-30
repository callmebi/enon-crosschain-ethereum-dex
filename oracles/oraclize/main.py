# -*- coding: utf-8 -*-
##
#  Oraclize oracle main
##
from json import loads
from ERC20 import token

def main():
    maker = {}
    maker.account = os.environ['ARG0']
    maker.data = loads(os.environ['ARG1'])
    maker.token = token(maker.data.token_address)
    
    taker = {}
    taker.account = os.environ['ARG2']
    taker.data = loads(os.environ['ARG3'])
    taker.token = token(taker.data.token_address)

    if maker.token.functions.balanceOf(maker.data.account_address).call() > 0:
        print(taker.account)
        return

    if taker.token.functions.balanceOf(taker.data.account_address).call() > 0:
        print(maker.account)
        return

if __name__ == '__main__':
    main()
