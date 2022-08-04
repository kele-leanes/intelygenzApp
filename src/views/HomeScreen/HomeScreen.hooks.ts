import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';
import { api } from 'src/services/Api';
import { CharactersResponse } from 'src/types';

const INITIAL_STATE = {
  results: [],
  offset: 20,
  limit: 0,
  total: 0,
  count: 0,
};

export const useHomeScreen = () => {
  const [charactersResponse, setCharactersResponse] =
    useState<CharactersResponse>(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const { getItem, setItem } = useAsyncStorage('@CHARACTERS');

  const writeItemToStorage = useCallback(
    async (newValue: CharactersResponse) => {
      await setItem(JSON.stringify(newValue));
      setCharactersResponse(newValue);
    },
    [setItem],
  );

  const getInitialsCharacters = useCallback(async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const { data, error } = await api.getCharacters({});
      if (!error) {
        writeItemToStorage(data);
        setIsLoading(false);
      }
    } catch {
      writeItemToStorage(INITIAL_STATE);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, [writeItemToStorage]);

  const readItemFromStorage = useCallback(async () => {
    const item = await getItem();
    if (item !== null) {
      return setCharactersResponse(JSON.parse(item));
    }
    getInitialsCharacters();
  }, [getInitialsCharacters, getItem]);

  const onLoadMoreCharacters = async () => {
    if (!isLoading) {
      const { data } = await api.getCharacters({
        offset: charactersResponse.results.length,
      });
      writeItemToStorage({
        ...data,
        results: [...(charactersResponse?.results ?? []), ...data.results],
      });
    }
  };

  useEffect(() => {
    readItemFromStorage();
  }, [readItemFromStorage]);

  return {
    isLoading,
    hasError,
    charactersResponse,
    onLoadMoreCharacters,
    getInitialsCharacters,
  };
};
