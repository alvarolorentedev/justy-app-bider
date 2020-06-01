import React from 'react';
import { Container, Content, Footer, FooterTab, Text } from 'native-base';
import { observer } from 'mobx-react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Image } from 'react-native';
import useStores from '../utils/useStores';

type RootStackParamList = {
  Home: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export const Search: React.FC<Props> = () => {
  return (
    <Container>
      <Content contentContainerStyle={styles.container}>
        {/* eslint-disable-next-line global-require */}
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
      </Content>
    </Container>
  );
};

export default observer((props) => Search({ stores: useStores(), ...props }));
