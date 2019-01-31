# -*- coding: utf-8 -*-
##
#  Oraclize oracle main
##
from ERC20 import token
from json import loads
from os import environ

def main():
    maker = { 'id': environ['ARG0'], **loads(environ['ARG1']) }
    taker = { 'id': environ['ARG2'], **loads(environ['ARG3']) }

    maker_token = token(maker['token'])
    taker_token = token(taker['token'])

    if maker_token.functions.balanceOf(maker['account']).call() > 0:
        print(taker['id'])
        return

    if taker_token.functions.balanceOf(taker['account']).call() > 0:
        print(maker['id'])
        return

if __name__ == '__main__':
    main()
