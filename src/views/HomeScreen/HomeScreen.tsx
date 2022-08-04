import React, { useCallback, useState } from 'react';
import { useEffect } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { Card } from 'src/components';
import { RootStackScreenProps } from 'src/navigation/RootStack';
import { api } from 'src/services/Api';
import { Character } from 'src/types';
import { styles } from './HomeScreen.styles';

export const HomeScreen: React.FC<RootStackScreenProps<'HomeScreen'>> = ({
  navigation,
}) => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [offset, setOffset] = useState(20);

  const getInitialsCharacters = async () => {
    setIsLoading(true);
    setHasError(false);
    try {
      const { data, error } = await api.getCharacters({});
      if (!error) {
        setCharacters(data.results);
        setOffset(data.limit);
        setIsLoading(false);
      }
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const onLoadMoreCharacters = async () => {
    if (!isLoading) {
      const { data } = await api.getCharacters({ offset });
      setCharacters(prevState => [...prevState, ...data.results]);
      setOffset(prevSate => prevSate + data.offset);
    }
  };

  useEffect(() => {
    getInitialsCharacters();
  }, []);

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
      data={characters}
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
