# Z-APP Testing Guide 🧪

## Complete Testing Checklist

Use this guide to test all features of your Z-APP application.

---

## 🚀 Pre-Testing Setup

### 1. Start the Application
```bash
start-dev.bat
```

### 2. Open Browser
- Main App: http://localhost:5173
- Admin Panel: http://localhost:5173/admin

### 3. Prepare Test Accounts
You'll need at least 3 accounts:
- Admin account (already exists)
- User 1 (create new)
- User 2 (create new)

---

## ✅ Test Scenarios

### 1. Authentication Tests

#### Test 1.1: User Registration
- [ ] Go to signup page
- [ ] Enter valid details
- [ ] Upload profile picture
- [ ] Submit form
- [ ] Verify redirect to profile setup
- [ ] Complete profile setup
- [ ] Verify redirect to home page

**Expected**: User successfully registered and logged in

#### Test 1.2: User Login
- [ ] Logout from current account
- [ ] Go to login page
- [ ] Login with email
- [ ] Verify successful login
- [ ] Logout again
- [ ] Login with username
- [ ] Verify successful login

**Expected**: Both email and username login work

#### Test 1.3: Password Reset
- [ ] Logout
- [ ] Click "Forgot Password"
- [ ] Enter email
- [ ] Check email for reset link
- [ ] Click reset link
- [ ] Enter new password
- [ ] Login with new password

**Expected**: Password successfully reset

---

### 2. Profile Management Tests

#### Test 2.1: View Own Profile
- [ ] Click on profile icon
- [ ] Verify profile information displays
- [ ] Check avatar displays correctly
- [ ] Verify bio shows

**Expected**: All profile info visible

#### Test 2.2: Edit Profile
- [ ] Go to Settings
- [ ] Change nickname
- [ ] Update bio
- [ ] Upload new avatar
- [ ] Save changes
- [ ] Verify changes reflected

**Expected**: Profile updates successfully

#### Test 2.3: Change Username
- [ ] Go to Settings
- [ ] Click "Change Username"
- [ ] Enter new username
- [ ] Confirm change
- [ ] Verify username updated

**Expected**: Username changed successfully

#### Test 2.4: Change Email
- [ ] Go to Settings
- [ ] Click "Change Email"
- [ ] Enter new email
- [ ] Enter OTP received
- [ ] Verify email updated

**Expected**: Email changed successfully

---

### 3. Friend System Tests

#### Test 3.1: Search Users
- [ ] Go to Discover page
- [ ] Search for a username
- [ ] Verify search results appear
- [ ] Click on user profile
- [ ] Verify profile opens

**Expected**: Search works correctly

#### Test 3.2: Send Friend Request
- [ ] Search for User 2
- [ ] Click "Add Friend"
- [ ] Verify request sent notification

**Expected**: Friend request sent

#### Test 3.3: Receive Friend Request
- [ ] Login as User 2
- [ ] Check friend requests tab
- [ ] Verify request from User 1 appears
- [ ] Check notification badge

**Expected**: Request visible in notifications

#### Test 3.4: Accept Friend Request
- [ ] As User 2, accept request from User 1
- [ ] Verify both users are now friends
- [ ] Check friend list

**Expected**: Users are now friends

#### Test 3.5: Reject Friend Request
- [ ] Create User 3
- [ ] Send request to User 2
- [ ] As User 2, reject request
- [ ] Verify request removed

**Expected**: Request rejected successfully

#### Test 3.6: Unfriend User
- [ ] As User 1, go to friend list
- [ ] Click unfriend on User 2
- [ ] Confirm unfriend
- [ ] Verify user removed from friends

**Expected**: User unfriended successfully

---

### 4. Messaging Tests

#### Test 4.1: Send Text Message
- [ ] Add User 2 as friend again
- [ ] Click on User 2 in sidebar
- [ ] Type a message
- [ ] Send message
- [ ] Verify message appears

**Expected**: Message sent and displayed

#### Test 4.2: Receive Message
- [ ] As User 2, check messages
- [ ] Verify message from User 1 appears
- [ ] Reply to message
- [ ] As User 1, verify reply received

**Expected**: Real-time messaging works

#### Test 4.3: Send Image
- [ ] As User 1, click image icon
- [ ] Select an image
- [ ] Send image
- [ ] Verify image appears in chat
- [ ] As User 2, verify image received

