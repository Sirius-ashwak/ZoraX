const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CredVault", function () {
  let credVault;
  let owner;
  let creator;
  let supporter;
  let addrs;

  beforeEach(async function () {
    [owner, creator, supporter, ...addrs] = await ethers.getSigners();
    
    const CredVault = await ethers.getContractFactory("CredVault");
    credVault = await CredVault.deploy();
    await credVault.deployed();
  });

  describe("Campaign Creation", function () {
    it("Should create a campaign successfully", async function () {
      const title = "Test Campaign";
      const description = "Test Description";
      const imageUri = "https://example.com/image.jpg";
      const goalAmount = ethers.utils.parseEther("1.0");
      const duration = 86400 * 30; // 30 days

      await expect(
        credVault.connect(creator).createCampaign(
          title,
          description,
          imageUri,
          goalAmount,
          duration
        )
      ).to.emit(credVault, "CampaignCreated");

      const campaign = await credVault.getCampaign(1);
      expect(campaign.title).to.equal(title);
      expect(campaign.creator).to.equal(creator.address);
      expect(campaign.goalAmount).to.equal(goalAmount);
    });

    it("Should create creator profile on first campaign", async function () {
      await credVault.connect(creator).createCampaign(
        "Test Campaign",
        "Description",
        "image.jpg",
        ethers.utils.parseEther("1.0"),
        86400 * 30
      );

      const profile = await credVault.getCreatorProfile(creator.address);
      expect(profile.creator).to.equal(creator.address);
      expect(profile.campaignCount).to.equal(1);
      expect(profile.reputationScore).to.equal(100);
    });
  });

  describe("Campaign Support", function () {
    beforeEach(async function () {
      await credVault.connect(creator).createCampaign(
        "Test Campaign",
        "Description",
        "image.jpg",
        ethers.utils.parseEther("1.0"),
        86400 * 30
      );
    });

    it("Should allow supporters to back campaigns", async function () {
      const supportAmount = ethers.utils.parseEther("0.1");
      const tokenUri = "https://example.com/token/1";

      await expect(
        credVault.connect(supporter).supportCampaign(1, tokenUri, {
          value: supportAmount
        })
      ).to.emit(credVault, "SupportReceived");

      const campaign = await credVault.getCampaign(1);
      expect(campaign.raisedAmount).to.equal(supportAmount);
      expect(campaign.supporterCount).to.equal(1);
    });

    it("Should mint NFT to supporter", async function () {
      const supportAmount = ethers.utils.parseEther("0.1");
      const tokenUri = "https://example.com/token/1";

      await credVault.connect(supporter).supportCampaign(1, tokenUri, {
        value: supportAmount
      });

      expect(await credVault.ownerOf(1)).to.equal(supporter.address);
      expect(await credVault.tokenURI(1)).to.equal(tokenUri);
    });

    it("Should update creator reputation", async function () {
      const supportAmount = ethers.utils.parseEther("0.1");
      
      await credVault.connect(supporter).supportCampaign(1, "tokenUri", {
        value: supportAmount
      });

      const profile = await credVault.getCreatorProfile(creator.address);
      expect(profile.totalRaised).to.equal(supportAmount);
      expect(profile.reputationScore).to.be.gt(100);
    });
  });

  describe("Token Gating", function () {
    beforeEach(async function () {
      await credVault.connect(creator).createCampaign(
        "Test Campaign",
        "Description",
        "image.jpg",
        ethers.utils.parseEther("1.0"),
        86400 * 30
      );
    });

    it("Should verify supporter pass ownership", async function () {
      const supportAmount = ethers.utils.parseEther("0.1");
      
      await credVault.connect(supporter).supportCampaign(1, "tokenUri", {
        value: supportAmount
      });

      expect(await credVault.hasSupporterPass(supporter.address, 1)).to.be.true;
      expect(await credVault.hasSupporterPass(addrs[0].address, 1)).to.be.false;
    });
  });

  describe("Profile Management", function () {
    beforeEach(async function () {
      await credVault.connect(creator).createCampaign(
        "Test Campaign",
        "Description",
        "image.jpg",
        ethers.utils.parseEther("1.0"),
        86400 * 30
      );
    });

    it("Should allow profile updates", async function () {
      const name = "Test Creator";
      const bio = "Test Bio";
      const avatar = "https://example.com/avatar.jpg";

      await credVault.connect(creator).updateCreatorProfile(name, bio, avatar);

      const profile = await credVault.getCreatorProfile(creator.address);
      expect(profile.name).to.equal(name);
      expect(profile.bio).to.equal(bio);
      expect(profile.avatar).to.equal(avatar);
    });
  });
});