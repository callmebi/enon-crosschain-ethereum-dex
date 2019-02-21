# -*- coding: utf-8 -*-
##
#  Oraclize oracle main
##
from os import environ
from Oracle import Oracle

if __name__ == '__main__':
    Oracle(environ['ARG0'], environ['ARG1']).main()
