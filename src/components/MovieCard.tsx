import { MovieCardProps } from "../utils/types";

export default function MovieCard({ movie, addToFavorites }: MovieCardProps) {
  return (
    <div className="bg-gray-50 rounded-md shadow-sm p-3 flex">
      <div className="w-16 h-24 bg-gray-200 flex-shrink-0 rounded overflow-hidden">
        {movie.poster_path ? (
          <img
            src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <span className="text-xs text-center">No Image</span>
          </div>
        )}
      </div>
      <div className="ml-3 flex-1">
        <h3 className="font-bold text-gray-800">{movie.title}</h3>
        <div className="flex items-center text-sm text-gray-600 mt-1">
          {movie.release_date && (
            <span>{new Date(movie.release_date).getFullYear()}</span>
          )}
          {movie.rating && (
            <span className="ml-2 flex items-center">
              <svg
                className="w-4 h-4 text-yellow-500 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {movie.rating}
            </span>
          )}
        </div>
        {movie.overview && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {movie.overview}
          </p>
        )}
        <button
          onClick={() => addToFavorites(movie)}
          className="mt-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md transition-colors"
        >
          Add to Favorites
        </button>
      </div>
    </div>
  );
}