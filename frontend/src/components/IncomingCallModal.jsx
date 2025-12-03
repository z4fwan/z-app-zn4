import { Phone, PhoneOff, Video } from "lucide-react";
import { useEffect, useState } from "react";

const IncomingCallModal = ({ isOpen, caller, callType, onAccept, onReject }) => {
  const [ringingTime, setRingingTime] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setRingingTime(0);
      return;
    }

    const timer = setInterval(() => {
      setRingingTime((prev) => prev + 1);
    }, 1000);

    // Auto-reject after 30 seconds
    const autoReject = setTimeout(() => {
      onReject();
    }, 30000);

    return () => {
      clearInterval(timer);
      clearTimeout(autoReject);
    };
  }, [isOpen, onReject]);

  if (!isOpen || !caller) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-gradient-to-br from-primary/20 to-secondary/20 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl max-w-sm w-full border border-white/10 animate-bounce-slow">
        {/* Caller Info */}
        <div className="flex flex-col items-center gap-4 mb-6">
          <div className="relative">
            <img
              src={caller.profilePic || "/avatar.png"}
              alt={caller.nickname}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full ring-4 ring-white/20 animate-pulse-slow"
            />
            <div className="absolute -bottom-2 -right-2 bg-primary rounded-full p-2">
              {callType === "video" ? (
                <Video className="w-5 h-5 text-primary-content" />
              ) : (
                <Phone className="w-5 h-5 text-primary-content" />
              )}
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-white text-xl sm:text-2xl font-bold mb-1">
              {caller.nickname || caller.username}
            </h3>
            <p className="text-white/70 text-sm sm:text-base">
              Incoming {callType} call...
            </p>
            <p className="text-white/50 text-xs mt-2">
              {ringingTime}s
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4">
          {/* Reject Button */}
          <button
            onClick={onReject}
            className="btn btn-circle btn-lg btn-error shadow-lg hover:scale-110 transition-transform"
            title="Reject call"
          >
            <PhoneOff className="w-6 h-6" />
          </button>

          {/* Accept Button */}
          <button
            onClick={onAccept}
            className="btn btn-circle btn-lg btn-success shadow-lg hover:scale-110 transition-transform animate-pulse"
            title="Accept call"
          >
            {callType === "video" ? (
              <Video className="w-6 h-6" />
            ) : (
              <Phone className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Ringtone indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
          <div className="w-2 h-2 bg-primary rounded-full animate-ping animation-delay-200" />
          <div className="w-2 h-2 bg-primary rounded-full animate-ping animation-delay-400" />
        </div>
      </div>

      <style>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.7;
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 2s ease-in-out infinite;
        }
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </div>
  );
};

export default IncomingCallModal;
