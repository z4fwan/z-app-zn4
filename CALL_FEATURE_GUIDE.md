# Friend Call Feature Guide

## Overview
Added voice and video call functionality for friends in the chat tab with ringtone, incoming call popup, and auto-timeout.

## Features Implemented

### 1. Call Buttons in Chat Header
- **Audio Call Button** (Phone icon) - Initiates voice call
- **Video Call Button** (Video icon) - Initiates video call
- Both buttons visible in the chat header when chatting with friends

### 2. Incoming Call Modal
- **Visual popup** with caller's profile picture and name
- **Ringtone** - Plays automatically using Web Audio API (800Hz + 1000Hz tones)
- **Call timer** - Shows how long the call has been ringing
- **Accept/Reject buttons** - Green accept, red reject
- **Auto-reject** - Automatically rejects after 30 seconds if not answered
- **Animated UI** - Pulsing effects and visual indicators

### 3. Call Timeout
- **30-second limit** for both incoming and outgoing calls
- **Auto-end** if receiver doesn't answer
- **Toast notification** when call times out

### 4. Backend Socket Events
- `private:initiate-call` - Caller starts the call
- `private:incoming-call` - Receiver gets notification
- `private:call-accepted` - Receiver accepts
- `private:call-rejected` - Receiver rejects
- `private:reject-call` - Alternative reject handler
- `private:offer` - WebRTC offer
- `private:answer` - WebRTC answer
- `private:ice-candidate` - ICE candidates for connection
- `private:end-call` - Either party ends the call
- `private:call-ended` - Notification that call ended

## How It Works

### Making a Call
1. User clicks phone/video icon in chat header
2. System requests camera/microphone permissions
3. Call modal opens showing "Ringing..."
4. Socket emits call to friend
5. If not answered in 30 seconds, call auto-ends

### Receiving a Call
1. Incoming call modal appears with ringtone
2. Shows caller info and call type
3. User can accept or reject
4. If no action in 30 seconds, auto-rejects
5. Ringtone stops when answered/rejected

### During Call
- **Mute/Unmute** audio
- **Turn camera on/off** (video calls)
- **Fullscreen mode** toggle
- **Call duration** timer
- **End call** button

## Files Modified

### Frontend
- `frontend/src/components/ChatHeader.jsx` - Added call buttons
- `frontend/src/components/IncomingCallModal.jsx` - Added ringtone and auto-reject
- `frontend/src/components/PrivateCallModal.jsx` - Added call timeout
- `frontend/src/pages/HomePage.jsx` - Fixed prop names and added rejection handler

### Backend
- `backend/src/lib/socket.js` - Added `private:reject-call` event handler

## Testing Checklist
- [ ] Call buttons appear in friend chat
- [ ] Audio call initiates correctly
- [ ] Video call initiates correctly
- [ ] Incoming call shows popup with ringtone
- [ ] Accept button works
- [ ] Reject button works
- [ ] Auto-reject after 30 seconds works
- [ ] Auto-end if not answered after 30 seconds works
- [ ] Ringtone stops when call answered/rejected
- [ ] Call duration timer works
- [ ] Mute/unmute works
- [ ] Video on/off works
- [ ] End call works properly
- [ ] Both users see call ended notification

## Notes
- Ringtone uses Web Audio API (no audio file needed)
- Works on both desktop and mobile
- Requires camera/microphone permissions
- Uses WebRTC for peer-to-peer connection
- STUN servers: Google's public STUN servers
