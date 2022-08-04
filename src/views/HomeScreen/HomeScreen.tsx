import React, { useCallback } from 'react';
import { FlatList, RefreshControl, Text, View } from 'react-native';
import { Card } from 'src/components';
import { RootStackScreenProps } from 'src/navigation/RootStack';
import { Character } from 'src/types';
import { useHomeScreen } from './HomeScreen.hooks';
import { styles } from './HomeScreen.styles';

export const HomeScreen: React.FC<RootStackScreenProps<'HomeScreen'>> = ({
  navigation,
}) => {
  const {
    isLoading,
    hasError,
    charactersResponse,
    onLoadMoreCharacters,
    getInitialsCharacters,
  } = useHomeScreen();

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
