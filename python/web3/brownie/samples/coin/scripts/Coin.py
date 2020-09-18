#!/usr/bin/python3

from brownie import Coin, accounts


def main():
    coin = Coin.deploy({'from': accounts[0]})
    print(coin.signatures)
    tx = coin.setValue(5000)
    print(tx.info())
    vl = coin.getValue()
    print(vl)
    

