import React, { useState } from 'react';
import { useGuess } from '~/contexts/GuessProvider';
import { FiDelete } from 'react-icons/fi';
import handleGuess, { Game } from '~/utils/GameLogic';
import { useGame } from '~/contexts/GameProvider';
import toast from 'react-hot-toast';
import axios from 'axios';

function EnterKey() {
  const { guess, setGuess } = useGuess();
  const { game, setGame, handleGame } = useGame();

  const handleClick = async () => {
    //handleGuess(game, guess);

    if (guess.length !== game.word.length) return;
    try {
      const response: any = await axios(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${guess}`
      );
      console.log(response);
      if (response.status !== 404) {
        handleGame();
        setGuess('');
      } else {
        toast('Word not in dictionary');
      }
    } catch (error) {
      toast('Word not in dictionary');
    }
  };

  return (
    <button style={{ width: '3rem', fontSize: '12px' }} onClick={handleClick}>
      Enter
    </button>
  );
}

export default EnterKey;
