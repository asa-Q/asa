import pytest


@pytest.fixture
def rewards(a):
    yield a[2]


@pytest.fixture
def gov(a):
    yield a[3]


@pytest.fixture
def token(a, VaultEZZC):
    # MUst be ERC20
    yield a[0].deploy(VaultEZZC)


@pytest.fixture
def controller(a):
    yield a[4]

