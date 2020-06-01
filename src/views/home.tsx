import React, { useState, useEffect } from 'react';
import {
  Container,
  Content,
  Footer,
  FooterTab,
  Text,
  Form,
  Item,
  Label,
  Input,
  Button,
  Toast,
} from 'native-base';
import { observer } from 'mobx-react';
import { StackNavigationProp } from '@react-navigation/stack';
import { StyleSheet, Image } from 'react-native';
import useStores from '../utils/useStores';
import BidderStore from '../stores/bidder';

type RootStackParamList = {
  Home: undefined;
  Search: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: HomeScreenNavigationProp;
  bidderStore: BidderStore;
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
  form: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  button: {
    marginHorizontal: 10,
    marginVertical: 20,
  },
});

export const Home: React.FC<Props> = ({ navigation, bidderStore }: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [readyForCreate, setReadyForCreate] = useState(false);

  const createUser = async () => {
    await bidderStore.create(email, password);
    if (!bidderStore.error) navigation.navigate('Search');
    else Toast.show({ text: bidderStore.error, buttonText: 'Okay' });
  };
  function validateForm() {
    if (email && password) {
      setReadyForCreate(true);
    } else {
      setReadyForCreate(false);
    }
  }
  const UpdateEmail = (emailInput) => {
    setEmail(emailInput);
  };
  const UpdatePassword = (passwordInput) => {
    setPassword(passwordInput);
  };
  useEffect(() => {
    validateForm();
  }, [email, password]);
  return (
    <Container>
      <Content contentContainerStyle={styles.container}>
        {/* eslint-disable-next-line global-require */}
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <Form style={styles.form}>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              data-testid="bidder-email-input"
              value={email}
              onChangeText={UpdateEmail}
            />
          </Item>
          <Item floatingLabel>
            <Label>password</Label>
            <Input
              data-testid="bidder-password-input"
              value={password}
              onChangeText={UpdatePassword}
            />
          </Item>
        </Form>
        <Button
          block
          dark
          disabled={!readyForCreate}
          style={styles.button}
          data-testid="bidder-create-button"
          onPress={createUser}
        >
          <Text>Create User</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default observer((props) =>
  Home({ bidderStore: useStores().bidderStore, ...props })
);
