import React, { useState } from 'react';

import { useGame } from '~/contexts/GameProvider';
import { useGuess } from '~/contexts/GuessProvider';

type KeyProps = {
  value: string;
};

function Key(props: KeyProps) {
  const { guess, setGuess } = useGuess();
  const { game } = useGame();

  const handleClick = () => {
    if (game.progress !== 'inProg') return;
    if (guess.length < game.word.length) {
      setGuess(guess => guess + props.value);
    } else {
      return;
    }
  };

  if (game.correctLetters.includes(props.value)) {
    return (
      <button onClick={handleClick} className={'correct'}>
        {props.value}
      </button>
    );
  }
  if (game.incorrectLetters.includes(props.value)) {
    return (
      <button onClick={handleClick} className={'incorrect'}>
        {props.value}
      </button>
    );
  }
  if (game.inWordLetters.includes(props.value)) {
    return (
      <button onClick={handleClick} className={'inWord'}>
        {props.value}
      </button>
    );
  }

  return <button onClick={handleClick}>{props.value}</button>;
}

export default Key;
