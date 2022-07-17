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
yarn run test
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


## Report

### Contract Deployment

```shell
yarn run ts-node scripts/deploy.ts prop1 prop2 prop3
```
<img width="1061" alt="Screen Shot 2022-07-17 at 11 12 03 PM" src="https://user-images.githubusercontent.com/95614205/179404662-1a7c522f-ee63-4728-af2c-cb976e4beb4c.png">
Contract Address: https://ropsten.etherscan.io/address/0xB53915a629D426EE7E49f10A4de7b2902eCE08e5

### Give Voting Rights
- We give voting rights to two wallets in our demo so that delegation is easier to show as well.
```shell
yarn run ts-node scripts/giveVotingRights.ts 0xB53915a629D426EE7E49f10A4de7b2902eCE08e5 0x93f6C12C3Bc6e70d6a58f159B69c175f04608379 # contract address and voter address

```

<img width="1061" alt="Screen Shot 2022-07-17 at 11 15 32 PM" src="https://user-images.githubusercontent.com/95614205/179404849-e7f2ae72-8a3f-4ed2-bfb5-7fec050a250b.png">
Transaction: https://ropsten.etherscan.io/tx/0xdadab2d914d34a5fe12fdef74367a1b7d5dc8b9310bf5b6a0a8652e25094ea52

```shell
yarn run ts-node scripts/giveVotingRights.ts 0xB53915a629D426EE7E49f10A4de7b2902eCE08e5 0xe1Ec6d073f8c30C24f54eF2867C0C096606CC947  # contract address and voter address
```
<img width="1067" alt="Screen Shot 2022-07-17 at 11 18 05 PM" src="https://user-images.githubusercontent.com/95614205/179404955-23b04653-179b-4a68-a8e5-0ace9ba430d8.png">

Transaction: https://ropsten.etherscan.io/tx/0xfe019f0d2decd5170976c5f3e813cc801c0d18a176888d843d60b41b6958e21b

### Delegating Vote
- First wallet from above delegates to second wallet

```shell
yarn run ts-node scripts/delegateVote.ts 0xB53915a629D426EE7E49f10A4de7b2902eCE08e5 0xe1Ec6d073f8c30C24f54eF2867C0C096606CC947
```
<img width="1067" alt="Screen Shot 2022-07-17 at 11 20 19 PM" src="https://user-images.githubusercontent.com/95614205/179405037-4c0a5391-a855-4e43-a05a-faf524cb934a.png">

Transaction: https://ropsten.etherscan.io/tx/0xfbea4ca7fe9c90644a711772efb6560d161e410024fd691c00e41301f8cd7579

### Casting Vote
```shell
yarn run ts-node scripts/castVote.ts 0xB53915a629D426EE7E49f10A4de7b2902eCE08e5 2 # contract address and proposal index to vote for
```
<img width="1065" alt="Screen Shot 2022-07-17 at 11 22 28 PM" src="https://user-images.githubusercontent.com/95614205/179405116-8a45657c-30e4-456b-b295-cba4c08a1385.png">

Transaction: https://ropsten.etherscan.io/tx/0x996e4d68268aa88481cdb1ec899885ad6e20112cb1a6ef7a6b561e617ef4baff

### Querying Proposals
```shell
yarn run ts-node scripts/queryProposals.ts 0xB53915a629D426EE7E49f10A4de7b2902eCE08e5 0 # contract address and proposal index to query
```
```shell
yarn run ts-node scripts/queryProposals.ts 0xB53915a629D426EE7E49f10A4de7b2902eCE08e5 2 # contract address and proposal index to query
```
<img width="1068" alt="Screen Shot 2022-07-17 at 11 24 33 PM" src="https://user-images.githubusercontent.com/95614205/179405205-530b05c7-2558-4df1-819a-a01a19216f70.png">

### Query Voting Result
```shell
yarn ts-node scripts/queryVotingResults.ts 0xB53915a629D426EE7E49f10A4de7b2902eCE08e5
```

<img width="1069" alt="Screen Shot 2022-07-17 at 11 26 22 PM" src="https://user-images.githubusercontent.com/95614205/179405283-470642ab-9ff0-49f3-a04c-cb278b9fb78f.png">


