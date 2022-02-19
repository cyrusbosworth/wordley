import React, { useState } from 'react';
import { useContext } from 'react';

interface MyContextType {
  guess: string;
  setGuess: React.Dispatch<React.SetStateAction<string>>;
}

const defaultContext = {
  guess: '',
  setGuess: () => '',
};

const GuessContext = React.createContext<MyContextType>(defaultContext);

export function useGuess() {
  return useContext(GuessContext);
}

export const GuessProvider: React.FC = ({ children }) => {
  const [guess, setGuess] = useState<string>('');

  return (
    <GuessContext.Provider value={{ guess: guess, setGuess: setGuess }}>
      {children}
    </GuessContext.Provider>
  );
};
