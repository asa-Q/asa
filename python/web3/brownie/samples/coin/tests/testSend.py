#!/usr/bin/python3

import brownie


def test_coin_send(coin,ez_sender):
    ez_amt = 5000
    coin.send(ez_sender,ez_amt);
    assert a == 1 
    
