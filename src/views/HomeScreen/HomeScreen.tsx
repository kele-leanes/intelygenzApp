import React, { useState } from 'react';
import { useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native';
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
  const [offset, setOffset] = useState(20);

  const getInitialsCharacters = async () => {
    setIsLoading(true);
    const { data } = await api.getCharacters({});
    setCharacters(data.results);
    setOffset(data.limit);
    setIsLoading(false);
  };

  const onLoadMoreCharacters = async () => {
    const { data } = await api.getCharacters({ offset });
    setCharacters(prevState => [...prevState, ...data.results]);
    setOffset(prevSate => prevSate + data.offset);
  };

  useEffect(() => {
    getInitialsCharacters();
  }, []);

  const handlePressDetails = (id: number, name: string) => {
    navigation.navigate('Details', { id, name });
  };

  const renderItem = ({ item }: { item: Character }) => (
    <Card item={item} onPressDetails={handlePressDetails} />
  );

  return (
    <FlatList
      style={styles.flex1}
      contentContainerStyle={styles.container}
      data={characters}
      renderItem={renderItem}
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
