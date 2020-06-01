import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { AppLoading } from 'expo';
import { Root } from 'native-base';
import Home from './src/views/home';
import Search from './src/views/search';

const Stack = createStackNavigator();

/* eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types */
export default (App) => {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        /* eslint-disable global-require */
        await Font.loadAsync({
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
          ...Ionicons.font,
        });
        /* eslint-enable global-require */
      } catch (error) {
        /* eslint-disable-next-line no-console */
        console.log(error);
      }
      setReady(true);
    })();
  }, []);
  if (!ready) {
    return <AppLoading />;
  }
  return (
    ready && (
      <Root>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Search" component={Search} />
          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    )
  );
};
