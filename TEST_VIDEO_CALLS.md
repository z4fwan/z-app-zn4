# Video Call Testing Guide

## Issues Fixed

### 1. **Backend .env Configuration**
- ✅ Fixed JWT_SECRET (was concatenated with NODE_ENV)
- ✅ Separated JWT_SECRET and NODE_ENV properly

### 2. **Call Rejection Handling**
- ✅ Added reason parameter to call rejection
- ✅ Fixed duplicate event handling in PrivateCallModal
- ✅ Improved rejection validation (only initiator handles rejection)

### 3. **WebRTC Connection Improvements**
- ✅ Added error handling for ICE candidate addition
- ✅ Improved remote stream playback with retry logic
- ✅ Better error handling in offer/answer processing
- ✅ Enhanced logging for debugging

### 4. **Call Cleanup**
- ✅ Improved endCall function with proper cleanup sequence
- ✅ Added detailed logging for debugging
- ✅ Ensured all media tracks are stopped properly
- ✅ Clear remote stream references

## Testing Checklist

### Prerequisites
1. Two devices or browsers (for testing between two users)
2. Camera and microphone permissions granted
3. Both users must be friends

### Test Scenarios

#### 1. **Audio Call - Successful Connection**
- [ ] User A initiates audio call to User B
- [ ] User B receives incoming call notification with ringtone
- [ ] User B accepts the call
- [ ] Both users can hear each other
- [ ] Call duration timer starts
- [ ] Mute button works for both users
- [ ] End call button works
- [ ] Call log is created with correct duration

#### 2. **Video Call - Successful Connection**
- [ ] User A initiates video call to User B
- [ ] User B receives incoming call notification
- [ ] User B accepts the call
- [ ] Both users can see and hear each other
- [ ] Local video shows in PIP (picture-in-picture)
- [ ] Remote video shows in main view
- [ ] Camera toggle works
- [ ] Mute toggle works
- [ ] End call button works
- [ ] Call log is created

#### 3. **Call Rejection**
- [ ] User A calls User B
- [ ] User B rejects the call
- [ ] User A receives "Call declined" message
- [ ] User A's call modal closes
- [ ] No call log is created (duration = 0)

#### 4. **Call Timeout**
- [ ] User A calls User B
- [ ] User B doesn't answer for 30 seconds
- [ ] Call automatically ends
- [ ] User A receives timeout notification

#### 5. **Busy Scenario**
- [ ] User A is in a call with User B
- [ ] User C tries to call User A
- [ ] User C receives "User is busy" message
- [ ] User A doesn't see incoming call notification

#### 6. **Network Issues**
- [ ] Start a call successfully
- [ ] Disconnect internet on one side
- [ ] Call should end gracefully
- [ ] Error message shown to user

#### 7. **Permission Denied**
- [ ] Revoke camera/microphone permissions
- [ ] Try to start a call
- [ ] User receives clear error message
- [ ] Call doesn't proceed

## Common Issues & Solutions

### Issue: No audio/video
**Solution:**
1. Check browser permissions (chrome://settings/content/camera)
2. Ensure HTTPS or localhost (WebRTC requirement)
3. Check console for getUserMedia errors
4. Verify STUN servers are accessible

### Issue: Call connects but no remote stream
**Solution:**
1. Check console for "ontrack" events
2. Verify both users have proper media tracks
3. Check ICE candidate exchange in console
4. Ensure firewall isn't blocking WebRTC

### Issue: Call rejected immediately
**Solution:**
1. Check if users are friends
2. Verify socket connection is active
3. Check backend logs for socket events
4. Ensure user IDs are correct

### Issue: Ringtone not playing
**Solution:**
1. Check browser autoplay policy
2. Ensure AudioContext is resumed
3. Check console for audio errors
4. Try user interaction before call

## Debugging Tips

### Frontend Console Logs
Look for these key messages:
- `📞 Starting [audio/video] call with: [username]`
- `✅ Call accepted by [username]`
- `🎉 Received remote track!`
- `✅ Remote [video/audio] stream playing`
- `✅ Setting call status to ACTIVE`

### Backend Console Logs
Look for these key messages:
- `📞 Call initiated from [userId] to [userId]`
- `✅ Call accepted by [userId]`
- `🔒 private:offer from [userId] to [userId]`
- `🔒 private:answer from [userId] to [userId]`

### Network Tab
Check WebSocket messages:
- `private:initiate-call`
- `private:call-accepted`
- `private:offer`
- `private:answer`
- `private:ice-candidate`

## Performance Metrics

### Expected Behavior
- Call setup time: < 3 seconds
- Audio latency: < 200ms
- Video latency: < 500ms
- ICE candidate gathering: < 2 seconds

### Browser Compatibility
- ✅ Chrome/Edge (Chromium): Full support
- ✅ Firefox: Full support
- ✅ Safari: Full support (iOS 11+)
- ⚠️ Mobile browsers: May have limitations

## Next Steps

If all tests pass:
1. ✅ Video calling is working properly
2. Consider adding features:
   - Screen sharing
   - Group calls
   - Call recording
   - Better UI/UX improvements

If tests fail:
1. Check console logs on both frontend and backend
2. Verify network connectivity
3. Test with different browsers
4. Check firewall/NAT settings
5. Review WebRTC connection state changes
