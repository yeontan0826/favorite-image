import { FlatList, View } from 'react-native';

import { Header } from '../components/header/header';
import { PhotoListItem } from '../components/photoListItem';
import { IMAGE_LIST } from '../constants';

export const ImageListScreen = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Group>
          <Header.Title title="IMAGE LIST" />
        </Header.Group>
      </Header>
      <FlatList
        style={{ flex: 1 }}
        data={IMAGE_LIST}
        renderItem={({ item }) => <PhotoListItem url={item} />}
      />
    </View>
  );
};
