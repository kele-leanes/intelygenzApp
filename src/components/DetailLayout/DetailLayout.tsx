import React from 'react';
import {
  ActivityIndicator,
  Image,
  Linking,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Character } from 'src/types';
import { styles } from './DetailLayout.styles';
import { theme } from 'src/styles/theme';

export const DetailLayout: React.FC<{ data?: Character; loading: boolean }> = ({
  data,
  loading,
}) => {
  const imageUri = (
    data?.thumbnail.path +
    '/portrait_uncanny.' +
    data?.thumbnail.extension
  ).replace('http://', 'https://');

  const handlePressLink = async (url: string) => {
    await Linking.openURL(url);
  };

  const PressableLink: React.FC<{ type: string; url: string }> = ({
    type,
    url,
  }) => {
    const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
    const onPressLink = () => handlePressLink(url);
    return (
      <TouchableOpacity onPress={onPressLink}>
        <Text style={styles.link}>{capitalizedType}</Text>
      </TouchableOpacity>
    );
  };

  return loading ? (
    <View style={[styles.container, styles.justifyCenter]}>
      <ActivityIndicator color={theme.primary} size="large" />
    </View>
  ) : data ? (
    <ScrollView contentContainerStyle={styles.container}>
      <Image style={styles.image} source={{ uri: imageUri }} />
      <Text style={styles.title}>{data.name}</Text>
      <Text style={styles.description}>
        {data.description.length ? data.description : 'No description'}
      </Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>More info</Text>
        {data.urls.map((url, index) => (
          <PressableLink key={index} {...url} />
        ))}
      </View>
    </ScrollView>
  ) : (
    <Text>Something went wrong!</Text>
  );
};
