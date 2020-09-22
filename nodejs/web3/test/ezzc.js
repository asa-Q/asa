const EZZC = artifacts.require("EZZC");

contract('EZZC', (accounts) => {
  it('should put 10000 MetaCoin in the first account', async () => {
    const ezzCoinInstance = await EZZC.deployed();
    const balance = await ezzCoinInstance.getBalance.call(accounts[0]);

    assert.equal(balance.valueOf(), 10000, "10000 wasn't in the first account");
  });
  it('should call a function that depends on a linked library', async () => {
    const ezzCoinInstance = await EZZC.deployed();
    const ezzCoinBalance = (await ezzCoinInstance.getBalance.call(accounts[0])).toNumber();
    const ezzCoinEthBalance = (await ezzCoinInstance.getBalanceInEth.call(accounts[0])).toNumber();

    assert.equal(ezzCoinEthBalance, 2 * ezzCoinBalance, 'Library function returned unexpected function, linkage may be broken');
  });
  it('should send coin correctly', async () => {
    const ezzCoinInstance = await EZZC.deployed();

    // Setup 2 accounts.
    const accountOne = accounts[0];
    const accountTwo = accounts[1];

    // Get initial balances of first and second account.
    const accountOneStartingBalance = (await ezzCoinInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoStartingBalance = (await ezzCoinInstance.getBalance.call(accountTwo)).toNumber();

    // Make transaction from first account to second.
    const amount = 10;
    await ezzCoinInstance.sendCoin(accountTwo, amount, { from: accountOne });

    // Get balances of first and second account after the transactions.
    const accountOneEndingBalance = (await ezzCoinInstance.getBalance.call(accountOne)).toNumber();
    const accountTwoEndingBalance = (await ezzCoinInstance.getBalance.call(accountTwo)).toNumber();


    assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
    assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  });
});
