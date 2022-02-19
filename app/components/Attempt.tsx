import React from 'react';
import { useGame } from '~/contexts/GameProvider';
import { useGuess } from '~/contexts/GuessProvider';

interface AttemptProps {
  usedGuess?: string;
  type: 'active' | 'used' | 'unused';
  num: number;
}

function Attempt(props: AttemptProps) {
  const { guess } = useGuess();
  const { game } = useGame();

  if (props.type === 'active') {
    return (
      <div className='attempt'>
        {game.word.split('').map((_, index) => (
          <div key={index} className='box'>
            {guess.charAt(index)}
          </div>
        ))}
      </div>
    );
  }
  if (props.type === 'unused') {
    return (
      <div className='attempt'>
        {game.word.split('').map((_, index) => (
          <div key={index} className='box'></div>
        ))}
      </div>
    );
  }
  if (props.type === 'used') {
    return (
      <div className='attempt'>
        {game.word.split('').map((_, index) => (
          <div
            key={index}
            className={'box ' + game.attempts[props.num].result[index]}
          >
            {game.attempts[props.num].word.charAt(index)}
          </div>
        ))}
      </div>
    );
  }
  return <></>;
}

export default Attempt;
