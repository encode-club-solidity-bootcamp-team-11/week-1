# Encode Club-Solidity Bootcamp July - Weekend Proejct (Week 1)

* Form groups of 3 to 5 students
* Structure scripts to
  * Deploy
  * Query proposals
  * Give vote right passing an address as input
  * Cast a vote to a ballot passing contract address and proposal as input and using the wallet in environment
  * Delegate my vote passing  user address as input and using the wallet in environment
  * Query voting result and print to console
* Publish the project in Github
* Run the scripts with a set of proposals, cast and delegate votes and inspect results
* Write a report detailing the addresses, transaction hashes, description of the operation script being executed and console output from script execution for each step (Deployment, giving voting rights, casting/delegating and querying results).
* (Extra) Use TDD methodology


## Run Tests

```shell
yarn install
yarn hardhat test
```

## Run deployment script

```shell
yarn hardhat node
yarn hardhat run scripts/deploy.ts
```

## List all accounts

```shell
yarn hardhat run scripts/accounts.ts
```

## Team (Group 11)

* Phonso (breedmasterswag#2193)
* cypherx#2778
* Samnang Chhun (samnang#5278)
* Sereyboth Chamroeun (sereyboth#7251)
