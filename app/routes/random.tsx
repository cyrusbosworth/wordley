import { Puzzle } from '@prisma/client';
import React from 'react';
import { LoaderFunction, useLoaderData } from 'remix';
import Game from '~/components/Game';
import { GameProvider } from '~/contexts/GameProvider';
import { GuessProvider } from '~/contexts/GuessProvider';
import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async () => {
  const puzzles = await db.puzzle.findMany();

  const puzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
  return puzzle;
};

export default function random() {
  const puzzle = useLoaderData<Puzzle>();
  return (
    <GuessProvider>
      <GameProvider word={puzzle.word.toUpperCase()}>
        <div>A Wordle puzzle from {puzzle.author}</div>

        <Game />
      </GameProvider>
    </GuessProvider>
  );
}
