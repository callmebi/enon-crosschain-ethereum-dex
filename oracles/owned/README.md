Standalone BTC/ETH trade oracle
===============================

This is dockerized standalone application that could be used as oracle for External
Owned Account on Ethereum network. Application as actor of DEX transfer confirmation
process just track incoming transfer and send transaction to DEX contract when confirmation
is needed (in case of transfer confirmed) and no action when transfer is not complete. 

Deploy oracle contract
----------------------

Launch truffle console in source repo:

    truffle console --network kovan

In console deploy owned oracle contract setting DEX address and oracle application address:

    > tx = await OwnedOracle.new(Exchange.address, '0x...')
    > tx.address
    '0x...'

This address will be used in next section.

Run oracle
----------

In source repo do a command:

    cd oracles/owned
    docker build .

When docker image for oracle builded just launch it:

    export EXCHANGE_ADDRESS=0x0a7FBfd6C6eaB1e06b0a21Ab2Dd0CAEfaD2957B9
    export ORACLE_ADDRESS=0x15a2D6f3d425d2358cE27f46BC2AE3Bd8211C498
    export PRIVATE_KEY=...
    docker run --rm -e ARG0=$EXCHANGE_ADDRESS -e ARG1=$ORACLE_ADDRESS -e ARG2=$PRIVATE_KEY 75d72013d7ea

Register oracle on market
-------------------------

Anyone can create (if it isn't registered before) their own market ID for given
oracle set, params and timeouts. To register new oracle just create market with
new oracle in a set.

Launch truffle console in source repo:

    truffle console --network kovan

In console send transaction to truffle contract with oracle address:

    > const dex = await Exchange.deployed()
    > tx = await dex.addMarket(1000, 1000, [ '0x...' ], 1)
    > tx.logs

In transaction log market id with your oracle is presented.
