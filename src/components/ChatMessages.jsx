import MovieCard from "./MovieCard";

export default function ChatMessages({
  messages,
  addToFavorites,
  messagesEndRef,
}) {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-[#E9F1F7]">
      <div className="max-w-3xl mx-auto space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xl rounded-lg p-4 ${
                message.sender === "user"
                  ? "bg-[#2274A5] text-white rounded-br-none"
                  : "bg-white shadow rounded-bl-none"
              }`}
            >
              {message.typing ? (
                <div className="flex space-x-1 items-center h-6">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              ) : (
                <>
                  <p className="mb-1">{message.text}</p>
                  {message.recommendations && (
                    <div className="mt-4 space-y-4">
                      {message.recommendations.map((movie) => (
                        <MovieCard
                          key={movie.id}
                          movie={movie}
                          addToFavorites={addToFavorites}
                        />
                      ))}
                    </div>
                  )}
                </>
              )}
              <div
                className={`text-xs mt-1 ${
                  message.sender === "user" ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {!message.typing &&
                  new Date(message.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
