import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { Card } from 'src/components';
import { RootStackScreenProps } from 'src/navigation/RootStack';
import { api } from 'src/services/Api';
import { Character, CharactersResponse } from 'src/types';
import { styles } from './HomeScreen.styles';

const INITIAL_STATE = {
  results: [],
  offset: 20,
  limit: 0,
  total: 0,
  count: 0,
};

export const HomeScreen: React.FC<RootStackScreenProps<'HomeScreen'>> = ({
  navigation,
}) => {
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

  const handlePressDetails = useCallback(
    (id: number, name: string) => {
      navigation.navigate('Details', { id, name });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: Character }) => (
      <Card item={item} onPressDetails={handlePressDetails} />
    ),
    [handlePressDetails],
  );

  const ListEmptyComponent = useCallback(() => {
    return !isLoading ? (
      <View style={[styles.flex1, styles.center]}>
        <Text style={[styles.boldText, hasError && styles.errorText]}>
          {hasError ? 'Something went wrong!' : 'No data found!'}
        </Text>
        <Text style={styles.text}>Pull to refresh</Text>
      </View>
    ) : null;
  }, [hasError, isLoading]);

  return (
    <FlatList
      style={styles.flex1}
      contentContainerStyle={styles.container}
      data={charactersResponse?.results}
      renderItem={renderItem}
      ListEmptyComponent={ListEmptyComponent}
      onEndReached={onLoadMoreCharacters}
      refreshControl={
        <RefreshControl
          onRefresh={getInitialsCharacters}
          refreshing={isLoading}
        />
      }
    />
  );
};
