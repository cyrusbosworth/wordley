import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { ActionFunction, Form, json, redirect, useActionData } from 'remix';
import { db } from '~/utils/db.server';
import makeUrl from '~/utils/makeURL';

type ActionData = {
  formError?: string;
  fieldErrors?: {
    word: string | undefined;
    author: string | undefined;
  };
  fields?: {
    word: string;
    author: string;
    url: string;
  };
  added?: boolean;
};

async function validateword(word: string) {
  const letters = /^[A-Za-z]+$/;

  if (word.length < 5 || word.length > 8) {
    return 'Word Must Be 5 to 8 Letters';
  }
  //TODO Check for weird characters
  if (!word.match(letters)) {
    return 'Word Contains Invalid Characters';
  }
  try {
    const response = await axios(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
  } catch {
    return 'Word Not In Dictionary';
  }
}

function validateAuthor(author: string) {
  if (author.trim().length === 0) return 'Enter A Name';
}

function badRequest(data: ActionData) {
  return json(data, { status: 400 });
}
export const action: ActionFunction = async ({ request }) => {
  const form = await request.formData();

  const word =
    form.get('word') === null
      ? ''
      : String(form.get('word')).toUpperCase().trim();

  const author = form.get('author') === null ? '' : String(form.get('author'));
  const url = makeUrl();
  const fields = { word, author, url };

  console.log(word, author, url, 'fields');
  const fieldErrors = {
    word: await validateword(word),
    author: validateAuthor(author),
  };

  if (Object.values(fieldErrors).some(Boolean)) {
    console.log(fieldErrors);
    return badRequest({ fieldErrors, fields });
  }

  const post = await db.puzzle.create({
    data: { word: word, author: author, url: url },
  });

  return json<ActionData>({ fieldErrors, fields, added: true });
};

export default function Index() {
  const actionData = useActionData<ActionData>();
  const [word, setWord] = useState('');
  const [fieldErrors, setFieldErrors] = useState<ActionData>({});
  const [location, setLocation] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWord(e.target.value);
    setFieldErrors({});
  };

  useEffect(() => {
    if (actionData?.fieldErrors) {
      setFieldErrors(actionData);
    }
  }, []);

  useEffect(() => {
    setLocation(
      `${window.location.protocol}//${window.location.hostname}/${actionData?.fields?.url}`
    );
  }, []);

  return (
    <>
      {actionData?.added ? (
        //Show Link
        <div>
          <h1>Your Puzzle has been created at:</h1>
          <h1>{location}</h1>
          <button
            onClick={() => {
              navigator.clipboard.writeText(location);
            }}
          >
            Copy to clipboard
          </button>
        </div>
      ) : (
        //Add new puzzle
        <div className='new-puzzle'>
          <h3>CREATE A PUZZLE</h3>
          <div className='entered-word'>
            {word
              .toUpperCase()
              .split('')
              .map(letter => (
                <div className='box'>{letter}</div>
              ))}
          </div>
          <Form reloadDocument method='post'>
            <div className='field'>
              <label>
                Enter Your Word
                <input
                  onChange={handleChange}
                  type='text'
                  name='word'
                  id='word'
                  maxLength={8}
                />
              </label>
            </div>
            <div className='error'>{fieldErrors?.fieldErrors?.word}</div>
            <div className='field'>
              <label>
                Enter Your Name
                <input type='text' name='author' id='author' />
              </label>
            </div>
            <div className='error'>{fieldErrors?.fieldErrors?.author}</div>

            <button type='submit' className='add-button'>
              Create
            </button>
          </Form>
        </div>
      )}
    </>
  );
}
