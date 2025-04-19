import { useEffect, useRef, useState } from "react";
import ChatInput from "./components/ChatInput";
import ChatMessages from "./components/ChatMessages";
import FavoritesList from "./components/FavoritesList";
import Header from "./components/Header";

export default function MovieRecommendationApp() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your movie recommendation assistant. Tell me what kind of movies you enjoy, and I'll suggest some great options for you.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getAIResponse = (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (
          query.toLowerCase().includes("sci-fi") ||
          query.toLowerCase().includes("interstellar")
        ) {
          resolve({
            text: "Based on your interest in sci-fi movies like Interstellar, here are some recommendations:",
            recommendations: [
              {
                id: 1,
                title: "Arrival",
                year: 2016,
                image: "/api/placeholder/300/450",
                summary:
                  "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.",
                rating: 4.7,
              },
              {
                id: 2,
                title: "Dune",
                year: 2021,
                image: "/api/placeholder/300/450",
                summary:
                  "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset in the galaxy.",
                rating: 4.5,
              },
            ],
          });
        } else if (query.toLowerCase().includes("comedy")) {
          resolve({
            text: "Here are some great comedy movies you might enjoy:",
            recommendations: [
              {
                id: 3,
                title: "The Grand Budapest Hotel",
                year: 2014,
                image: "/api/placeholder/300/450",
                summary:
                  "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy in the hotel's glorious years under an exceptional concierge.",
                rating: 4.6,
              },
            ],
          });
        } else {
          resolve({
            text: "I'd recommend these popular movies based on your query:",
            recommendations: [
              {
                id: 4,
                title: "Everything Everywhere All at Once",
                year: 2022,
                image: "/api/placeholder/300/450",
                summary:
                  "An aging Chinese immigrant is swept up in an insane adventure, where she alone can save the world by exploring other universes connecting with the lives she could have led.",
                rating: 4.8,
              },
            ],
          });
        }
      }, 1000);
    });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const typingMessage = {
      id: messages.length + 2,
      typing: true,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, typingMessage]);

    const response = await getAIResponse(input);

    setMessages((prev) =>
      prev
        .filter((msg) => !msg.typing)
        .concat({
          id: messages.length + 2,
          text: response.text,
          recommendations: response.recommendations,
          sender: "bot",
          timestamp: new Date(),
        })
    );
  };

  const addToFavorites = (movie) => {
    if (!favorites.some((fav) => fav.id === movie.id)) {
      setFavorites((prev) => [...prev, movie]);
    }
  };

  const removeFromFavorites = (movieId) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== movieId));
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header
        showFavorites={showFavorites}
        setShowFavorites={setShowFavorites}
      />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col">
          {!showFavorites ? (
            <>
              <ChatMessages
                messages={messages}
                addToFavorites={addToFavorites}
                messagesEndRef={messagesEndRef}
              />
              <ChatInput
                input={input}
                setInput={setInput}
                handleSendMessage={handleSendMessage}
              />
            </>
          ) : (
            <FavoritesList
              favorites={favorites}
              removeFromFavorites={removeFromFavorites}
            />
          )}
        </div>
      </div>
    </div>
  );
}
