import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ImageListScreen } from '../screen/imageListScreen';
import { FavoriteImageScreen } from '../screen/favoriteImageScreen';
import { TabIcon } from '../components/tabIcon';

const Tab = createBottomTabNavigator();

export const BottomTabNavigations = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => {
          const getIconName = () => {
            if (route.name === 'ImageListScreen') {
              return 'home';
            }

            if (route.name === 'FavoriteImageScreen') {
              return 'star';
            }
          };
          const iconName = getIconName();
          return <TabIcon iconName={iconName} iconColor={color} />;
        },
      })}
    >
      <Tab.Screen name="ImageListScreen" component={ImageListScreen} />
      <Tab.Screen name="FavoriteImageScreen" component={FavoriteImageScreen} />
    </Tab.Navigator>
  );
};
