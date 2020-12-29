# Estate

## Project Resources
* [Remix - Solidity IDE](https://remix.ethereum.org/)
* [Visual Studio Code](https://code.visualstudio.com/)
* [Truffle Framework](https://truffleframework.com/)
* [Ganache - One Click Blockchain](https://truffleframework.com/ganache)
* [Open Zeppelin](https://openzeppelin.org/)
* [Interactive zero knowledge 3-colorability demonstration](http://web.mit.edu/~ezyang/Public/graph/svg.html)
* [Docker](https://docs.docker.com/install/)
* [ZoKrates](https://github.com/Zokrates/ZoKrates)

## How to test
#### Install dependencies
```
npm install
```
#### Compile the contracts
```
cd eth-contracts
truffle compile
```
#### Start Ganache on port 7545
#### Run the tests
```
truffle test
```
#### Deploy the contracts and save the contract address of TestSolnSquareVerifier
```
truffle migrate --network rinkeby
```
#### Mint tokens using Myether wallet
Using the `ABI.json` and the contract address of above step
https://www.myetherwallet.com/interface/interact-with-contract
#### Sell these tokens in OpenSea
https://rinkeby.opensea.io/assets/{contract_address}/{token_id}
#### View all you minted token in Opensea
https://rinkeby.opensea.io/assets/{token_name}

## Deployment details
* Open Sea merketplace: https://testnets.opensea.io/assets/estate-v5
* Contract Verifier: 0x4471bA3e65A027945b640A2E6B91c84f265F571F
* Contract SolnSquareVerifier: 0x4e384C81C403dB0fa70532F46fd020D85C8De899
* Contract ABIs: https://jsonblob.com/1fe630ff-49c0-11eb-91e7-71f3b2b33c0d

## Properties created and sold
* https://testnets.opensea.io/assets/0x4e384c81c403db0fa70532f46fd020d85c8de899/5
* https://testnets.opensea.io/assets/0x4e384c81c403db0fa70532f46fd020d85c8de899/4
* https://testnets.opensea.io/assets/0x4e384c81c403db0fa70532f46fd020d85c8de899/3
* https://testnets.opensea.io/assets/0x4e384c81c403db0fa70532f46fd020d85c8de899/2
* https://testnets.opensea.io/assets/0x4e384c81c403db0fa70532f46fd020d85c8de899/1