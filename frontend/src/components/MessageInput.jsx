import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Smile } from "lucide-react";
import toast from "react-hot-toast";
import VoiceRecorder from "./VoiceRecorder";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const emojis = ["😊", "😂", "❤️", "👍", "🎉", "🔥", "😍", "🤔", "👏", "🙌", "💯", "✨"];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      setShowEmojiPicker(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const handleSendVoice = async (audioData, duration) => {
    try {
      await sendMessage({
        voice: audioData,
        voiceDuration: duration,
      });
      toast.success("Voice message sent!");
    } catch (error) {
      console.error("Failed to send voice:", error);
      toast.error("Failed to send voice message");
    }
  };

  const addEmoji = (emoji) => {
    setText((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="p-2 sm:p-3 w-full bg-base-100 border-t border-base-300">
      {imagePreview && (
        <div className="mb-2 sm:mb-3 flex items-center gap-2 p-2 bg-base-200 rounded-lg">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border-2 border-primary"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-error text-white
              flex items-center justify-center hover:scale-110 transition shadow-lg"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <span className="text-xs text-base-content/70">Image ready to send</span>
        </div>
      )}

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="mb-2 p-2 bg-base-200 rounded-lg">
          <div className="flex flex-wrap gap-2">
            {emojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => addEmoji(emoji)}
                className="text-2xl hover:scale-125 transition"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-1 sm:gap-2"
      >
        {/* Emoji Button */}
        <button
          type="button"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className="btn btn-ghost btn-circle btn-sm flex-shrink-0"
          title="Add emoji"
        >
          <Smile className="w-5 h-5" />
        </button>

        {/* Text Input */}
        <div className="flex-1 flex items-center gap-2 bg-base-200 rounded-full px-3 sm:px-4 py-2">
          <input
            type="text"
            className="flex-1 bg-transparent outline-none border-none text-sm sm:text-base"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          
          {/* Image Upload Button */}
          <button
            type="button"
            className={`p-1 rounded-full hover:bg-base-300 transition flex-shrink-0
              ${imagePreview ? "text-primary" : "text-base-content/60"}`}
            onClick={() => fileInputRef.current?.click()}
            title="Attach image"
          >
            <Image className="w-5 h-5" />
          </button>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />
        </div>

        {/* Voice Recorder */}
        {!text.trim() && !imagePreview && (
          <VoiceRecorder onSendVoice={handleSendVoice} />
        )}

        {/* Send Button */}
        {(text.trim() || imagePreview) && (
          <button
            type="submit"
            className="btn btn-primary btn-circle btn-sm sm:btn-md flex-shrink-0 shadow-lg"
            disabled={!text.trim() && !imagePreview}
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        )}
      </form>
    </div>
  );
};

export default MessageInput;
