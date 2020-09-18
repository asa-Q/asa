#!/usr/bin/python3
import pytest
@pytest.fixture
def coin(a,Coin):
    yield a[0].deploy(Coin)


