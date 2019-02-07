# -*- coding: utf-8 -*-
##
#  Bitcoin network interface 
##
from blockcypher import get_address_overview

class Bitcoin:
    def balanceOf(self, address):
        return get_address_overview(address)['balance']
