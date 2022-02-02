import axios from 'axios';
import { BACKEND_URL } from './constants';

async function fetchAllContents() {
  const res = await axios.get(BACKEND_URL);
  return res.data;
}

export default fetchAllContents;
