// types.ts
export interface Movie {
    id: number;
    title: string;
    release_date?: string;
    year?: string;
    rating?: number;
    overview?: string;
    summary?: string;
    poster_path?: string;
    image?: string;
  }
  
  export interface Message {
    id: number;
    text?: string;
    sender: 'user' | 'bot';
    timestamp: Date;
    typing?: boolean;
    recommendations?: Movie[];
  }
  
  export type HeaderProps = {
    showFavorites: boolean;
    setShowFavorites: (show: boolean) => void;
  };
  
  export type FavoritesListProps = {
    favorites?: Movie[];
    removeFromFavorites: (movieId: number) => void;
    isLoading?: boolean;
  };
  
  export type ChatMessagesProps = {
    messages: Message[];
    addToFavorites: (movie: Movie) => void;
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
  };
  
  export type ChatInputProps = {
    input: string;
    setInput: (value: string) => void;
    handleSendMessage: (e: React.FormEvent) => void;
    isAIThinking: boolean;
  };
  
  export type MovieCardProps = {
    movie: Movie;
    addToFavorites: (movie: Movie) => void;
  };