#!/usr/bin/python3

import brownie


def test_coin(coin):
    amount = 10000
    coin.setValue(amount) 
    assert coin.getValue() == amount
    
