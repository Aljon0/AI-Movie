import { Bookmark, Star } from "lucide-react";

export default function MovieCard({ movie, addToFavorites }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex">
        <div className="w-1/3">
          <img
            src={movie.image}
            alt={movie.title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="w-2/3 p-4">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-lg text-[#131B23]">
              {movie.title}{" "}
              <span className="text-[#816C61] font-normal">({movie.year})</span>
            </h3>
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 fill-yellow-500" />
              <span className="ml-1 text-sm">{movie.rating}</span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-2">{movie.summary}</p>
          <button
            onClick={() => addToFavorites(movie)}
            className="mt-3 flex items-center text-sm text-[#2274A5] hover:text-opacity-80"
          >
            <Bookmark size={14} className="mr-1" />
            Save to favorites
          </button>
        </div>
      </div>
    </div>
  );
}
