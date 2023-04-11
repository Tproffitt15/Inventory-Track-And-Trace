# Cardinal Health: Inventory Track and Trace (ITT) 

Inventory Track and Trace is a blockchain based solution where various players in the healthcare sector, such as manufacturers, distributors, pharmaceutical companies, and healthcare provides can tack a sensitive/class2 drug using NFTs/blockchain. These drugs are represented as NFTs on a permission based/private chain that enable real-time tracking of their status and location as the owner of the NFT changes.

# Installation

First, clone the repository:

```sh
git clone https://gitlab.csi.miamioh.edu/2023-capstone/Inventory_Track_/inventory-track-and-trace-project.git
```
Install dependencies for Hardhat project

```sh
npm install --save-dev chai @nomiclabs/hardhat-ethers ethers @nomicfoundation/hardhat-toolbox @nomicfoundation/hardhat-chai-matchers @openzeppelin/contracts dotenv
```

Install the required dependencies in general

```sh
npm install
```

Include .env file in the root folder of the project
```
REACT_APP_PINATA_KEY=<key>
REACT_APP_PINATA_SECRET=<secret>
QUICKNODE_API_KEY_URL=<URL>
GOERLI_PRIVATE_KEY=<PRIVATE KET>
```

# Smart Contract

Compile the smart contracts

```sh
npx hardhat compile
```

Run the test 

```sh
npx hardhat test
```
To deploy the smart contracts, run the deploy script

```sh
npx hardhat run scripts/deploy.js --network goerli
```

# Frontend

To run the app in development mode

```sh
npm start
```

# Dependencies

[Hardhat](https://hardhat.org/) - a development environment for building and testing Ethereum applications

[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/4.x/) - a library of reusable smart contracts for Ethereum

[Ethers.js](https://docs.ethers.org/v6/) - a library for interacting with Ethereum










