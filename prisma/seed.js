const { PrismaClient, Prisma } = require('@prisma/client');

const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getPuzzles().map(puzz => {
      return db.puzzle.create({ data: puzz });
    })
  );
}

seed();

function getPuzzles() {
  return [
    {
      author: 'Cyrus',

      word: 'SKILL',
      url: '001',
    },
    {
      author: 'Cyrus',

      word: 'POOPS',
      url: '002',
    },
    {
      author: 'Cyrus',

      word: 'VAGINA',
      url: '003',
    },
    {
      author: 'Cyrus',

      word: 'PENIS',
      url: '004',
    },
  ];
}
