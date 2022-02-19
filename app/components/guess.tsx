import React, { SyntheticEvent, useState } from 'react';
import { MyContextType, useGuess } from '~/contexts/GuessProvider';

export default function Guess() {
  const { guess, setGuess } = useGuess();

  return (
    <div>
      {/* <input type='text' onChange={e => handleChange(e)} /> */}
      {guess}
    </div>
  );
}
