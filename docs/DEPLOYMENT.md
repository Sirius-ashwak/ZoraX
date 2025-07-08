# CredVault Deployment Guide

Complete guide for deploying CredVault to production environments.

## Overview

CredVault supports multiple deployment strategies:
- **Development**: Local development environment
- **Staging**: Pre-production testing environment  
- **Production**: Live production environment

## Prerequisites

### Infrastructure Requirements
- **Server**: Linux VPS or cloud instance (2+ CPU cores, 4GB+ RAM)
- **Database**: PostgreSQL 14+ (managed service recommended)
- **Cache**: Redis 6+ (optional but recommended)
- **Storage**: IPFS node or Pinata account
- **SSL**: Valid SSL certificate
- **Domain**: Custom domain name

### Required Accounts
- **Hosting Provider**: Vercel, Netlify, AWS, or similar
- **Database**: Railway, Supabase, AWS RDS, or self-hosted
- **Blockchain**: Alchemy, Infura, or similar RPC provider
- **IPFS**: Pinata, Web3.Storage, or self-hosted node
- **Monitoring**: Sentry, LogRocket, or similar

## Environment Configuration

### Production Environment Variables

#### Frontend (.env.production)
```env
# Blockchain Configuration
VITE_OPTIMISM_RPC_URL=https://opt-mainnet.g.alchemy.com/v2/YOUR_PROD_KEY
VITE_WALLET_CONNECT_PROJECT_ID=your_production_project_id

# Contract Addresses (Production)
VITE_CREDVAULT_CONTRACT_ADDRESS=0x...
VITE_ZORA_COIN_FACTORY_ADDRESS=0x...

# API Configuration
VITE_API_BASE_URL=https://api.credvault.io
VITE_FRAME_BASE_URL=https://frames.credvault.io

# Services
VITE_FARCASTER_HUB_URL=https://hub.farcaster.standardcrypto.vc:2281
VITE_IPFS_GATEWAY=https://credvault.mypinata.cloud

# Analytics & Monitoring
VITE_ANALYTICS_ID=your_production_analytics_id
VITE_SENTRY_DSN=https://your_production_sentry_dsn

# Production Settings
NODE_ENV=production
VITE_DEBUG_MODE=false
VITE_SHOW_DEBUG_INFO=false
```

#### Backend (.env.production)
```env
# Server Configuration
NODE_ENV=production
PORT=3001
HOST=0.0.0.0

# Database
DATABASE_URL=postgresql://user:password@prod-db.com:5432/credvault_prod
DATABASE_POOL_SIZE=20
DATABASE_SSL=true

# Redis
REDIS_URL=redis://prod-redis.com:6379
REDIS_PASSWORD=your_redis_password

# Blockchain
OPTIMISM_RPC_URL=https://opt-mainnet.g.alchemy.com/v2/YOUR_PROD_KEY
OPTIMISM_WS_URL=wss://opt-mainnet.g.alchemy.com/v2/YOUR_PROD_KEY

# Authentication
JWT_SECRET=your_super_secure_production_jwt_secret
JWT_EXPIRES_IN=24h
CORS_ORIGIN=https://credvault.io

# Farcaster
FARCASTER_API_KEY=your_production_farcaster_api_key
FARCASTER_HUB_URL=https://hub.farcaster.standardcrypto.vc:2281

# File Storage
PINATA_API_KEY=your_production_pinata_api_key
PINATA_SECRET_KEY=your_production_pinata_secret
PINATA_GATEWAY=https://credvault.mypinata.cloud

# Monitoring
SENTRY_DSN=https://your_production_backend_sentry_dsn
LOG_LEVEL=info

# Security
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX_REQUESTS=100
HELMET_ENABLED=true
```

## Deployment Strategies

### Option 1: Vercel Deployment (Recommended for Frontend)

#### Prerequisites
```bash
npm install -g vercel
vercel login
```

#### Deploy Frontend
```bash
# Build and deploy to Vercel
vercel --prod

# Or using GitHub integration
git push origin main  # Automatic deployment
```

#### Vercel Configuration
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "https://api.credvault.io/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_API_BASE_URL": "https://api.credvault.io",
    "VITE_OPTIMISM_RPC_URL": "@optimism_rpc_url"
  }
}
```

### Option 2: Railway Deployment (Full Stack)

#### Deploy to Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

#### Railway Configuration
```toml
# railway.toml
[build]
builder = "nixpacks"
buildCommand = "npm run build"

[deploy]
startCommand = "npm run start:prod"
restartPolicyType = "always"

[[services]]
name = "frontend"
source = "."
variables = { NODE_ENV = "production" }

[[services]]
name = "backend"
source = "./backend"
variables = { NODE_ENV = "production", PORT = "3001" }

