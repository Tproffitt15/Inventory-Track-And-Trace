# Inventory Track and Trace (ITT) 

ITT is a blockchain based solution where various players in the healthcare sector, such as manufacturers, distributors, pharmaceutical companies, and healthcare provides can tack a sensitive/class2 drug using NFTs/blockchain. These drugs are represented as NFTs on a permission based/private chain.

## Getting Started

First, clone the repository:

```sh
git clone https://gitlab.csi.miamioh.edu/2023-capstone/Inventory_Track_/inventory-track-and-trace-project.git
```

Install the required dependencies

```sh
npm install
```

Compile the smart contracts

```sh
npx hardhat compile
```

Run the test 

```sh
npx hardhat test
```

## Dependencies

[Hardhat](https://hardhat.org/) - a development environment for building and testing Ethereum applications

[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/4.x/) - a library of reusable smart contracts for Ethereum

[Ethers.js](https://docs.ethers.org/v6/) - a library for interacting with Ethereum

## Deployment

To deploy the smart contracts, run the deploy script

```sh
npx hardhat run scripts/deploy.js --network goerli
```







