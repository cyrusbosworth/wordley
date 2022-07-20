import { LoaderFunction, useLoaderData } from 'remix';
import { db } from '~/utils/db.server';

export const loader: LoaderFunction = async ({ params }: any) => {
  const puzzle = await db.puzzle.findMany();
  return puzzle;
};

export default function list() {
  const words = useLoaderData();
  console.log(words);
  return <div>list</div>;
}
