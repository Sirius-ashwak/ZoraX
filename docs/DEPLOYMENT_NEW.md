# CredVault Deployment Guide

This guide walks you through deploying CredVault to Render.com, a modern cloud platform that makes deployment simple and affordable.

## 🚀 Quick Deployment to Render

### Prerequisites

1. **GitHub Account**: Your code should be in a GitHub repository
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **Environment Variables**: Gather the required API keys and secrets

### Step 1: Prepare Your Repository

1. **Fork or Clone** this repository to your GitHub account
2. **Verify Files**: Ensure these deployment files exist:
   - `render.yaml` (Render Blueprint)
   - `Dockerfile` (Container deployment)
   - `.env.production` (Environment template)
   - Updated `package.json` with deployment scripts

### Step 2: Connect to Render

1. **Sign in to Render**: Go to [dashboard.render.com](https://dashboard.render.com)
2. **Connect GitHub**: Link your GitHub account in the Render dashboard
3. **New Blueprint**: Click "New" → "Blueprint"
4. **Select Repository**: Choose your CredVault repository

### Step 3: Configure Environment Variables

Render will create two services automatically. Configure these environment variables:

#### Backend Service (credvault-backend)

**Required Variables:**
```
NODE_ENV=production
PORT=10000
JWT_SECRET=your-super-secure-jwt-secret-min-32-chars
```

**Optional but Recommended:**
```
ZORA_API_KEY=your-zora-api-key
DATABASE_URL=postgresql://user:pass@host:port/db
OPTIMISM_RPC_URL=https://mainnet.optimism.io
OPTIMISM_SEPOLIA_RPC_URL=https://sepolia.optimism.io
```

#### Frontend Service (credvault-frontend)

**Required Variables:**
```
VITE_WALLET_CONNECT_PROJECT_ID=your-wallet-connect-project-id
```

**Optional but Recommended:**
```
VITE_OPTIMISM_RPC_URL=https://mainnet.optimism.io
VITE_OPTIMISM_SEPOLIA_RPC_URL=https://sepolia.optimism.io
VITE_ZORA_API_BASE_URL=https://api.zora.co
```

### Step 4: Deploy

1. **Review Configuration**: Double-check all environment variables
2. **Deploy**: Click "Apply" to start the deployment
3. **Monitor**: Watch the build logs for any errors
4. **Test**: Once deployed, test both frontend and backend URLs

## 🔧 Manual Service Setup

If you prefer manual setup instead of Blueprint:

### Backend Web Service

1. **Create Web Service**:
   - Name: `credvault-backend`
   - Environment: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Plan: Starter ($7/month)

2. **Advanced Settings**:
   - Auto-Deploy: Yes
   - Health Check Path: `/api/health`

### Frontend Static Site

1. **Create Static Site**:
   - Name: `credvault-frontend`
   - Build Command: `npm install && npm run build:frontend`
   - Publish Directory: `./dist`
   - Plan: Free

2. **Advanced Settings**:
   - Auto-Deploy: Yes
   - Custom Headers (Optional):
     ```
     /*
       X-Frame-Options: DENY
       X-Content-Type-Options: nosniff
       Referrer-Policy: strict-origin-when-cross-origin
     ```

## 🛡️ Security Configuration

### JWT Secret Generation

Generate a secure JWT secret:

```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using OpenSSL
openssl rand -hex 32

# Using online generator (use with caution)
# Visit: https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx
```

### Wallet Connect Project ID

1. Go to [WalletConnect Cloud](https://cloud.walletconnect.com)
2. Create a new project
3. Copy the Project ID

### Zora API Key (Optional)

1. Visit [Zora Developer Portal](https://docs.zora.co)
2. Follow their API key generation process
3. Add to environment variables

## 🐳 Docker Deployment

### Build and Run Locally

```bash
# Build the image
docker build -t credvault .

# Run the container
docker run -p 10000:10000 \
  -e NODE_ENV=production \
  -e PORT=10000 \
  -e JWT_SECRET=your-jwt-secret \
  credvault
```

### Deploy to Render with Docker

1. **Create Web Service**
2. **Select Docker** as the environment
3. **Dockerfile Path**: `./Dockerfile`
4. **Port**: `10000`

## 🔍 Troubleshooting

### Common Issues

#### Build Failures

**Issue**: TypeScript compilation errors
**Solution**: 
```bash
# Run locally to debug
npm run type-check
npx tsc --noEmit --skipLibCheck
```

**Issue**: Missing dependencies
**Solution**: 
```bash
# Verify package.json scripts
npm run build:frontend
npm run build:backend
```

#### Runtime Errors

**Issue**: CORS errors
**Solution**: Verify FRONTEND_URL environment variable matches your frontend domain

**Issue**: API connection failures
**Solution**: Check that VITE_API_BASE_URL points to your backend service

#### Environment Variable Issues

**Issue**: Frontend can't connect to backend
**Solution**: 
1. Verify backend service is healthy: `https://your-backend.onrender.com/api/health`
2. Check VITE_API_BASE_URL in frontend service

### Debug Commands

```bash
# Check service health
curl https://your-backend.onrender.com/api/health

# View build logs
# Available in Render dashboard under "Logs"

# Test API endpoints
curl https://your-backend.onrender.com/api/campaigns
```

## 📊 Monitoring

### Health Checks

- **Backend**: `/api/health` endpoint
- **Frontend**: Static file serving
- **Automatic**: Render monitors service health

### Logs

- **Access**: Render Dashboard → Your Service → Logs
- **Real-time**: Available during and after deployment
- **Filtering**: Filter by log level and time range

### Metrics

- **Performance**: Response times and throughput
- **Uptime**: Service availability tracking
- **Alerts**: Email notifications for downtime

## 💰 Cost Estimation

### Render Pricing (as of 2024)

#### Free Tier
- **Static Sites**: Unlimited
- **Limitations**: Custom domains require paid plan

#### Starter Plan ($7/month per service)
- **Web Services**: Full-featured backend hosting
- **Database**: PostgreSQL available ($7/month)
- **Features**: Custom domains, SSL, metrics

#### Pro Plan ($25/month per service)
- **Enhanced Performance**: More CPU and memory
- **Advanced Features**: Better scaling and monitoring

### Total Monthly Cost
- **Minimal Setup**: $7/month (backend only, frontend free)
- **Full Setup**: $14/month (backend + database)
- **Production Ready**: $21/month (backend + database + enhanced features)

## 🎯 Next Steps

1. **Custom Domain**: Add your own domain in Render dashboard
2. **SSL Certificate**: Automatic HTTPS for all services
3. **Database**: Add PostgreSQL for persistent data
4. **Analytics**: Integrate monitoring and analytics
5. **CI/CD**: Set up automatic deployments from Git pushes

## 📞 Support

- **Render Support**: [Render Help Center](https://render.com/help)
- **CredVault Issues**: [GitHub Issues](https://github.com/your-username/credvault/issues)
- **Community**: [Discord](https://discord.gg/credvault) (Coming Soon)

---

**Deployment made simple with Render! 🚀**
