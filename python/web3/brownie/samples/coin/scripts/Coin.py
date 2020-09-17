#!/usr/bin/python3

from brownie import Coin, accounts


def main():
    return Coin.deploy({'from': accounts[0]})
