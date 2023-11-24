import { FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import { Typography } from '../components/typography';
import { Header } from '../components/header/header';
import { PhotoListItem } from '../components/photoListItem';

export const FavoriteImageScreen = (props) => {
  const imageList = useSelector((state) => {
    return state.favorite.favoriteList;
  });

  const ListEmptyComponent = () => (
    <EmptyContainer>
      <Typography color="gray">관심있는 이미지가 없습니다</Typography>
    </EmptyContainer>
  );

  return (
    <View style={{ flex: 1 }}>
      <Header>
        <Header.Title title="FAVORITE" />
      </Header>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        data={imageList}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={({ item }) => <PhotoListItem url={item} />}
      />
    </View>
  );
};

const EmptyContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
