import json
from web3 import Web3
from brownie import EZZC,accounts
# Fill in your infura API key here
infura_url = "http://localhost:8545"

def main():
    web3 = Web3(Web3.HTTPProvider(infura_url))
    ezzc =  EZZC.deploy({'from':accounts[0]})
    ezzc.say.call()

if __name__ == '__main__':
    main()


