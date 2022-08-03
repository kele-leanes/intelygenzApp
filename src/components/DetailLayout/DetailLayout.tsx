import React from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { Character } from 'src/types';
import { styles } from './DetailLayout.styles';

export const DetailLayout: React.FC<{ data?: Character; loading: boolean }> = ({
  data,
  loading,
}) => {
  const imageUri = (
    data?.thumbnail.path +
    '/portrait_uncanny.' +
    data?.thumbnail.extension
  ).replace('http://', 'https://');
  return loading ? (
    <ActivityIndicator />
  ) : data ? (
    <View style={[styles.flex1, styles.alignCenter]}>
      <Image style={styles.image} source={{ uri: imageUri }} />
      <Text>{data.name}</Text>
      <Text>{data.description}</Text>
    </View>
  ) : (
    <Text>Something went wrong!</Text>
  );
};
