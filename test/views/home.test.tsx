import * as React from 'react';
import { shallow } from 'enzyme';
import * as faker from 'faker';
import { Home } from '../../src/views/home';

const waitMiliseconds = (time: number) =>
  new Promise((resolve) => setTimeout(() => resolve(), time));

describe('<Home />', () => {
  const navigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    navigation.navigate.mockClear();
  });

  test('should ', () => {
    const wrapper = shallow(<Home navigation={navigation} />);
  });
});
