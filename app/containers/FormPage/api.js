import axios from 'axios';
import { BACKEND_URL } from './constants';

async function postNewContent(data) {
  const cleanupData = data.trim();
  const res = await axios.post(`${BACKEND_URL}/add`, {
    content: cleanupData,
  });
  return res.data;
}

export default postNewContent;
