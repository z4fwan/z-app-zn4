# 🚀 Deploy Frontend - Quick Steps

## Your Backend is Live! ✅
**Backend URL**: https://z-app-zn4.onrender.com

Now let's deploy the frontend!

---

## STEP 3: Deploy Frontend (5 minutes)

### 3.1 Create Static Site
1. Go to Render Dashboard: https://dashboard.render.com
2. Click "New +" (top right)
3. Select "Static Site"
4. Select your repository: `z-app-zn4`

### 3.2 Configure Frontend
Fill in these settings:

**Name**: `z-app-frontend` (or any name you like)

**Branch**: `main`

**Root Directory**: `frontend`

**Build Command**: 
```
npm install && npm run build
```

**Publish Directory**: `dist`

### 3.3 Add Environment Variables
Click "Advanced" to expand environment variables.

Click "Add Environment Variable" and add these TWO variables:

**Variable 1:**
```
Key: VITE_API_BASE_URL
Value: https://z-app-zn4.onrender.com
```

**Variable 2:**
```
Key: VITE_API_URL
Value: https://z-app-zn4.onrender.com
```

### 3.4 Create Static Site
1. Click "Create Static Site" (at the bottom)
2. Wait 3-5 minutes for build
3. Watch the logs
4. Wait for "Your site is live" ✅

### 3.5 Get Frontend URL
Once deployed, you'll get a URL like:
```
https://z-app-frontend.onrender.com
```

**Copy this URL!** You'll need it for the next step.

---

## STEP 4: Update Backend CORS (2 minutes)

### 4.1 Add Frontend URL to Backend
1. Go to Render Dashboard
2. Click on your backend service: `z-app-zn4`
3. Click "Environment" (left sidebar)
4. Click "Add Environment Variable"

Add these TWO variables:

**Variable 1:**
```
Key: CLIENT_URL
Value: [Your frontend URL from Step 3.5]
```

**Variable 2:**
```
Key: FRONTEND_URL
Value: [Your frontend URL from Step 3.5]
```

**Example:**
```
CLIENT_URL = https://z-app-frontend.onrender.com
FRONTEND_URL = https://z-app-frontend.onrender.com
```

5. Click "Save Changes"
6. Backend will automatically redeploy (wait 2-3 minutes)

---

## STEP 5: Test Your App! (2 minutes)

### 5.1 Visit Your Frontend
Open your frontend URL in browser

### 5.2 Test Features
1. ✅ Sign up for a new account
2. ✅ Complete profile setup
3. ✅ Login
4. ✅ Send a message
5. ✅ Upload an image

### 5.3 Login as Admin
- Email: `ronaldo@gmail.com`
- Password: `safwan123`

**Change this password immediately!**

---

## 🎉 Done!

Your Z-APP will be fully live!

**Backend**: https://z-app-zn4.onrender.com  
**Frontend**: [Your frontend URL]

Share your frontend URL with anyone! 🌍
