import { useCallback, useState } from 'react';
import { ActivityIndicator, View, useWindowDimensions } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';

import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

import { Header } from '../components/header/header';
import { RemoteImage } from '../components/remoteImage';
import { Button } from '../components/button';
import { Typography } from '../components/typography';
import { Icon } from '../components/icon';
import { onClickFavorite } from '../redux/actions/favorite';

export const ImageDetailScreen = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const [downloading, setDownloading] = useState(false);

  const dispatch = useDispatch();

  const onPressFavorite = useCallback(() => {
    dispatch(onClickFavorite(route.params.url));
  }, []);

  const onPressBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onPressDownload = useCallback(async () => {
    setDownloading(true);

    const downloadResumable = FileSystem.createDownloadResumable(
      route.params.url,
      `${FileSystem.documentDirectory}${new Date().getMilliseconds()}.jpg`
    );
    try {
      const { uri } = await downloadResumable.downloadAsync();
      console.log('Finished download! => ', uri);

      const permissionResult = await MediaLibrary.getPermissionsAsync(true);
      console.log('permissionResult => ', permissionResult);

      if (permissionResult.status === 'denied') {
        // 거부 상태
        return;
      }

      if (permissionResult.status === 'undetermined') {
        const requestResult = await MediaLibrary.requestPermissionsAsync();
        console.log('requestResult => ', requestResult);
        if (requestResult.status === 'denied') {
          return;
        }
      }

      const asset = await MediaLibrary.createAssetAsync(uri);
      const album = await MediaLibrary.createAlbumAsync(
        'MyFirstAlbum',
        asset,
        false
      );

      console.log(album);
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  }, []);

  const { width } = useWindowDimensions();

  const isFavorite = useSelector((state) => {
    return (
      state.favorite.favoriteList.filter((item) => item === route.params.url)
        .length > 0
    );
  });

  return (
    <View style={{ flex: 1 }}>
      {/* 헤더 */}
      <Header>
        <Header.Group>
          <Header.Icon name={'arrow-back'} onPress={onPressBack} />
          <Header.Title style={{ marginLeft: 6 }} title="IMAGE DETAIL" />
        </Header.Group>
        <Header.Icon
          name={isFavorite ? 'heart' : 'heart-outline'}
          color="red"
          onPress={onPressFavorite}
        />
      </Header>
      <View style={{ flex: 1 }}>
        <RemoteImage
          url={route.params.url}
          width={width}
          height={width * 1.5}
        />
      </View>
      {/* 다운로드 버튼 */}
      <Button onPress={onPressDownload}>
        <DownloadButton width={width}>
          {downloading ? (
            <ActivityIndicator color="black" />
          ) : (
            <>
              <Typography fontSize={18} fontWeight={500} color="black">
                DOWNLOAD
              </Typography>
              <Icon
                style={{ marginLeft: 4 }}
                name="download"
                size={26}
                color={'black'}
              />
            </>
          )}
        </DownloadButton>
      </Button>
    </View>
  );
};

const DownloadButton = styled.View`
  width: ${(props) => props.width * 0.8}px;
  height: 52px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-bottom: 36px;
  border-radius: 8px;
  border-width: 1px;
  border-color: black;
`;
