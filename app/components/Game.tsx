import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { useGame } from '~/contexts/GameProvider';
import { useGuess } from '~/contexts/GuessProvider';
import Attempt from './Attempt';
import Keyboard from './Keyboard';

function Game() {
  const { guess, setGuess } = useGuess();
  const { game } = useGame();

  const attempts = game.word.split('');
  attempts.push('');

  return (
    <div className='game_board'>
      {attempts.map((_, index) => {
        if (index === game.guessesAttempted) {
          return <Attempt key={index} type='active' num={index} />;
        }
        if (index < game.guessesAttempted) {
          return (
            <Attempt
              key={index}
              type='used'
              usedGuess={game.attempts[index].word}
              num={index}
            />
          );
        }
        if (index > game.guessesAttempted) {
          return <Attempt key={index} type='unused' num={index} />;
        }
      })}
      <Keyboard />
      <Toaster
        position='top-center'
        toastOptions={{
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        }}
      />
    </div>
  );
}

export default Game;
