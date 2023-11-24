import React from 'react';
import { View, Dimensions } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { Spacer } from './spacer';
import { Icon } from './icon';
import { Button } from './button';
import { Typography } from './typography';

const { width } = Dimensions.get('window');

export const HeaderWithoutCompound = (props) => {
  return (
    <SafeAreaInsetsContext.Consumer>
      {(insets) => (
        <View style={{ paddingTop: insets.top }}>
          <Wrapper>
            <Spacer horizontal={true} space={12} />
            <Container>
              <LeftContainer>
                {props.leftIcon && (
                  <Button onPress={props.leftIcon.onPress}>
                    <Icon iconName={props.leftIcon.iconName} size={28} />
                  </Button>
                )}

                <Typography fontSize={18}>{props.title}</Typography>
              </LeftContainer>
              {props.rightIcon && (
                <Button onPress={props.rightIcon.onPress}>
                  <Icon iconName={props.rightIcon.iconName} size={28} />
                </Button>
              )}
            </Container>
            <Spacer horizontal={true} space={12} />
          </Wrapper>
        </View>
      )}
    </SafeAreaInsetsContext.Consumer>
  );
};

const Wrapper = styled.View`
  width: ${width}px;
  height: 56px;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: gray;
`;

const Container = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;
