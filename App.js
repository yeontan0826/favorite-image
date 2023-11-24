import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import store from './src/redux/store/store';

import { RootStackNavigations } from './src/navigation/rootStackNavigations';

export default function App() {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <RootStackNavigations />
      </Provider>
    </NavigationContainer>
  );
}
