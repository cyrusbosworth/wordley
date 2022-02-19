import React, { useState } from 'react';
import { useContext } from 'react';
import toast from 'react-hot-toast';

import { useGuess } from './GuessProvider';

interface MyContextType {
  game: Game;
  setGame: React.Dispatch<React.SetStateAction<Game>>;
  handleGame: () => void;
}
type Result = Array<'correct' | 'incorrect' | 'inWord'>;

interface Attempt {
  word: string;

  result: Result;
}

interface Game {
  word: string;
  guessesAttempted: number;
  correctLetters: string[];
  incorrectLetters: string[];
  inWordLetters: string[];
  attempts: Attempt[];
  progress: 'win' | 'lose' | 'inProg';
}

const defaultGame: Game = {
  word: '',
  guessesAttempted: 0,
  correctLetters: [],
  inWordLetters: [],
  incorrectLetters: [],
  attempts: [],
  progress: 'inProg',
};

const defaultContext = {
  game: defaultGame,
  setGame: () => defaultGame,
  handleGame: () => {},
};

const GameContext = React.createContext<MyContextType>(defaultContext);

export function useGame() {
  return useContext(GameContext);
}
type GameProviderProps = {
  children?: React.ReactNode;
  word: string;
};

export const GameProvider: React.FC<GameProviderProps> = props => {
  const { guess } = useGuess();
  const [game, setGame] = useState<Game>({
    word: props.word,
    guessesAttempted: 0,
    correctLetters: [],
    inWordLetters: [],
    incorrectLetters: [],
    attempts: [],
    progress: 'inProg',
  });

  const handleGame = () => {
    let progress: 'win' | 'lose' | 'inProg' = 'inProg';
    const result: Result = [];
    for (let i = 0; i < guess.length; i++) {
      result[i] = 'incorrect';
    }

    const wordCheck = [...game.word];

    for (let i = 0; i < guess.length; i++) {
      const letter = guess.charAt(i);

      if (letter === game.word[i]) {
        result[i] = 'correct';
        wordCheck[i] = '';
        if (game.correctLetters.indexOf(letter) === -1) {
          setGame(game => ({
            ...game,
            correctLetters: [...game.correctLetters, letter],
          }));
        }
      }
    }

    for (let i = 0; i < guess.length; i++) {
      const letter = guess.charAt(i);

      const locale = wordCheck.indexOf(letter);

      if (locale != -1 && result[i] !== 'correct') {
        result[i] = 'inWord';
        wordCheck[locale] = '';
        if (game.inWordLetters.indexOf(letter) === -1) {
          setGame(game => ({
            ...game,
            inWordLetters: [...game.inWordLetters, letter],
          }));
        }
      }
    }

    for (let i = 0; i < guess.length; i++) {
      if (
        !game.word.includes(guess.charAt(i)) &&
        game.incorrectLetters.indexOf(guess.charAt(i)) === -1
      ) {
        setGame(game => ({
          ...game,
          incorrectLetters: [...game.incorrectLetters, guess.charAt(i)],
        }));
      }
    }

    if (result.every(r => r === 'correct')) {
      progress = 'win';

      toast('You Win!');
    }

    setGame(game => {
      return {
        ...game,
        progress: progress,
        guessesAttempted: game.guessesAttempted + 1,
        attempts: [...game.attempts, { word: guess, result: result }],
      };
    });

    if (game.guessesAttempted === game.word.length && game.progress !== 'win') {
      setGame(game => ({
        ...game,
        progress: 'lose',
      }));
      toast('The word was ' + game.word);
    }
    console.log('guess', guess);
    console.log('Game', game);
  };

  return (
    <GameContext.Provider value={{ game, setGame, handleGame }}>
      {props.children}
    </GameContext.Provider>
  );
};
