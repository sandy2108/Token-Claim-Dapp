const hre = require("hardhat");

const tokenAddress = "0xE7A9f961Db05aB558227E69D504199941c79a947";

const nftcommunities = [
  "0xED5AF388653567Af2F388E6224dC7C4b3241C544",
  "0x77372a4cc66063575b05b44481F059BE356964A4",
  "0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D",
  "0x49cF6f5d44E70224e2E23fDcdd2C053F30aDA28B",
  "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
  "0x8821BeE2ba0dF28761AffF119D66390D594CD280",
  "0x8a90CAb2b38dba80c64b7734e58Ee1dB38B8992e",
  "0x5Af0D9827E0c53E4799BB226655A1de152A425a5",
  "0x23581767a106ae21c074b2276D25e5C3e136a68b",
  "0x60E4d786628Fea6478F785A6d7e704777c86a7c6",
  "0x6339e5E072086621540D0362C4e3Cea0d643E114",
  "0xBd3531dA5CF5857e7CfAA92426877b022e612cf8",
  "0x364C828eE171616a39897688A831c2499aD972ec",
  "0x769272677faB02575E84945F03Eca517ACc544Cc",
];

async function main() {
  const NFTClaim = await hre.ethers.getContractFactory("NFTClaim");
  const nFTClaim = await NFTClaim.deploy(tokenAddress, nftcommunities);


  console.log("Airdrop contract deployed to:", await nFTClaim.getAddress());
}

main()
.then(()=>process.exit(0))
.catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
