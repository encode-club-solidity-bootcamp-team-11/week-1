import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../artifacts/contracts/Ballot.sol/Ballot.json";
// eslint-disable-next-line node/no-missing-import
import { Ballot } from "../typechain-types";
import { expect } from "chai";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";

async function main() {
    const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(process.env.VOTER_PRIV_KEY ?? EXPOSED_KEY);

    console.log(`Using address ${wallet.address}`);
    const provider = new ethers.providers.InfuraProvider(
        "ropsten", process.env.INFURA_PROJ_ID);
    const signer = wallet.connect(provider);
    const balance = await signer.getBalance();
    const decimal = parseFloat(ethers.utils.formatEther(balance));
    console.log(`Wallet balance ${decimal}`);

  if (decimal < 0.01) {
    throw new Error("Not enough ether");
  }

  if (process.argv.length < 3) throw new Error("Ballot address missing");
  const ballotAddress = process.argv[2];
  if (process.argv.length < 4) throw new Error("Proposal to vote on missing");
  const proposalInput = process.argv[3];

  console.log(
    `Attaching ballot contract interface to address ${ballotAddress}`
  );

  const ballotContract: Ballot = new Contract(
    ballotAddress,
    ballotJson.abi,
    signer
  ) as Ballot;


    
    const proposalNumber = parseInt(proposalInput);
    const voterVoted = (await ballotContract.voters(signer.address)).voted;
    const voterWeight =  (await ballotContract.voters(signer.address)).weight.toNumber();

    console.log(`Voter voted: ${voterVoted}`);
    console.log(`Voter Weight: ${voterWeight}`);

    if (voterWeight < 1) {
        throw new Error("Voter can't vote");
    }
    if (voterVoted === true) {
        throw new Error("Voter address already voted");
      }
    

    const proposal = await ballotContract.proposals(proposalNumber);
    console.log(`Proposal # of Votes: ${ethers.utils.formatEther(proposal.voteCount)}`)
    console.log(`${signer.address} is casting vote for ${ethers.utils.parseBytes32String(proposal.name)}`)
    const vote = await ballotContract.connect(signer).vote(proposalNumber);
    console.log("Awaiting confirmations");
    await vote.wait();
    console.log(`Transaction completed. Hash: ${vote.hash}`);
    const proposalAfter = await ballotContract.proposals(proposalNumber);
    console.log(`Proposal # of Votes: ${ethers.utils.formatEther(proposalAfter.voteCount)}}`)
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });