// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title CredVault
 * @dev Main contract for CredVault platform - handles campaigns, supporter passes, and reputation
 */
contract CredVault is ERC721URIStorage, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    Counters.Counter private _campaignIds;
    
    struct Campaign {
        uint256 id;
        address creator;
        string title;
        string description;
        string imageUri;
        uint256 goalAmount;
        uint256 raisedAmount;
        uint256 supporterCount;
        uint256 endTime;
        bool isActive;
        uint256 createdAt;
    }
    
    struct SupporterPass {
        uint256 campaignId;
        address supporter;
        uint256 amount;
        uint256 tier;
        uint256 mintedAt;
    }
    
    struct CreatorProfile {
        address creator;
        string name;
        string bio;
        string avatar;
        uint256 totalRaised;
        uint256 totalSupporters;
        uint256 campaignCount;
        uint256 reputationScore;
        uint256 joinedAt;
    }
    
    // Mappings
    mapping(uint256 => Campaign) public campaigns;
    mapping(uint256 => SupporterPass) public supporterPasses;
    mapping(address => CreatorProfile) public creatorProfiles;
    mapping(address => uint256[]) public creatorCampaigns;
    mapping(address => uint256[]) public supporterTokens;
    mapping(uint256 => uint256[]) public campaignSupporters;
    
    // Events
    event CampaignCreated(uint256 indexed campaignId, address indexed creator, string title, uint256 goalAmount);
    event SupportReceived(uint256 indexed campaignId, address indexed supporter, uint256 amount, uint256 tokenId);
    event CampaignCompleted(uint256 indexed campaignId, uint256 totalRaised);
    event ReputationUpdated(address indexed creator, uint256 newScore);
    
    constructor() ERC721("CredVault Supporter Pass", "CVSP") {}
    
    /**
     * @dev Create a new campaign
     */
    function createCampaign(
        string memory _title,
        string memory _description,
        string memory _imageUri,
        uint256 _goalAmount,
        uint256 _duration
    ) external returns (uint256) {
        require(_goalAmount > 0, "Goal amount must be greater than 0");
        require(_duration > 0, "Duration must be greater than 0");
        
        _campaignIds.increment();
        uint256 campaignId = _campaignIds.current();
        
        campaigns[campaignId] = Campaign({
            id: campaignId,
            creator: msg.sender,
            title: _title,
            description: _description,
            imageUri: _imageUri,
            goalAmount: _goalAmount,
            raisedAmount: 0,
            supporterCount: 0,
            endTime: block.timestamp + _duration,
            isActive: true,
            createdAt: block.timestamp
        });
        
        creatorCampaigns[msg.sender].push(campaignId);
        
        // Update or create creator profile
        if (creatorProfiles[msg.sender].creator == address(0)) {
            creatorProfiles[msg.sender] = CreatorProfile({
                creator: msg.sender,
                name: "",
                bio: "",
                avatar: "",
                totalRaised: 0,
                totalSupporters: 0,
                campaignCount: 1,
                reputationScore: 100, // Starting score
                joinedAt: block.timestamp
            });
        } else {
            creatorProfiles[msg.sender].campaignCount++;
        }
        
        emit CampaignCreated(campaignId, msg.sender, _title, _goalAmount);
        return campaignId;
    }
    
    /**
     * @dev Support a campaign by minting a supporter pass NFT
     */
    function supportCampaign(uint256 _campaignId, string memory _tokenUri) 
        external 
        payable 
        nonReentrant 
    {
        Campaign storage campaign = campaigns[_campaignId];
        require(campaign.isActive, "Campaign is not active");
        require(block.timestamp < campaign.endTime, "Campaign has ended");
        require(msg.value > 0, "Support amount must be greater than 0");
        
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        
        // Mint supporter pass NFT
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, _tokenUri);
        
        // Determine tier based on contribution amount
        uint256 tier = _calculateTier(msg.value);
        
        // Store supporter pass data
        supporterPasses[tokenId] = SupporterPass({
            campaignId: _campaignId,
            supporter: msg.sender,
            amount: msg.value,
            tier: tier,
            mintedAt: block.timestamp
        });
        
        // Update campaign data
        campaign.raisedAmount += msg.value;
        campaign.supporterCount++;
        campaignSupporters[_campaignId].push(tokenId);
        supporterTokens[msg.sender].push(tokenId);
        
        // Transfer funds to creator
        payable(campaign.creator).transfer(msg.value);
        
        // Update creator reputation
        _updateCreatorReputation(campaign.creator, msg.value);
        
        emit SupportReceived(_campaignId, msg.sender, msg.value, tokenId);
        
        // Check if campaign goal is reached
        if (campaign.raisedAmount >= campaign.goalAmount) {
            campaign.isActive = false;
            emit CampaignCompleted(_campaignId, campaign.raisedAmount);
        }
    }
    
    /**
     * @dev Update creator profile information
     */
    function updateCreatorProfile(
        string memory _name,
        string memory _bio,
        string memory _avatar
    ) external {
        require(creatorProfiles[msg.sender].creator != address(0), "Profile does not exist");
        
        CreatorProfile storage profile = creatorProfiles[msg.sender];
        profile.name = _name;
        profile.bio = _bio;
        profile.avatar = _avatar;
    }
    
    /**
     * @dev Calculate supporter tier based on contribution amount
     */
    function _calculateTier(uint256 _amount) internal pure returns (uint256) {
        if (_amount >= 1 ether) return 3; // Gold
        if (_amount >= 0.1 ether) return 2; // Silver
        return 1; // Bronze
    }
    
    /**
     * @dev Update creator reputation score
     */
    function _updateCreatorReputation(address _creator, uint256 _contribution) internal {
        CreatorProfile storage profile = creatorProfiles[_creator];
        profile.totalRaised += _contribution;
        
        // Simple reputation calculation (can be made more sophisticated)
        uint256 baseScore = 100;
        uint256 raisedBonus = profile.totalRaised / 0.01 ether; // 1 point per 0.01 ETH
        uint256 campaignBonus = profile.campaignCount * 50;
        uint256 supporterBonus = profile.totalSupporters * 10;
        
        profile.reputationScore = baseScore + raisedBonus + campaignBonus + supporterBonus;
        
        emit ReputationUpdated(_creator, profile.reputationScore);
    }
    
    /**
     * @dev Get campaign details
     */
    function getCampaign(uint256 _campaignId) external view returns (Campaign memory) {
        return campaigns[_campaignId];
    }
    
    /**
     * @dev Get creator profile
     */
    function getCreatorProfile(address _creator) external view returns (CreatorProfile memory) {
        return creatorProfiles[_creator];
    }
    
    /**
     * @dev Get supporter pass details
     */
    function getSupporterPass(uint256 _tokenId) external view returns (SupporterPass memory) {
        return supporterPasses[_tokenId];
    }
    
    /**
     * @dev Get campaigns created by a creator
     */
    function getCreatorCampaigns(address _creator) external view returns (uint256[] memory) {
        return creatorCampaigns[_creator];
    }
    
    /**
     * @dev Get supporter tokens owned by an address
     */
    function getSupporterTokens(address _supporter) external view returns (uint256[] memory) {
        return supporterTokens[_supporter];
    }
    
    /**
     * @dev Get total number of campaigns
     */
    function getTotalCampaigns() external view returns (uint256) {
        return _campaignIds.current();
    }
    
    /**
     * @dev Check if user has supporter pass for campaign (for token gating)
     */
    function hasSupporterPass(address _user, uint256 _campaignId) external view returns (bool) {
        uint256[] memory tokens = supporterTokens[_user];
        for (uint256 i = 0; i < tokens.length; i++) {
            if (supporterPasses[tokens[i]].campaignId == _campaignId) {
                return true;
            }
        }
        return false;
    }
}