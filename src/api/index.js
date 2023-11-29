import axios from 'axios';

//const baseUrl = `http://localhost:9000/api`; 

const baseUrl = import.meta.env.VITE_API_URL;

export async function getAll(url) { 
  const {
    data,
  } = await axios.get(`${baseUrl}/${url}`);

  

  return data.items;
}

export const save = async (url, { arg: body }) => { 
  await axios.post(`${baseUrl}/${url}`, body); 
};

export const post = async (url, { arg }) => {
  const {
    data,
  } = await axios.post(`${baseUrl}/${url}`, arg);

  return data;
};