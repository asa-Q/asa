from web3 import Web3
w3 = Web3(Web3.HTTPProvider("http://127.0.0.1:8454"))
print(w3.isConnected())
