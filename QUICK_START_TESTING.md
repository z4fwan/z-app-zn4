# Quick Start Testing Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies (if not already done)
```bash
# Install all dependencies
npm run install:all

# Or manually:
cd backend && npm install
cd ../frontend && npm install
```

### Step 2: Start the Application
```bash
# Option 1: Use the provided batch file (Windows)
start-dev.bat

# Option 2: Use npm script (from root directory)
npm run dev

# Option 3: Start manually
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Step 3: Access the Application
- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5001

### Step 4: Create Test Accounts

#### Account 1 (User A)
1. Go to http://localhost:5173/signup
2. Create account:
   - Email: user1@test.com
   - Username: user1
   - Password: test123
3. Complete profile setup
4. Grant camera/microphone permissions when prompted

#### Account 2 (User B)
1. Open a new browser window (or incognito)
2. Go to http://localhost:5173/signup
3. Create account:
   - Email: user2@test.com
   - Username: user2
   - Password: test123
4. Complete profile setup
5. Grant camera/microphone permissions when prompted

### Step 5: Add as Friends

#### From User A's Account:
1. Click "Discover" in the navigation
2. Find User B (user2)
3. Click "Add Friend"

#### From User B's Account:
1. Check the "Social Hub" (friend icon in navbar)
2. You should see a friend request from User A
3. Click "Accept"

### Step 6: Test Video Call

#### From User A's Account:
1. Click on User B in the sidebar
2. Click the video camera icon in the chat header
3. Wait for User B to accept

#### From User B's Account:
1. You should see an incoming call notification
2. Click the green accept button
3. Both users should now be in a video call!

### Step 7: Test Features

#### During the Call:
- ✅ Click microphone icon to mute/unmute
- ✅ Click camera icon to turn video on/off
- ✅ Click red phone icon to end call
- ✅ Check that call duration is counting
- ✅ Verify both video and audio work

#### After the Call:
- ✅ Check chat for call log message
- ✅ Verify call duration is recorded correctly

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to backend"
**Solution:**
1. Check if backend is running on port 5001
2. Check backend console for errors
3. Verify MongoDB connection string in `backend/.env`

### Issue: "Camera/Microphone not working"
**Solution:**
1. Check browser permissions (chrome://settings/content/camera)
2. Ensure you're using HTTPS or localhost
3. Try a different browser
4. Check if another app is using the camera

### Issue: "Call connects but no video/audio"
**Solution:**
1. Check browser console for errors
2. Verify both users granted permissions
3. Check firewall settings
4. Try refreshing both browsers

### Issue: "Friend request not showing"
**Solution:**
1. Check backend console for socket events
2. Refresh the page
3. Check if both users are online (green dot)
4. Verify MongoDB connection

### Issue: "Socket connection failed"
**Solution:**
1. Check if backend is running
2. Verify CORS settings in `backend/src/index.js`
3. Check frontend .env has correct API URL
4. Clear browser cache and reload

---

## 📊 What to Check

### Backend Console Should Show:
```
✅ Server running at http://localhost:5001
✅ MongoDB connected successfully
✅ User connected: [socket-id]
✅ Registered user [user-id] → socket [socket-id]
📞 Call initiated from [user-id] to [user-id]
✅ Call accepted by [user-id]
```

### Frontend Console Should Show:
```
✅ Socket connected
📞 Starting video call with: [username]
✅ Call accepted by [username]
🎉 Received remote track!
✅ Remote video stream playing
✅ Setting call status to ACTIVE
```

### Browser Network Tab Should Show:
- WebSocket connection established
- Socket.IO events flowing
- No 404 or 500 errors

---

## ✅ Success Checklist

- [ ] Backend starts without errors
- [ ] Frontend starts without errors
- [ ] Can create two user accounts
- [ ] Can send friend request
- [ ] Can accept friend request
- [ ] Can send text messages
- [ ] Can initiate video call
- [ ] Can accept video call
- [ ] Can see and hear both users
- [ ] Can mute/unmute audio
- [ ] Can turn camera on/off
- [ ] Can end call properly
- [ ] Call log appears in chat
- [ ] Call duration is recorded

---

## 🎯 Quick Test Script

Run this test in order:

1. **Setup** (2 min)
   - Start backend
   - Start frontend
   - Create 2 accounts

2. **Friend System** (1 min)
   - Send friend request
   - Accept friend request

3. **Messaging** (1 min)
   - Send text message
   - Verify delivery
   - Check read status

4. **Video Call** (2 min)
   - Initiate call
   - Accept call
   - Test mute/camera
   - End call
   - Verify call log

**Total Time: ~6 minutes**

---

## 🎉 If Everything Works

Congratulations! Your video call system is working properly. You can now:

1. Deploy to production
2. Add more features
3. Invite real users
4. Monitor performance

---

## 📞 Need Help?

Check these files:
- `TEST_VIDEO_CALLS.md` - Detailed testing guide
- `FIXES_APPLIED.md` - What was fixed
- `PROJECT_ANALYSIS_SUMMARY.md` - Full project analysis

---

**Happy Testing! 🚀**
