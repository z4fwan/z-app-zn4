# Call System Fix Plan

## Current Issues
1. ❌ Video/Audio calls not connecting
2. ❌ Decline doesn't close popup for caller in real-time
3. ❌ No visual feedback on decline

## Fix Strategy

### Phase 1: Add Comprehensive Logging
- Add console logs at every step
- Track WebRTC connection states
- Monitor socket events
- Log media stream status

### Phase 2: Fix Real-Time Decline
- Ensure socket events propagate correctly
- Add toast notifications
- Close modals immediately on both sides
- Add "Call Declined" message

### Phase 3: Fix WebRTC Connection
- Simplify peer connection setup
- Ensure proper order of operations
- Add error handling
- Test with different browsers

### Phase 4: Add User Feedback
- Vibration on incoming call
- "Call Declined" message
- "Connecting..." states
- Error messages

## Testing Steps
1. Open app in two different browsers
2. Login as two different users
3. Try audio call
4. Try video call
5. Test decline functionality
6. Test end call functionality

## Expected Behavior
- ✅ Call button clicked → Popup appears for receiver
- ✅ Receiver sees popup with ringtone
- ✅ Accept → Both see video/audio
- ✅ Decline → Both popups close immediately
- ✅ End call → Both popups close
- ✅ All updates happen in real-time without refresh
