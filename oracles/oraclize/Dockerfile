FROM frolvlad/alpine-python3
MAINTAINER akru "mail@akru.me"
RUN apk add --no-cache build-base python3-dev && pip3 install web3 ipfsapi blockcypher
COPY main.py Oracle.py Exchange.py ERC20.py ETH.py BTC.py /
CMD python main.py
