# -*- coding: utf-8 -*-
##
#  Oraclize oracle main
##
from ERC20 import token
from json import loads
from os import environ

TOKEN = ''

def main():
    data = loads(environ['ARG0'])
    print(token(data['token']).functions.balanceOf(data['account']).call())

if __name__ == '__main__':
    main()
