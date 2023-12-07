import axiosRoot from "axios";

//const baseUrl = `http://localhost:9000/api`;

const baseUrl = import.meta.env.VITE_API_URL;

export const axios = axiosRoot.create({
  baseURL: baseUrl,
});

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers["Authorization"];
  }
};

export async function getAll(url) {
  const { data } = await axios.get(`/${url}`);

  return data.items;
}
/*
export const save = async (url, { arg: body }) => { 
  await axios.post(`/${url}`, body); 
};
*/

export const save = async (url, { arg: body }) => {
  const { id, ...values } = body;
  await axios({
    method: id ? "PUT" : "POST",
    url: `/${url}${id ?? ""}`,
    data: values,
  });
};

export const post = async (url, { arg }) => {
  const { data } = await axios.post(`/${url}`, arg);

  return data;
};
