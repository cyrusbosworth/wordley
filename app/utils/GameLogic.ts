export interface Game {
  word: string;
  guessesAttempted: number;
  numCorrectLetters: number;
  dupLetters: Array<string | null>;
  incorrectLettersArr: string[];
  guesses: string[];
}

const handleGuess = async (game: Game, guess: string) => {
  game.dupLetters = [...game.word];
  let newScoreCard = [];

  // game.guessesAttempted += 1;
  for (let i = 0; i < guess.length; i++) {
    if (guess.charAt(i) == game.word.charAt(i)) {
      if (game.dupLetters[i] != null) {
        game.numCorrectLetters += 1;
      }
      game.dupLetters[i] = null;
      newScoreCard.push('🟩');
    } else if (
      guess.charAt(i) != game.word.charAt(i) &&
      game.word.includes(guess.charAt(i))
    ) {
      newScoreCard.push('🟨');
    } else {
      if (!game.incorrectLettersArr.includes(guess.charAt(i))) {
        game.incorrectLettersArr.push(guess.charAt(i));
      }
      newScoreCard.push('⬛');
    }
  }
  console.log(`newScoreCard ${newScoreCard}`);
  return newScoreCard;
};

export default handleGuess;
