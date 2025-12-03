import { useState } from "react";
import { Link } from "react-router-dom";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useFriendStore } from "../store/useFriendStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Search, X, Video } from "lucide-react";
import VerifiedBadge from "./VerifiedBadge";

const Sidebar = () => {
  const {
    selectedUser,
    setSelectedUser,
    unreadCounts = {},
  } = useChatStore();

  const { onlineUsers = [] } = useAuthStore();
  const { friends, isLoading: isFriendsLoading } = useFriendStore();

  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const filteredUsers = friends
    .filter((u) => u && u._id)
    .filter((u) => {
      if (!query) return true;
      return `${u.nickname || u.username}`
        .toLowerCase()
        .includes(query.toLowerCase());
    })
    .filter((u) => (showOnlineOnly ? onlineUsers.includes(u._id) : true))
    .sort((a, b) => {
      // Sort: Online users come first
      const aOnline = onlineUsers.includes(a._id);
      const bOnline = onlineUsers.includes(b._id);
      return aOnline === bOnline ? 0 : aOnline ? -1 : 1;
    });

  return (
    <>
      {/* Sidebar Container */}
      <aside
        className={`
          ${selectedUser ? "hidden" : "flex"} 
          md:flex 
          w-full md:w-80 lg:w-96
          bg-base-100 
          border-r border-base-300
          flex-col
          h-full
        `}
      >
        {/* Header Section - Fixed */}
        <div className="flex-shrink-0 px-3 sm:px-4 pt-3 sm:pt-4 pb-2 sm:pb-3 border-b border-base-300">
          {/* Title and Search */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl sm:text-2xl font-bold">Chats</h3> 
            <button
              onClick={() => setSearchOpen(true)}
              className="btn btn-ghost btn-circle btn-sm"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Stories/Quick Access - Horizontal Scroll */}
          <div className="flex gap-3 sm:gap-4 overflow-x-auto py-2 -mx-3 sm:-mx-4 px-3 sm:px-4 scrollbar-hide">
            
            {/* Discover Users Button */}
            <Link
              to="/discover"
              className="flex-none flex flex-col items-center gap-1 min-w-[56px] sm:min-w-[64px] active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-primary flex items-center justify-center bg-primary/10">
                <Search className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
              </div>
              <span className="text-xs sm:text-sm truncate w-14 sm:w-16 text-center font-semibold">
                Discover
              </span>
            </Link>

            {/* Stranger Chat Button */}
            <Link
              to="/stranger"
              className="flex-none flex flex-col items-center gap-1 min-w-[56px] sm:min-w-[64px] active:scale-95 transition-transform"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-dashed border-base-content/50 flex items-center justify-center bg-base-200">
                <Video className="w-6 h-6 sm:w-7 sm:h-7 text-base-content/70" />
              </div>
              <span className="text-xs sm:text-sm truncate w-14 sm:w-16 text-center text-base-content/70 font-semibold">
                Stranger
              </span>
            </Link>
            
            {/* Friend Stories (Max 8 shown) */}
            {friends.slice(0, 8).map((u) => (
              <button
                key={u._id}
                onClick={() => setSelectedUser(u)}
                className="flex-none flex flex-col items-center gap-1 min-w-[56px] sm:min-w-[64px] active:scale-95 transition-transform focus:outline-none"
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full p-[2px] ring-2 ring-primary overflow-hidden"> 
                  <img
                    src={u.profilePic || "/avatar.png"}
                    alt={u.nickname || u.username}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <span className="text-xs sm:text-sm truncate w-14 sm:w-16 text-center">
                  {(u.nickname || u.username || "User").split(" ")[0]}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Scrollable Chat List - THIS IS THE KEY FIX */}
        <div className="flex-1 min-h-0 flex flex-col">
          {/* Online Filter */}
          <div className="flex-shrink-0 px-3 sm:px-4 py-2 sm:py-3 border-b border-base-200">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showOnlineOnly}
                onChange={(e) => setShowOnlineOnly(e.target.checked)}
                className="checkbox checkbox-xs sm:checkbox-sm"
              />
              <span className="text-sm sm:text-base font-medium">Show Active only</span>
            </label>
          </div>

          {/* Scrollable List */}
          <div className="flex-1 overflow-y-auto px-2 sm:px-3 py-2">
            {/* Conversations List */}
            <div className="space-y-1">
              {isFriendsLoading ? (
                <SidebarSkeleton />
              ) : filteredUsers.length === 0 ? (
                <div className="text-center text-base-content/60 py-8 px-4 text-sm sm:text-base">
                  {query ? "No results found" : "No friends yet. Add some friends to start chatting!"}
                </div>
              ) : (
                filteredUsers.map((user) => {
                  const unread = unreadCounts[user._id] || 0;
                  const isOnline = onlineUsers.includes(user._id);
                  return (
                    <button
                      key={user._id}
                      onClick={() => {
                        setSelectedUser(user);
                        if (searchOpen) setSearchOpen(false); 
                      }}
                      className={`w-full flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg text-left transition-all hover:bg-base-200 active:bg-base-300 ${
                        selectedUser?._id === user._id ? "bg-base-200 ring-2 ring-primary/20" : ""
                      }`}
                    >
                      {/* Avatar */}
                      <div className="relative flex-shrink-0">
                        <div className="w-11 h-11 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full overflow-hidden ring-2 ring-base-300">
                          <img
                            src={user.profilePic || "/avatar.png"}
                            alt={user.nickname || user.username}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {isOnline && (
                          <span className="absolute right-0 bottom-0 w-3 h-3 rounded-full ring-2 ring-base-100 bg-success" /> 
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate text-sm sm:text-base flex items-center gap-1">
                          <span className="truncate">{user.nickname || user.username}</span>
                          {user.isVerified && <VerifiedBadge size="xs" />}
                        </div>
                        <div className="text-xs sm:text-sm text-base-content/60 truncate">
                          {user.lastMessage?.text || "Start a chat!"}
                        </div>
                      </div>

                      {/* Unread Badge */}
                      {unread > 0 && (
                        <span className="badge badge-error badge-xs sm:badge-sm flex-shrink-0"> 
                          {unread > 9 ? "9+" : unread}
                        </span>
                      )}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* 2. Floating Search Overlay (No changes needed here for scrolling) */}
      {searchOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-start justify-center z-50 pt-16 px-4 animate-fadeIn">
          <div className="bg-base-100 p-5 rounded-xl shadow-2xl w-full max-w-lg border-2 border-primary">
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 border-b pb-3 border-base-300">
              <Search className="w-6 h-6 text-primary flex-shrink-0" />
              <input
                type="text"
                placeholder="Search your friends by name or username..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 p-2 outline-none bg-transparent text-lg"
                autoFocus
              />
              <button
                onClick={() => {
                  setSearchOpen(false);
                  setQuery(""); 
                }}
                className="p-2 hover:bg-base-200 rounded-full transition-colors flex-shrink-0"
                aria-label="Close search"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {/* Search Results */}
            {query && (
              <div className="mt-4 max-h-80 overflow-y-auto">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div
                      key={user._id}
                      onClick={() => {
                        setSelectedUser(user);
                        setSearchOpen(false);
                        setQuery("");
                      }}
                      className="p-3 my-1 rounded flex items-center gap-3 hover:bg-base-200 active:bg-base-300 cursor-pointer transition-colors text-base"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <img 
                          src={user.profilePic || "/avatar.png"} 
                          alt={user.nickname || user.username} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-semibold">
                        {user.nickname || user.username}
                      </span>
                      <span className="text-sm text-zinc-500">
                        {user.username && `(@${user.username})`}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-sm text-zinc-500 py-6">
                    No friends found matching "{query}"
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
