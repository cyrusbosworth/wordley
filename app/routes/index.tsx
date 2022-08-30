import React from 'react';
import { Link } from 'remix';

export default function index() {
  return (
    <>
      <Link to={'/new'}>Create a puzzle</Link>
      <br></br>
      <Link to={'/random'}>Do a random puzzle</Link>
    </>
  );
}
