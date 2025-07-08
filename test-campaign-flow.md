# 🧪 Campaign Creation Flow Test Guide

## Prerequisites
✅ Environment configured with all API keys
✅ Dependencies installed
✅ No compilation errors

## Step-by-Step Test Instructions

### 1. Start Backend Server
```powershell
cd backend
npm run dev
```
**Expected:** Server starts on `http://localhost:3001`

### 2. Start Frontend Server
```powershell
# In new terminal, from root directory
npm run dev
```
**Expected:** Frontend starts on `http://localhost:5173`

### 3. Test Wallet Connection
1. Open `http://localhost:5173`
2. Click "Connect Wallet" 
3. Select wallet provider (MetaMask, WalletConnect)
4. Connect to Optimism network

**Expected:** Wallet connects, user sees connected address

### 4. Access Creator Dashboard
1. Navigate to Dashboard (should auto-redirect after wallet connect)
2. Verify empty state shows "Create New Campaign" button

**Expected:** Clean dashboard with campaign creation CTA

### 5. Start Campaign Creation
1. Click "Create New Campaign" button
2. Verify multi-step form opens

**Expected:** Step 1 of campaign form appears

### 6. Test Form Steps

#### Step 1: Basic Information
- **NFT Name:** "Test Campaign NFT"
- **NFT Symbol:** Auto-generated "TCN"
- **Description:** "This is a test campaign for CredVault MVP"
- **Duration:** 30 days (default)

**Expected:** Form validation works, "Next" button enables

#### Step 2: NFT Configuration  
- **Supply:** 100 tokens
- **Price per NFT:** 0.001 ETH
- **Royalty:** 5%

**Expected:** Validation for numbers, price formatting

#### Step 3: Artwork Upload
- Upload a test image (JPG/PNG)
- Verify image preview appears
- Check file size validation

**Expected:** Drag-and-drop works, preview shows, IPFS ready

#### Step 4: Perks Description
- **Perk Title:** "Early Supporter Access"  
- **Perk Description:** "Get exclusive access to future drops"

**Expected:** Text fields work, character limits enforced

#### Step 5: Review & Deploy
- Review all information
- Check gas estimation appears
- Verify deployment cost estimate

**Expected:** Gas estimator shows real costs in ETH/USD

### 7. Test Campaign Deployment
1. Click "Deploy Campaign"
2. Monitor deployment status:
   - IPFS upload status
   - Contract deployment progress
   - Transaction confirmation

**Expected:** 
- Progress indicators work
- IPFS upload succeeds  
- Contract deploys on Optimism
- Campaign appears in dashboard

### 8. Verify Campaign Dashboard
1. Return to dashboard
2. Check new campaign appears
3. Verify campaign details display correctly

**Expected:** Campaign card shows correct info

## Test Scenarios to Cover

### Happy Path ✅
- Complete campaign creation flow
- All validation passes
- Successful deployment
- Campaign appears in dashboard

### Error Handling 🚨
- Network disconnection during deployment
- Invalid file upload
- Insufficient gas fees
- Form validation errors

### Edge Cases 🔍
- Very large supply numbers
- Special characters in descriptions
- Different image formats
- Mobile responsiveness

## Expected Results

### Backend API Endpoints
- `GET /api/health` → 200 OK
- `POST /api/campaigns` → 201 Created
- `GET /api/campaigns` → 200 OK with campaigns

### Frontend Components
- All form steps render correctly
- Validation works on all fields
- Gas estimation displays real data
- Loading states show during operations
- Error messages are user-friendly

### Blockchain Integration
- Zora contract deployment succeeds
- IPFS metadata upload works
- Transaction monitoring functions
- Campaign status updates correctly

## Troubleshooting Common Issues

### If Backend Won't Start:
```powershell
cd backend
npm install
npm run dev
```

### If Frontend Won't Start:
```powershell
npm install
npm run dev
```

### If Gas Estimation Fails:
- Check Optimism RPC URL in .env
- Verify wallet is connected
- Confirm network is Optimism

### If IPFS Upload Fails:
- Verify VITE_INFURA_IPFS_AUTH in .env
- Check file size (max 10MB)
- Ensure valid image format

### If Contract Deployment Fails:
- Check PRIVATE_KEY is set (for testing)
- Verify sufficient ETH balance
- Confirm Zora SDK is working

## Success Criteria ✅

The test is successful when:
1. ✅ Backend API responds correctly
2. ✅ Frontend loads without errors  
3. ✅ Wallet connection works
4. ✅ All form steps complete
5. ✅ File upload succeeds
6. ✅ Gas estimation shows real data
7. ✅ Campaign deploys to blockchain
8. ✅ Dashboard updates with new campaign

This confirms Task 3 is 100% functional! 🚀
