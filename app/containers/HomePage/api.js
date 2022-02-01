import axios from 'axios';
import { BACKEND_HOST } from './constants';

// const config = {
//   headers: {
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
//   },
// };

async function fetchAllContents() {
  const res = await axios.get(BACKEND_HOST);
  console.log({ res });
  return { contents: ['test1', 'test2', 'abba3', 'have a good day 4'] };
}

export default fetchAllContents;
