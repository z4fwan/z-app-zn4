# Z-APP Deployment Guide 🚀

## Complete Guide to Deploy Z-APP to Production

---

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [GitHub Setup](#github-setup)
3. [Environment Setup](#environment-setup)
4. [Backend Deployment (Railway/Render)](#backend-deployment)
5. [Frontend Deployment (Vercel/Netlify)](#frontend-deployment)
6. [Database Setup (MongoDB Atlas)](#database-setup)
7. [Media Storage (Cloudinary)](#media-storage)
8. [Post-Deployment Testing](#post-deployment-testing)

---

## Prerequisites

### Required Accounts (All Free Tier Available):
- [ ] GitHub account
- [ ] MongoDB Atlas account (Database)
- [ ] Cloudinary account (Media storage)
- [ ] Railway/Render account (Backend hosting)
- [ ] Vercel/Netlify account (Frontend hosting)

### Required Tools:
- [ ] Git installed
- [ ] Node.js 18+ installed
- [ ] npm or yarn installed

---

## 1. GitHub Setup

### Step 1: Initialize Git Repository

```bash
# Navigate to your project root
cd path/to/z-app

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Z-APP - Full-stack chat application"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `z-app` (or your preferred name)
3. Description: "Full-stack real-time chat application with video calling, friend system, and admin dashboard"
4. Choose: **Public** or **Private**
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

### Step 3: Push to GitHub

```bash
# Add remote origin (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/z-app.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Create .gitignore (if not exists)

Make sure you have a `.gitignore` file in the root:

```gitignore
# Dependencies
node_modules/
frontend/node_modules/
backend/node_modules/

# Environment variables
.env
.env.local
.env.production
backend/.env
frontend/.env
frontend/.env.production

# Build outputs
frontend/dist/
backend/dist/

# Logs
*.log
npm-debug.log*

# OS files
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo

# Temporary files
*.tmp
.cache/
```

---

## 2. Environment Setup

### Backend Environment Variables

Create `backend/.env.example`:

```env
# Server
PORT=5001
NODE_ENV=production

# Database
MONGODB_URI=your_mongodb_connection_string_here

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_min_32_chars

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Frontend URL (for CORS)
CLIENT_URL=https://your-frontend-domain.vercel.app
```

### Frontend Environment Variables

Create `frontend/.env.example`:

```env
# Backend API URL
VITE_API_URL=https://your-backend-domain.railway.app
```

---

## 3. Database Setup (MongoDB Atlas)

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up for free
3. Create a new cluster (Free M0 tier)

### Step 2: Configure Database
1. **Create Database User**:
   - Go to "Database Access"
   - Click "Add New Database User"
   - Username: `zadmin` (or your choice)
   - Password: Generate strong password
   - User Privileges: "Read and write to any database"
   - Click "Add User"

2. **Whitelist IP Address**:
   - Go to "Network Access"
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - Click "Confirm"

3. **Get Connection String**:
   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `z-app` or your preferred name

Example:
```
mongodb+srv://zadmin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/z-app?retryWrites=true&w=majority
```

---

## 4. Media Storage (Cloudinary)

### Step 1: Create Cloudinary Account
1. Go to https://cloudinary.com/users/register/free
2. Sign up for free account

### Step 2: Get API Credentials
1. Go to Dashboard
2. Copy these values:
   - **Cloud Name**: `dxxxxxxxx`
   - **API Key**: `123456789012345`
   - **API Secret**: `xxxxxxxxxxxxxxxxxxxx`

### Step 3: Configure Upload Presets (Optional)
1. Go to Settings → Upload
2. Create upload presets for:
   - `chat_images`
   - `chat_voices`
   - `profile_pictures`

---

## 5. Backend Deployment (Railway)

### Option A: Railway (Recommended)

#### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub

#### Step 2: Deploy Backend
1. Click "New Project"
2. Choose "Deploy from GitHub repo"
3. Select your `z-app` repository
4. Railway will auto-detect Node.js

#### Step 3: Configure Backend
1. **Set Root Directory**:
   - Go to Settings
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

2. **Add Environment Variables**:
   - Go to "Variables" tab
   - Add all variables from `backend/.env.example`
   - Use your actual values from MongoDB Atlas and Cloudinary

3. **Get Backend URL**:
   - Go to "Settings" → "Domains"
   - Copy the generated URL (e.g., `https://z-app-backend.up.railway.app`)

#### Step 4: Update CORS
Make sure your backend allows the frontend domain in CORS settings.

---

### Option B: Render (Alternative)

#### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub

#### Step 2: Deploy Backend
1. Click "New +" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `z-app-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

#### Step 3: Add Environment Variables
1. Go to "Environment" tab
2. Add all variables from `backend/.env.example`

---

## 6. Frontend Deployment (Vercel)

### Option A: Vercel (Recommended)

#### Step 1: Create Vercel Account
1. Go to https://vercel.com/signup
2. Sign up with GitHub

#### Step 2: Deploy Frontend
1. Click "Add New" → "Project"
2. Import your `z-app` repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

#### Step 3: Add Environment Variables
1. Go to "Settings" → "Environment Variables"
2. Add:
   - `VITE_API_URL`: Your Railway backend URL

#### Step 4: Deploy
1. Click "Deploy"
2. Wait for deployment to complete
3. Copy your frontend URL (e.g., `https://z-app.vercel.app`)

#### Step 5: Update Backend CORS
1. Go back to Railway
2. Update `CLIENT_URL` environment variable with your Vercel URL
3. Redeploy backend

---

### Option B: Netlify (Alternative)

#### Step 1: Create Netlify Account
1. Go to https://www.netlify.com
2. Sign up with GitHub

#### Step 2: Deploy Frontend
1. Click "Add new site" → "Import an existing project"
2. Choose GitHub
3. Select your repository
4. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`

#### Step 3: Add Environment Variables
1. Go to "Site settings" → "Environment variables"
2. Add `VITE_API_URL` with your backend URL

---

## 7. Post-Deployment Configuration

### Update Backend Environment
```env
NODE_ENV=production
CLIENT_URL=https://your-frontend-domain.vercel.app
MONGODB_URI=your_mongodb_atlas_connection_string
```

### Update Frontend Environment
```env
VITE_API_URL=https://your-backend-domain.railway.app
```

### Test CORS
Make sure your backend accepts requests from your frontend domain.

---

## 8. Post-Deployment Testing

### Test Checklist:
- [ ] User registration works
- [ ] User login works
- [ ] Profile setup works
- [ ] Sending messages works
- [ ] Image upload works
- [ ] Voice message works
- [ ] Video/audio calling works
- [ ] Friend requests work
- [ ] Stranger chat works
- [ ] Admin dashboard accessible
- [ ] Verification system works
- [ ] Report system works

### Common Issues & Solutions:

#### Issue: CORS Error
**Solution**: Update `CLIENT_URL` in backend environment variables

#### Issue: Images not uploading
**Solution**: Check Cloudinary credentials in backend environment

#### Issue: Database connection failed
**Solution**: 
- Check MongoDB Atlas IP whitelist
- Verify connection string
- Check database user permissions

#### Issue: WebRTC calls not working
**Solution**: 
- Ensure HTTPS is enabled (required for WebRTC)
- Check STUN server configuration

---

## 9. Custom Domain (Optional)

### For Frontend (Vercel):
1. Go to "Settings" → "Domains"
2. Add your custom domain
3. Update DNS records as instructed

### For Backend (Railway):
1. Go to "Settings" → "Domains"
2. Add custom domain
3. Update DNS records

---

## 10. Monitoring & Maintenance

### Railway Dashboard:
- Monitor backend logs
- Check resource usage
- View deployment history

### Vercel Dashboard:
- Monitor frontend analytics
- Check build logs
- View deployment history

### MongoDB Atlas:
- Monitor database performance
- Check storage usage
- View connection metrics

---

## 11. Scaling (Future)

### When to Scale:
- More than 100 concurrent users
- Database size > 512MB (free tier limit)
- Need better performance

### Scaling Options:
- **Railway**: Upgrade to Pro plan ($5/month)
- **MongoDB Atlas**: Upgrade to M10 cluster ($0.08/hour)
- **Cloudinary**: Upgrade plan for more storage
- **Vercel**: Pro plan for better performance

---

## 12. Security Checklist

- [ ] All environment variables are set correctly
- [ ] JWT_SECRET is strong and unique
- [ ] MongoDB Atlas IP whitelist configured
- [ ] HTTPS enabled on all domains
- [ ] CORS properly configured
- [ ] No sensitive data in GitHub repository
- [ ] .env files in .gitignore
- [ ] Rate limiting enabled (if needed)

---

## 13. Backup Strategy

### Database Backup:
- MongoDB Atlas provides automatic backups
- Download manual backups periodically

### Code Backup:
- GitHub repository serves as backup
- Create tags for major releases

---

## Quick Deployment Commands

```bash
# 1. Commit all changes
git add .
git commit -m "Prepare for deployment"
git push origin main

# 2. Backend will auto-deploy on Railway
# 3. Frontend will auto-deploy on Vercel

# 4. Check deployment status
# Railway: https://railway.app/dashboard
# Vercel: https://vercel.com/dashboard
```

---

## Support & Resources

- **Railway Docs**: https://docs.railway.app
- **Vercel Docs**: https://vercel.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **Cloudinary Docs**: https://cloudinary.com/documentation

---

## Estimated Costs (Free Tier)

- **Railway**: Free ($5 credit/month)
- **Vercel**: Free (100GB bandwidth)
- **MongoDB Atlas**: Free (512MB storage)
- **Cloudinary**: Free (25GB storage, 25GB bandwidth)

**Total**: $0/month for small-scale usage

---

**Deployment Status**: Ready to Deploy ✅
**Estimated Time**: 30-45 minutes
**Difficulty**: Intermediate

Good luck with your deployment! 🚀
