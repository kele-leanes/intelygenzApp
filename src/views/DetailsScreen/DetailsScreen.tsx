import React, { useCallback, useEffect, useState } from 'react';
import { DetailLayout } from 'src/components';
import { RootStackScreenProps } from 'src/navigation/RootStack';
import { api } from 'src/services/Api';
import { Character } from 'src/types';

export const DetailsScreen: React.FC<RootStackScreenProps<'Details'>> = ({
  route,
}) => {
  const { id } = route.params;
  const [isLoading, setIsLoading] = useState(true);
  const [character, setCharacter] = useState<Character>();

  const getDetails = useCallback(async () => {
    try {
      const { data } = await api.getDetails(id);
      setCharacter(data.results[0]);
    } catch {
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    getDetails();
  }, [getDetails]);

  return <DetailLayout data={character} loading={isLoading} />;
};
