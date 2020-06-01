import React from 'react';

import { storiesOf } from '@storybook/react-native';
import NativeBaseWrapper from '../NativeBaseWrapper';

import Home from '../../../src/views/home';

const bidder = {
}

const baseBidderStore = {create: () => {}, ...bidder } 
const basenavigation = { navigate: () => {} }

storiesOf('Home', module)
.addDecorator(getStory => <NativeBaseWrapper>{getStory()}</NativeBaseWrapper>)
.add('Home', () => <Home navigation={basenavigation} bidderStore={baseBidderStore} />)