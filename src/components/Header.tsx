import { Bookmark, Film, Search } from "lucide-react";
import { HeaderProps } from "../utils/types";

export default function Header({ showFavorites, setShowFavorites }: HeaderProps) {
  return (
    <header className="bg-[#131B23] text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Film size={24} />
          <h1 className="text-xl font-bold">Movie Recommender</h1>
        </div>
        <button
          onClick={() => setShowFavorites(!showFavorites)}
          className="flex items-center space-x-1 bg-[#2274A5] hover:bg-opacity-80 transition px-3 py-1 rounded"
        >
          {showFavorites ? (
            <>
              <Search size={18} />
              <span>Back to Chat</span>
            </>
          ) : (
            <>
              <Bookmark size={18} />
              <span>Favorites</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}