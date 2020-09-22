#!/usr/bin/python3

from brownie import EZZC, accounts


def main():
    ezzc = EZZC.deploy({'from': accounts[0]})
    print(ezzc.signatures)
    

