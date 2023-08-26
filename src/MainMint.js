import NFTClaim from "./NFTClaim.json";
const ethers = require("ethers")


const nftClaimContractAddress = "0x78Ffb0b9B8a18F70F77161eF598b8fEEDB498Fb0"; // Update the Contract once you deployed on mainnet

const MainMint = ({ accounts, setAccounts }) => {
  const isConnected = Boolean(accounts[0]); //check the wallet connected or not

  async function claimAirdrop() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum); //Basic setup to interact with contract 
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        nftClaimContractAddress,
        NFTClaim.abi,
        signer
      );
      try {
        const response = await contract.claim(); //here we are calling the claim function but we need to pass the nftcommunity contract and NFT ID
        console.log("response: ", response);
      } catch (err) {
        console.log("error:", err);
      }
    }
  }

  return (
    <div className="w-full border-t-2 border-black h-screen">
      <div className="max-w-[1240px] mx-auto p-4">
        <div className=" items-center justify-center">
          <div>
            <h1 className="text-2xl text-white font-bold">Check your eligibility</h1>
          </div>
          {isConnected ? (
            <button className="border-2 border-orange-500 solid p-4 my-5 " onClick={claimAirdrop}>Claim Airdrop</button> //Calling the claimAirdrop function
          ) : (
            <div className="flex items-center justify-center my-5">

            <p className="font-bold text-white text-3xl">Connect your wallet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainMint;
