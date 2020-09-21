import json
from web3 import Web3
from brownie import StrategyEZZC,VaultEZZC,accounts
# Fill in your infura API key here
infura_url = "http://localhost:8545"

def main():
    web3 = Web3(Web3.HTTPProvider(infura_url))
    gov = accounts[3]
    controller = accounts[4]
    receiver = accounts[5]
    strategy = gov.deploy(StrategyEZZC,controller)
    print(strategy.getName())
    print('The governance address:')
    print(strategy.governance())
    print('Controller balance:')
    print(controller.balance())
    controller.transfer(receiver,5000)
    print(controller.balance())


if __name__ == '__main__':
    main()