[[services]]
name = "postgres"
image = "postgres:15"
variables = { POSTGRES_DB = "credvault" }
```

### Option 3: AWS Deployment

#### Using AWS Amplify (Frontend)
```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Initialize Amplify
amplify init
amplify add hosting
amplify publish
```

#### Using AWS ECS (Backend)
```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Start application
CMD ["npm", "run", "start:prod"]
```

#### ECS Task Definition
```json
{
  "family": "credvault-backend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::account:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "credvault-backend",
      "image": "your-account.dkr.ecr.region.amazonaws.com/credvault:latest",
      "portMappings": [
        {
          "containerPort": 3001,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {
          "name": "NODE_ENV",
          "value": "production"
        }
      ],
      "secrets": [
        {
          "name": "DATABASE_URL",
          "valueFrom": "arn:aws:secretsmanager:region:account:secret:database-url"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/credvault",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      }
    }
  ]
}
```

### Option 4: Docker Deployment

#### Complete Docker Setup
```yaml
# docker-compose.prod.yml
version: '3.8'

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "80:80"
      - "443:443"
    environment:
      - NODE_ENV=production
    volumes:
      - ./ssl:/etc/ssl/certs
    depends_on:
      - backend

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=production
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
    depends_on:
      - postgres
      - redis
    restart: unless-stopped

  postgres:
    image: postgres:15
    environment:
      - POSTGRES_DB=credvault
      - POSTGRES_USER=${DB_USER}
      - POSTGRES_PASSWORD=${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./backup:/backup
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    command: redis-server --requirepass ${REDIS_PASSWORD}
    volumes:
      - redis_data:/data
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/ssl/certs
    depends_on:
      - frontend
      - backend
    restart: unless-stopped

volumes:
  postgres_data:
  redis_data:
```

#### Frontend Dockerfile
```dockerfile
# Dockerfile.frontend
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### Nginx Configuration
```nginx
# nginx.conf
server {
    listen 80;
    server_name credvault.io www.credvault.io;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name credvault.io www.credvault.io;

    ssl_certificate /etc/ssl/certs/credvault.io.crt;
    ssl_certificate_key /etc/ssl/certs/credvault.io.key;

    # Frontend
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }

    # API proxy
    location /api/ {
        proxy_pass http://backend:3001/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Frame proxy
    location /frames/ {
        proxy_pass http://backend:3001/frames/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Database Migration

### Production Migration Process
```bash
# 1. Backup current database
pg_dump $DATABASE_URL > backup_$(date +%Y%m%d_%H%M%S).sql

# 2. Run migrations
npx prisma migrate deploy

# 3. Verify migration
npx prisma migrate status

# 4. Generate fresh client
npx prisma generate
```

### Migration Safety
```sql
-- Create migration with rollback capability
BEGIN;

-- Your migration changes here
ALTER TABLE campaigns ADD COLUMN new_field VARCHAR(255);

-- Verify changes
SELECT COUNT(*) FROM campaigns;

-- Commit or rollback
COMMIT; -- or ROLLBACK;
```

## Smart Contract Deployment

### Deploy to Optimism Mainnet
```bash
# Compile contracts
npx hardhat compile

# Deploy to Optimism
npx hardhat run scripts/deploy.js --network optimism

# Verify contract on Etherscan
npx hardhat verify --network optimism CONTRACT_ADDRESS "constructor_arg1" "constructor_arg2"
```

### Contract Deployment Script
```javascript
// scripts/deploy-production.js
async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy CredVault contract
  const CredVault = await ethers.getContractFactory("CredVault");
  const credvault = await CredVault.deploy();
  
  await credvault.deployed();
  
  console.log("CredVault deployed to:", credvault.address);
  
  // Wait for confirmations
  await credvault.deployTransaction.wait(6);
  
  // Verify on Etherscan
  try {
    await hre.run("verify:verify", {
      address: credvault.address,
      constructorArguments: [],
    });
  } catch (error) {
    console.log("Verification failed:", error.message);
  }
  
  // Update environment variables
  console.log(`Update VITE_CREDVAULT_CONTRACT_ADDRESS=${credvault.address}`);
}
```

## SSL Configuration

### Let's Encrypt SSL
```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate SSL certificate
sudo certbot --nginx -d credvault.io -d www.credvault.io

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

### Manual SSL Certificate
```bash
# Generate private key
openssl genrsa -out credvault.io.key 2048

# Generate certificate signing request
openssl req -new -key credvault.io.key -out credvault.io.csr

# Submit CSR to certificate authority
# Download and install certificate
```

## Monitoring & Logging

### Health Checks
```typescript
// backend/src/routes/health.ts
export const healthCheck = async (req: Request, res: Response) => {
  try {
    // Check database connection
    await db.raw('SELECT 1');
    
    // Check Redis connection
    await redis.ping();
    
    // Check external services
    const zoraStatus = await checkZoraService();
    const farcasterStatus = await checkFarcasterService();
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: process.env.APP_VERSION,
      services: {
        database: 'healthy',
        redis: 'healthy',
        zora: zoraStatus,
        farcaster: farcasterStatus
      }
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message
    });
  }
};
```

### Application Monitoring
```typescript
// Sentry configuration
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
  beforeSend(event) {
    // Filter sensitive data
    if (event.user) {
      delete event.user.email;
    }
    return event;
  }
});
```

### Log Aggregation
```yaml
# docker-compose.logging.yml
version: '3.8'

services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.5.0
    environment:
      - discovery.type=single-node
      - xpack.security.enabled=false
    volumes:
      - elasticsearch_data:/usr/share/elasticsearch/data

  logstash:
    image: docker.elastic.co/logstash/logstash:8.5.0
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf

  kibana:
    image: docker.elastic.co/kibana/kibana:8.5.0
    ports:
      - "5601:5601"
    environment:
      - ELASTICSEARCH_HOSTS=http://elasticsearch:9200

volumes:
  elasticsearch_data:
```

## Backup & Recovery

### Database Backup
```bash
#!/bin/bash
# backup.sh

# Create backup
BACKUP_NAME="credvault_backup_$(date +%Y%m%d_%H%M%S).sql"
pg_dump $DATABASE_URL > /backups/$BACKUP_NAME

# Compress backup
gzip /backups/$BACKUP_NAME

# Upload to cloud storage
aws s3 cp /backups/$BACKUP_NAME.gz s3://credvault-backups/

# Clean old backups (keep last 7 days)
find /backups -name "*.gz" -mtime +7 -delete

# Schedule with cron
# 0 2 * * * /path/to/backup.sh
```

### Disaster Recovery
```bash
# Recovery procedure
# 1. Download latest backup
aws s3 cp s3://credvault-backups/latest.sql.gz /tmp/

# 2. Restore database
gunzip /tmp/latest.sql.gz
psql $DATABASE_URL < /tmp/latest.sql

# 3. Restart services
docker-compose restart backend

# 4. Verify application
curl https://credvault.io/health
```

## Performance Optimization

### CDN Configuration
```javascript
// Add CDN headers
app.use((req, res, next) => {
  if (req.url.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$/)) {
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
  }
  next();
});
```

### Database Optimization
```sql
-- Production indexes
CREATE INDEX CONCURRENTLY idx_campaigns_creator_status ON campaigns(creator_id, status);
CREATE INDEX CONCURRENTLY idx_transactions_campaign_created ON transactions(campaign_id, created_at);
CREATE INDEX CONCURRENTLY idx_users_address_hash ON users USING hash(address);

-- Connection pooling
ALTER SYSTEM SET max_connections = 200;
ALTER SYSTEM SET shared_buffers = '256MB';
ALTER SYSTEM SET effective_cache_size = '1GB';
```

### Application Scaling
```yaml
# Horizontal scaling with load balancer
version: '3.8'

services:
  load-balancer:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx-lb.conf:/etc/nginx/nginx.conf

  backend-1:
    build: ./backend
    environment:
      - NODE_ENV=production
      - INSTANCE_ID=1

  backend-2:
    build: ./backend
    environment:
      - NODE_ENV=production
      - INSTANCE_ID=2

  backend-3:
    build: ./backend
    environment:
      - NODE_ENV=production
      - INSTANCE_ID=3
```

## Security Checklist

### Pre-Deployment Security
- [ ] Environment variables secured
- [ ] Database connections encrypted
- [ ] API rate limiting enabled
- [ ] CORS configured properly
- [ ] SSL certificates installed
- [ ] Security headers configured
- [ ] Input validation implemented
- [ ] SQL injection prevention
- [ ] XSS protection enabled
- [ ] CSRF protection implemented

### Security Headers
```typescript
// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
      connectSrc: ["'self'", "https://api.credvault.io"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

## Post-Deployment

### Verification Checklist
- [ ] Application loads correctly
- [ ] All API endpoints respond
- [ ] Database migrations completed
- [ ] Smart contracts deployed and verified
- [ ] SSL certificate valid
- [ ] Health checks passing
- [ ] Monitoring alerts configured
- [ ] Backup systems working
- [ ] Performance metrics baseline established
- [ ] Error tracking operational

### Go-Live Process
1. **Final testing** on staging environment
2. **Database migration** with downtime window
3. **Contract deployment** and verification
4. **Application deployment** with zero-downtime strategy
5. **DNS cutover** to production
6. **Monitoring verification** and alert testing
7. **Rollback plan** verification
8. **Team notification** of successful deployment

This deployment guide provides comprehensive instructions for successfully deploying CredVault to production environments with security, monitoring, and scalability considerations.
