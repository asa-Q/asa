import json

from web3 import Web3, HTTPProvider
w3url = "http://localhost:8545"
w3 = Web3(HTTPProvider(w3url))
print(w3.isConnected())
