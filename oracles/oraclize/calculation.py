from json import loads
from blockcypher import get_address_overview
from etherchain import account

# Simple oracle for BTC/ETH swap

# Person whom sell BTC / buy ETH
maker = {}
maker.collateral = os.environ['ARG0']
maker.data = loads(os.environ['ARG1'])

# Person whom sell ETH / buy BTC
taker = {}
taker.collateral = os.environ['ARG2']
taker.data = loads(os.environ['ARG3'])

taker.btc = get_address_overview(taker.data.input)
if taker.btc['balance'] >= taker.data.value:
    print(maker)

maker.eth = etherchain.account(maker.data.input)
if maker.eth['balance'] >= maker.data.value:
    print(taker)
