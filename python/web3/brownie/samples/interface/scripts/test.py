import json
from web3 import Web3
from brownie import StrategyEZZC,accounts
# Fill in your infura API key here
infura_url = "http://localhost:8545"

def main():
    web3 = Web3(Web3.HTTPProvider(infura_url))
    ezzc =  StrategyEZZC.deploy(accounts[2],{'from':accounts[1]})

if __name__ == '__main__':
    main()


