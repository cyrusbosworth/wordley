export default function makeUrl() {
  let url = '';

  const letters = 'abcdefghijklmnopqrstuvwxyz';

  for (let i = 0; i < 8; i++) {
    const rnd = Math.floor(Math.random() * letters.length);
    url += letters[rnd];
  }

  return url;
}