**Expected**: Image sharing works

#### Test 4.4: Send Voice Message
- [ ] Click microphone icon
- [ ] Record a voice message
- [ ] Send voice message
- [ ] Verify voice message appears
- [ ] Play voice message

**Expected**: Voice messaging works

#### Test 4.5: Online Status
- [ ] Check User 2's online status
- [ ] As User 2, logout
- [ ] As User 1, verify User 2 shows offline
- [ ] As User 2, login again
- [ ] As User 1, verify User 2 shows online

**Expected**: Online status updates in real-time

---

### 5. Stranger Chat Tests

#### Test 5.1: Start Stranger Chat
- [ ] Click "Stranger Chat" in navbar
- [ ] Click "Start Chat"
- [ ] Wait for match
- [ ] Verify matched with stranger

**Expected**: Successfully matched with random user

#### Test 5.2: Chat with Stranger
- [ ] Send messages to stranger
- [ ] Verify stranger receives messages
- [ ] Receive messages from stranger

**Expected**: Chat works with stranger

#### Test 5.3: Skip Stranger
- [ ] Click "Skip" button
- [ ] Verify matched with new stranger
- [ ] Verify previous chat cleared

**Expected**: Skip works, new match found

#### Test 5.4: Send Friend Request from Stranger Chat
- [ ] While chatting with stranger
- [ ] Click "Add Friend" button
- [ ] Verify request sent
- [ ] As stranger, check friend requests
- [ ] Verify request received

**Expected**: Friend request sent from stranger chat

#### Test 5.5: Report Stranger
- [ ] While chatting with stranger
- [ ] Click "Report" button
- [ ] Select reason
- [ ] Submit report
- [ ] Verify report submitted

**Expected**: Report submitted successfully

---

### 6. Verification System Tests

#### Test 6.1: Request Verification
- [ ] Go to Settings
- [ ] Click "Request Verification"
- [ ] Fill verification form
- [ ] Submit request
- [ ] Check Social Hub notifications
- [ ] Verify status shows "Pending"

**Expected**: Verification request submitted

#### Test 6.2: Admin Approve Verification
- [ ] Login as admin
- [ ] Go to Admin Dashboard
- [ ] Click "Verification Requests"
- [ ] Find pending request
- [ ] Click "Approve"
- [ ] As user, check notifications
- [ ] Verify badge appears on profile

**Expected**: Verification approved, badge visible

#### Test 6.3: Admin Reject Verification
- [ ] Create new user
- [ ] Request verification
- [ ] As admin, reject request
- [ ] Enter rejection reason
- [ ] As user, check notifications
- [ ] Verify rejection reason displays

**Expected**: Rejection with reason visible immediately

---

### 7. Admin Dashboard Tests

#### Test 7.1: View All Users
- [ ] Login as admin
- [ ] Go to Admin Dashboard
- [ ] Click "User Management"
- [ ] Verify all users listed
- [ ] Check user details

**Expected**: All users visible

#### Test 7.2: Suspend User
- [ ] Select a user
- [ ] Click "Suspend"
- [ ] Enter reason and duration
- [ ] Confirm suspension
- [ ] As suspended user, try to login
- [ ] Verify access denied

**Expected**: User suspended, cannot access

#### Test 7.3: Unsuspend User
- [ ] As admin, find suspended user
- [ ] Click "Unsuspend"
- [ ] As user, login again
- [ ] Verify access restored

**Expected**: User can access again

#### Test 7.4: Block User
- [ ] As admin, select user
- [ ] Click "Block"
- [ ] Confirm block
- [ ] As blocked user, try to login
- [ ] Verify access denied

**Expected**: User blocked permanently

#### Test 7.5: Unblock User
- [ ] As admin, find blocked user
- [ ] Click "Unblock"
- [ ] As user, login
- [ ] Verify access restored

**Expected**: User unblocked

#### Test 7.6: Delete User
- [ ] Create test user
- [ ] As admin, delete user
- [ ] Try to login as deleted user
- [ ] Verify account doesn't exist

**Expected**: User deleted permanently

#### Test 7.7: View Reports
- [ ] As admin, go to Reports
- [ ] Verify all reports listed
- [ ] Check report details
- [ ] Update report status
- [ ] Verify status updated

**Expected**: Reports management works

