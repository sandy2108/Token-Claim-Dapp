// SPDX-License-Identifier: MIT LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTClaim is Ownable {
    IERC20 public token;
    address[] public nftCommunities;
    mapping(address => bool) public hasDistributed;
    mapping(address => bool) public hasClaimedForCollection;
    mapping(address => mapping(uint256 => bool)) public hasClaimedNFT;
    
    bool public isAirdropActive;
    
    // Map each NFT community to its airdrop amount
    mapping(address => uint256) public airdropAmounts;

    constructor(address tokenAddress, address[] memory nftCommunityAddresses) {
        token = IERC20(tokenAddress);
        nftCommunities = nftCommunityAddresses;
        isAirdropActive = false;
    }

    function setTokenContract(address tokenAddress) external onlyOwner {
        token = IERC20(tokenAddress);
    }
    
    // Set airdrop amount for a specific NFT community
    function setAirdropAmountForCommunity(address nftCommunity, uint256 _airdropAmount) external onlyOwner {
        airdropAmounts[nftCommunity] = _airdropAmount;
    }
    
    function getAirdropAmountForCommunity(address nftCommunity) external view returns(uint256) {
        return airdropAmounts[nftCommunity];
    }

    function setNFTCommunities(address[] memory nftCommunityAddresses) external onlyOwner {
        nftCommunities = nftCommunityAddresses;
    }

    function updateAirdropStatus(bool active) external onlyOwner {
        isAirdropActive = active;
    }

    function claim(address nftCommunity, uint256 nftId) external {
        require(isAirdropActive, "Airdrop is not active");
        require(hasClaimedNFT[nftCommunity][nftId] == false, "NFT already claimed");
        require(hasEligibleNFT(msg.sender, nftCommunity, nftId), "Address is not eligible for airdrop with this NFT");

        hasClaimedNFT[nftCommunity][nftId] = true;

        uint256 amountToTransfer = airdropAmounts[nftCommunity];
        token.transfer(msg.sender, amountToTransfer);
    }

    function hasEligibleNFT(address user, address nftCommunity, uint256 nftId) internal view returns (bool) {
        return IERC721(nftCommunity).balanceOf(user) > 0 && IERC721(nftCommunity).ownerOf(nftId) == user;
    }

    function withdrawExcessTokens(address tokenAddress, uint256 amount) external onlyOwner { 
        IERC20 erc20Token = IERC20(tokenAddress);
        require(erc20Token.transfer(owner(), amount), "Token transfer failed");
    }

    function withdrawStuckETH() public onlyOwner {
        bool success;
        (success, ) = address(msg.sender).call{value: address(this).balance}(
            ""
        );
    }
}