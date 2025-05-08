import { Bookmark, Star, Loader } from "lucide-react";
import { FavoritesListProps } from "../utils/types";

export default function FavoritesList({
  favorites = [],
  removeFromFavorites,
  isLoading = false,
}: FavoritesListProps) {
  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto p-4 bg-[#E9F1F7] flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin h-8 w-8 mx-auto text-blue-500 mb-4" />
          <p className="text-gray-500">Loading your favorites...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-[#E9F1F7]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-[#131B23]">
          Your Favorite Movies
        </h2>
        {!favorites || favorites.length === 0 ? (
          <div className="bg-white rounded-lg p-8 text-center shadow">
            <Bookmark size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">
              You haven't saved any favorites yet.
            </p>
            <p className="text-gray-400 text-sm mt-1">
              When you find movies you like, save them here!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {favorites.map((movie) => (
              <div
                key={movie.id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <div className="flex">
                  <div className="w-1/4">
                    {movie.image ? (
                      <img
                        src={movie.image}
                        alt={movie.title}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                  <div className="w-3/4 p-4">
                    <div className="flex justify-between">
                      <h3 className="font-bold text-lg text-[#131B23]">
                        {movie.title}{" "}
                        <span className="text-[#816C61] font-normal">
                          ({movie.year || "Unknown"})
                        </span>
                      </h3>
                      <button
                        onClick={() => removeFromFavorites(movie.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="flex items-center mt-1">
                      <Star
                        size={16}
                        className="text-yellow-500 fill-yellow-500"
                      />
                      <span className="ml-1 text-sm">
                        {movie.rating || "N/A"}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mt-2">
                      {movie.summary ||
                        movie.overview ||
                        "No description available"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}