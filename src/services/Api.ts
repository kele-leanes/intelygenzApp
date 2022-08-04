import axios, { AxiosResponse } from 'axios';
import { BASE_URL, PUBLIC_API_KEY, PRIVATE_API_KEY } from '@env';
import md5 from 'md5';
import { CharactersResponse } from 'src/types';

const apiInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
  params: {
    ts: Date.now(),
    apikey: PUBLIC_API_KEY,
    hash: md5(`${Date.now()}${PRIVATE_API_KEY}${PUBLIC_API_KEY}`),
  },
});

class Api {
  getCharacters = async ({ limit = 20, offset = 0 }) => {
    const { data, status } = await apiInstance.get<
      AxiosResponse<CharactersResponse>
    >(`/v1/public/characters?limit=${limit}&offset=${offset}`);
    return { data: data.data, error: status > 400 };
  };

  getDetails = async (id: number) => {
    const { data } = await apiInstance.get<AxiosResponse<CharactersResponse>>(
      `/v1/public/characters/${id}`,
    );
    return { data: data.data };
  };
}

const api = new Api();

export { api };
