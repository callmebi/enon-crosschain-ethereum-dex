FROM frolvlad/alpine-python3
MAINTAINER akru "mail@akru.me"

COPY calculation.py /

RUN pip3 install blockcypher pyetherchain
CMD python calculation.py
