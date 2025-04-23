/* eslint-disable no-unused-vars */
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
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Load favorites from localStorage
  const loadFavorites = () => {
    try {
      setIsLoading(true);
      const storedFavorites = localStorage.getItem("movieAppFavorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Failed to load favorites from localStorage:", error);
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Save favorites to localStorage
  const saveFavorites = (updatedFavorites) => {
    try {
      localStorage.setItem(
        "movieAppFavorites",
        JSON.stringify(updatedFavorites)
      );
    } catch (error) {
      console.error("Failed to save favorites to localStorage:", error);
    }
  };

  const getAIResponse = async (query) => {
    try {
      const response = await fetch(
        "https://ai-mr-api.onrender.com/api/recommend",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query }),
        }
      );
      const data = await response.json();
      console.log("API Response:", data);
      console.log("Recommendations:", data.recommendations);
      return data;
    } catch (error) {
      console.error("Failed to get recommendations:", error);
      return {
        text: "Sorry, I couldn't fetch recommendations right now. Please try again later.",
        recommendations: [],
      };
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "" || isAIThinking) return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsAIThinking(true);

    const typingMessage = {
      id: messages.length + 2,
      typing: true,
      sender: "bot",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, typingMessage]);

    try {
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
    } catch (error) {
      setMessages((prev) =>
        prev
          .filter((msg) => !msg.typing)
          .concat({
            id: messages.length + 2,
            text: "Sorry, I'm having trouble processing your request. Please try again.",
            sender: "bot",
            timestamp: new Date(),
          })
      );
    } finally {
      setIsAIThinking(false);
    }
  };

  const addToFavorites = (movie) => {
    if (!favorites.some((fav) => fav.id === movie.id)) {
      const updatedFavorites = [...favorites, movie];
      setFavorites(updatedFavorites);
      saveFavorites(updatedFavorites);
    }
  };

  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
  };

  useEffect(() => {
    // Load favorites from localStorage on component mount
    loadFavorites();
  }, []);

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
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </div>
  );
}
