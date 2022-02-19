import React from 'react';
import { useGuess } from '~/contexts/GuessProvider';
import { FiDelete } from 'react-icons/fi';

function DeleteKey() {
  const { guess, setGuess } = useGuess();
  const handleClick = () => {
    setGuess(guess => {
      if (guess === '') return '';
      return guess.slice(0, -1);
    });
  };

  return (
    <button onClick={handleClick} style={{ width: '3rem', paddingTop: '5px' }}>
      <FiDelete />
    </button>
  );
}

export default DeleteKey;