#### Test 7.8: View Statistics
- [ ] As admin, view dashboard
- [ ] Check total users count
- [ ] Check online users count
- [ ] Check pending verifications
- [ ] Check pending reports

**Expected**: All statistics display correctly

---

### 8. Theme System Tests

#### Test 8.1: Change Theme
- [ ] Go to Settings
- [ ] Click on different themes
- [ ] Verify theme changes immediately
- [ ] Refresh page
- [ ] Verify theme persists

**Expected**: Theme changes and persists

#### Test 8.2: Dark/Light Themes
- [ ] Try dark themes
- [ ] Try light themes
- [ ] Verify all UI elements visible
- [ ] Check contrast and readability

**Expected**: All themes work properly

---

### 9. Responsive Design Tests

#### Test 9.1: Mobile View (320px - 767px)
- [ ] Open DevTools (F12)
- [ ] Set device to iPhone SE
- [ ] Test all pages
- [ ] Test navigation
- [ ] Test messaging
- [ ] Test friend requests
- [ ] Verify touch interactions

**Expected**: All features work on mobile

#### Test 9.2: Tablet View (768px - 1023px)
- [ ] Set device to iPad
- [ ] Test all features
- [ ] Verify layout adapts
- [ ] Check sidebar behavior

**Expected**: Tablet view works properly

#### Test 9.3: Desktop View (1024px+)
- [ ] Test on desktop resolution
- [ ] Verify full layout
- [ ] Check all features

**Expected**: Desktop view optimal

---

### 10. Email Notification Tests

#### Test 10.1: Password Reset Email
- [ ] Request password reset
- [ ] Check email inbox
- [ ] Verify email received
- [ ] Check email formatting

**Expected**: Email received and formatted

#### Test 10.2: Verification Approval Email
- [ ] Request verification
- [ ] As admin, approve
- [ ] Check user's email
- [ ] Verify approval email received

**Expected**: Approval email sent

#### Test 10.3: Verification Rejection Email
- [ ] Request verification
- [ ] As admin, reject with reason
- [ ] Check user's email
- [ ] Verify rejection email with reason

**Expected**: Rejection email with reason sent

#### Test 10.4: Suspension Email
- [ ] As admin, suspend user
- [ ] Check user's email
- [ ] Verify suspension email received
- [ ] Check reason and duration in email

**Expected**: Suspension email sent

---

### 11. Real-Time Features Tests

#### Test 11.1: Real-Time Messages
- [ ] Open app in two browsers
- [ ] Login as different users
- [ ] Send message from Browser 1
- [ ] Verify appears in Browser 2 instantly

**Expected**: Messages appear in real-time

#### Test 11.2: Real-Time Friend Requests
- [ ] Send friend request from Browser 1
- [ ] Check Browser 2 notifications
- [ ] Verify request appears instantly

**Expected**: Requests appear in real-time

#### Test 11.3: Real-Time Online Status
- [ ] Login in Browser 1
- [ ] Check Browser 2
- [ ] Verify user shows online
- [ ] Logout from Browser 1
- [ ] Verify user shows offline in Browser 2

**Expected**: Status updates in real-time

#### Test 11.4: Real-Time Admin Actions
- [ ] As admin, suspend user
- [ ] User should be logged out immediately
- [ ] Verify notification appears

**Expected**: Admin actions take effect immediately

---

## 🐛 Bug Reporting Template

If you find any issues, document them:

```
**Bug Title**: [Brief description]

**Steps to Reproduce**:
1. 
2. 
3. 

**Expected Behavior**: 

**Actual Behavior**: 

**Browser**: 
**Device**: 
**Screenshots**: 
```

---

## ✅ Testing Completion Checklist

- [ ] All authentication tests passed
- [ ] All profile management tests passed
- [ ] All friend system tests passed
- [ ] All messaging tests passed
- [ ] All stranger chat tests passed
- [ ] All verification tests passed
- [ ] All admin dashboard tests passed
- [ ] All theme tests passed
- [ ] All responsive design tests passed
- [ ] All email notification tests passed
- [ ] All real-time features tests passed

---

## 🎉 Testing Complete!

If all tests pass, your Z-APP is fully functional and ready for production!

**Next Steps**:
1. Fix any bugs found
2. Deploy to production (see DEPLOYMENT_GUIDE.md)
3. Monitor production logs
4. Gather user feedback

---

**Happy Testing! 🚀**
