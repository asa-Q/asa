import pytest
import brownie

from brownie import (
    VaultEZZC,
)


@pytest.mark.parametrize("Vault", [VaultEZZC])
def test_vault_deployment(gov, token, controller, Vault):
    vault = gov.deploy(Vault, token, controller)
    # Addresses
    assert vault.governance() == gov
    assert vault.controller() == controller
    assert vault.token() == token
    # UI Stuff
    assert vault.name() == "yearn " + token.name()
    assert vault.symbol() == "y" + token.symbol()
    assert vault.decimals() == token.decimals()


@pytest.mark.parametrize("Vault", [VaultEZZC])
def test_vault_setGovernance(accounts, gov, token, controller, Vault):
    vault = gov.deploy(Vault, token, controller)
    # Only governance can set
    with brownie.reverts("!governance"):
        vault.setGovernance(accounts[1], {"from": accounts[1]})
    vault.setGovernance(accounts[1], {"from": gov})
    assert vault.governance() == accounts[1]
    with brownie.reverts("!governance"):
        vault.setGovernance(gov, {"from": gov})


@pytest.mark.parametrize("Vault", [VaultEZZC])
def test_vault_setController(accounts, gov, token, controller, Vault):
    vault = gov.deploy(Vault, token, controller)
    # Only governance can set
    with brownie.reverts("!governance"):
        vault.setController(accounts[1], {"from": accounts[1]})
    vault.setController(accounts[1], {"from": gov})
    assert vault.controller() == accounts[1]


def test_vault_params(gov, controller, token):
    vault = gov.deploy(VaultEZZC, token, controller)
    # Parameters
    assert vault.min() == 9500
    assert vault.max() == 10000


def test_vault_setMin(accounts, gov, token, controller):
    vault = gov.deploy(VaultEZZC, token, controller)
    # Only governance can set
    with brownie.reverts("!governance"):
        vault.setMin(600, {"from": accounts[1]})
    vault.setMin(600, {"from": gov})
    assert vault.min() == 600


