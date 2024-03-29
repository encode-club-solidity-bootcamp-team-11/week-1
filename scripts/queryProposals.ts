import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../artifacts/contracts/Ballot.sol/Ballot.json";
import { Ballot } from "../typechain-types";

// This key is already public on Herong's Tutorial Examples - v1.03, by Dr. Herong Yang
// Do never expose your keys like this
const EXPOSED_KEY =
  "8da4ef21b864d2cc526dbdb2a120bd2874c36c9d0a1fb7f8c63d7f7a8b41de8f";


async function main() {
  const wallet =
    process.env.MNEMONIC && process.env.MNEMONIC.length > 0
      ? ethers.Wallet.fromMnemonic(process.env.MNEMONIC)
      : new ethers.Wallet(process.env.PRIVATE_KEY ?? EXPOSED_KEY);

  console.log(`Using address ${wallet.address}`);
  const provider = new ethers.providers.InfuraProvider(
    "ropsten", process.env.INFURA_PROJ_ID);
  const signer = wallet.connect(provider);
  const balance = await signer.getBalance();
  const decimal = parseFloat(ethers.utils.formatEther(balance));
  console.log(`Wallet balance ${decimal}`);

  if (process.argv.length < 3) {
    throw new Error("Missing contract address");
  }
  if (process.argv.length < 4) {
    throw new Error("No proposal index specified");
  }
  const contractAddress = process.argv[2];
  const proposalInput = process.argv[3];
  const proposalNumber = parseInt(proposalInput);

  const ballotContract: Ballot = new Contract(
    contractAddress, ballotJson.abi, signer
  ) as Ballot;


  const proposal = await ballotContract.proposals(proposalNumber);

  console.log(`First Proposal:`)
  console.log(`Name: ${ethers.utils.parseBytes32String(proposal.name)}`);
  console.log(`Vote Count: ${(proposal.voteCount)}`);

}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
