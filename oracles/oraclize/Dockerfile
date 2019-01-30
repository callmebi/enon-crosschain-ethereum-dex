FROM frolvlad/alpine-python3
MAINTAINER akru "mail@akru.me"

COPY main.py ERC20.py /

RUN apk add --no-cache build-base python3-dev && pip3 install web3
CMD python main.py
