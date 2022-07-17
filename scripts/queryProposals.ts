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
    console.log(process.argv);
    if (process.argv.length < 3) {
        throw new Error("Missing contract address");
    }
    const contractAddress = process.argv[2];
    const ballotContract: Ballot = new Contract(
        contractAddress, ballotJson.abi, signer
    ) as Ballot;
    
    
    // proposals.forEach((element, index) => {
    //     console.log(`Proposal # ${index + 1}: ${element}`);
    // });
    // const ballotContract = new ethers.ContractFactory(
    //     ballotJson.abi, ballotJson.bytecode, signer);
    // const proposal = await ballotContract.proposals(0);
    // const proposals = await ballotContract.connect(signer.address).getProposals();
    const proposals = await ballotContract.proposals;
    // const numProposal = proposals[0].length;
    // console.log(numProposal);
    // const FIELD_ADDR  = 0
    // const FIELD_FUNDS = 1
    // let index = 0;
    // await proposals.wait()
    const first = await proposals(0);
    // const sizex = await proposals.length;
    // console.log(sizex);
    // console.log(first);
    // console.log(proposal);
    console.log(`First Proposal:`)
    console.log(`Name: ${ethers.utils.parseBytes32String(first.name)}`);
    console.log(`Vote Count: ${ethers.utils.formatEther(first.voteCount)}`);

    const second = await proposals(1);
    console.log(`First Proposal:`)
    console.log(`Name: ${ethers.utils.parseBytes32String(second.name)}`);
    console.log(`Vote Count: ${ethers.utils.formatEther(second.voteCount)}`);
    // for (let index = 0; index < PROPOSALS.length; index++) {
    //     const proposal = (await contract.proposals(index)).name;
    // }
    // const contract = await contractFactory.deploy(
    //     convertStringArrayToBytes32(proposals)
    // );
    // await contract.deployed();
    // console.log("phonsoswag");
    // console.log("completed! - phonsoswag");
    // console.log(`Contract deployed at ${contract.address}`);
    const balance1 = await signer.getBalance();
    const decimal1 = parseFloat(ethers.utils.formatEther(balance1));
    // console.log(`Wallet balance ${decimal1}`);
}


main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });