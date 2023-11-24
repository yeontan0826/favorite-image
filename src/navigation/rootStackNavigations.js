import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabNavigations } from './bottomTabNavigations';
import { ImageDetailScreen } from '../screen/imageDetailScreen';

const Stack = createNativeStackNavigator();

export const RootStackNavigations = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BottomTab" component={BottomTabNavigations} />
      <Stack.Screen name="ImageDetailScreen" component={ImageDetailScreen} />
    </Stack.Navigator>
  );
};
