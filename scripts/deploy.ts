import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { ethers } from "hardhat";
import { Ballot } from "../typechain-types";

const PROPOSALS = ["Proposal 1", "Proposal 2", "Proposal 3"];

async function main() {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const ballotFactory = await ethers.getContractFactory("Ballot");
  const contract: Ballot = await ballotFactory.connect(signers[0]).deploy(
    PROPOSALS.map(s => ethers.utils.formatBytes32String(s))
  );
  await contract.deployed();

  console.log("Ballot deployed to: ", contract.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
