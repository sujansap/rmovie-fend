import axios from 'axios';

const baseUrl = `http://localhost:9000/api`; // 👈 1

export async function getAll(url) { // 👈 2
  const {
    data,
  } = await axios.get(`${baseUrl}/${url}`); // 👈 3

  

  return data.items;
}

export const save = async (url, { arg: body }) => { // 👈 1
  await axios.post(`${baseUrl}/${url}`, body); // 👈 2
};