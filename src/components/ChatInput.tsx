import { Send } from "lucide-react";
import { ChatInputProps } from "../utils/types";

export default function ChatInput({
  input,
  setInput,
  handleSendMessage,
  isAIThinking,
}: ChatInputProps) {
  return (
    <form
      onSubmit={handleSendMessage}
      className="border-t border-gray-200 p-4 bg-white"
    >
      <div className="max-w-3xl mx-auto flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            isAIThinking
              ? "AI is thinking..."
              : "Ask for movie recommendations..."
          }
          className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2274A5]"
          disabled={isAIThinking}
        />
        <button
          type="submit"
          className={`bg-[#2274A5] text-white px-4 py-2 rounded-r-lg transition ${
            isAIThinking
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-opacity-90"
          }`}
          disabled={isAIThinking}
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
}