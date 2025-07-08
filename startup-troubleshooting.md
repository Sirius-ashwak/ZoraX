# 🚨 App Startup Troubleshooting Guide

## Current Status Check

### ✅ Task 2: Onboarding Flow - COMPLETE
- All onboarding components exist
- No TypeScript compilation errors found

### ✅ Task 3: Campaign Launch - COMPLETE 
- All required components implemented
- Environment variables configured
- API keys added

### ✅ Configuration Status
- Frontend .env configured ✅
- Backend .env configured ✅
- All API keys present ✅

## Step-by-Step Startup Instructions

### 1. Install Dependencies (Frontend)
```powershell
# In root directory
npm install
```

### 2. Install Backend Dependencies
```powershell
cd backend
npm install
cd..
```

### 3. Start Backend Server First
```powershell
cd backend
npm run dev
```
**Expected Output:**
```
🚀 Server running on http://localhost:3001
✅ Environment: development
✅ Frontend URL: http://localhost:5173
```

### 4. Start Frontend Server (New Terminal)
```powershell
# In root directory (new terminal window)
npm run dev:frontend
```
**Expected Output:**
```
VITE v5.x.x ready
➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 5. Alternative: Start Both Together
```powershell
# In root directory
npm run dev
```
This should start both frontend and backend simultaneously.

## Common Issues & Solutions

### Issue 1: "Module not found" errors
**Solution:**
```powershell
# Delete node_modules and reinstall
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force backend/node_modules
npm install
cd backend && npm install && cd..
```

### Issue 2: Port already in use
**Solution:**
```powershell
# Kill processes on ports 3001 and 5173
netstat -ano | findstr :3001
netstat -ano | findstr :5173
# Then kill the PID found:
taskkill /PID <PID_NUMBER> /F
```

### Issue 3: Environment variable errors
**Check these files have all required variables:**

**Frontend .env:**
```
VITE_WALLET_CONNECT_PROJECT_ID=bc8552ee128eb75bef290f9ed41f7f41
VITE_CREDVAULT_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
OPTIMISM_RPC_URL=https://mainnet.optimism.io
OPTIMISM_GOERLI_RPC_URL=https://goerli.optimism.io
PRIVATE_KEY=0000000000000000000000000000000000000000000000000000000000000000
OPTIMISTIC_ETHERSCAN_API_KEY=
VITE_INFURA_IPFS_AUTH=e90d161fac314d0792b5cf27fbdd7a0e
ZORA_API_KEY=zora_api_6a556542477adc10532c237f0fa0ac284956e251ea163b96d28960ec7fc4cbdb
VITE_ZORA_API_BASE_URL=https://api.zora.co
VITE_API_URL=http://localhost:3001/api
```

**Backend .env:**
```
NODE_ENV=development
PORT=3001
FRONTEND_URL=http://localhost:5173
OPTIMISM_RPC_URL=https://mainnet.optimism.io
OPTIMISM_SEPOLIA_RPC_URL=https://sepolia.optimism.io
JWT_SECRET=development-secret-change-in-production
ZORA_API_KEY=zora_api_6a556542477adc10532c237f0fa0ac284956e251ea163b96d28960ec7fc4cbdb
```

### Issue 4: TypeScript compilation errors
**Check for errors:**
```powershell
npx tsc --noEmit
```

## Verification Steps

### 1. Backend Health Check
After starting backend, test:
```powershell
curl http://localhost:3001/api/health
```
**Expected:** `{"status": "ok", "timestamp": "..."}`

### 2. Frontend Loading
After starting frontend, open browser to:
```
http://localhost:5173
```
**Expected:** CredVault landing page loads

### 3. Component Check
The app should show:
- ✅ CredVault header with logo
- ✅ Onboarding screens (if first time)
- ✅ Connect Wallet button
- ✅ Dark theme styling

## What To Do If App Still Won't Start

### Quick Debug Commands:
```powershell
# Check Node version (should be 18+ or 20+)
node --version

# Check npm version
npm --version

# Check for global dependency conflicts
npm list -g --depth=0

# Check current working directory
pwd
```

### Manual Component Test:
If the full app won't start, test individual components:
```powershell
# Test TypeScript compilation
npx tsc --noEmit

# Test Vite config
npx vite --help

# Test React components
npm run build:frontend
```

## Success Indicators ✅

**Backend Started Successfully:**
- Server running on localhost:3001 ✅
- Health endpoint responds ✅
- No error messages in terminal ✅

**Frontend Started Successfully:**
- Vite dev server running on localhost:5173 ✅
- Browser shows CredVault page ✅
- No console errors in browser dev tools ✅

## Next Steps After Successful Startup

1. **Test Wallet Connection** - Connect MetaMask
2. **Test Onboarding Flow** - Go through 3 screens
3. **Test Dashboard Access** - Navigate to creator dashboard
4. **Test Campaign Creation** - Create a test campaign

If you get the app running successfully, both Task 2 and Task 3 are confirmed working! 🚀

## Error Reporting

If you encounter specific error messages, please share:
1. The exact error message
2. Which step it occurred at
3. Terminal output
4. Browser console errors (F12 → Console)

This will help identify the specific issue preventing startup.
