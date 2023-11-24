import { Animated, useWindowDimensions } from 'react-native';
import { Button } from './button';
import { RemoteImage } from './remoteImage';
import { useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

export const PhotoListItem = (props) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();
  const [animValue] = useState(new Animated.Value(0));

  const onPressItem = useCallback(() => {
    navigation.navigate('ImageDetailScreen', { url: props.url });
  }, []);

  const onPressIn = useCallback(() => {
    Animated.timing(animValue, {
      duration: 200,
      toValue: 1,
      useNativeDriver: false,
    }).start();
  }, []);

  const onPressOut = useCallback(() => {
    Animated.timing(animValue, {
      duration: 200,
      toValue: 0,
      useNativeDriver: false,
    }).start();
  }, []);

  const scale = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [1.0, 0.9],
  });

  return (
    <Button
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPressItem}
      style={{ paddingHorizontal: 20, paddingVertical: 10 }}
    >
      <Animated.View style={{ transform: [{ scale: scale }] }}>
        <RemoteImage url={props.url} width={width - 40} height={width * 1.2} />
      </Animated.View>
    </Button>
  );
};
