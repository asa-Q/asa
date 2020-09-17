#!/usr/bin/python3
import pytest

@pytest.fixture
def coin(a,Coin):
    yield a[5].deploy(Coin)


@pytest.fixture
def ez_sender(a):
    yield a[0]

@pytest.fixture
def ez_reseiver(a):
    yield a[2]
