import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { Character } from 'src/types';
import { styles } from './Card.styles';

export const Card: React.FC<{
  item: Character;
  onPressDetails: (id: number, name: string) => void;
}> = ({ item, onPressDetails }) => {
  const imageUri = (
    item.thumbnail.path +
    '/portrait_medium.' +
    item.thumbnail.extension
  ).replace('http://', 'https://');

  const onDetails = () => onPressDetails(item.id, item.name);

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && { opacity: 0.5 }]}
      onPress={onDetails}>
      <Image
        source={{
          uri: imageUri,
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.description} numberOfLines={3}>
          {item.description.length ? item.description : 'No description'}
        </Text>
      </View>
      <View style={styles.detailButton}>
        <Text style={styles.detailButtonText}>Details &gt;</Text>
      </View>
    </Pressable>
  );
};
