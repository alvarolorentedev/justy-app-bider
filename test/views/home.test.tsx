import * as React from 'react';
import { shallow } from 'enzyme';
import * as faker from 'faker';
import { Home } from '../../src/views/home';

const waitMiliseconds = (time: number) =>
  new Promise((resolve) => setTimeout(() => resolve(), time));

const mockBidderStore = {
  create: jest.fn(),
  error: undefined,
};

describe('<Home />', () => {
  const navigation = {
    navigate: jest.fn(),
  };
  const expectedPassword: string = faker.internet.password();
  const expectedEmail: string = faker.internet.email();

  beforeEach(() => {
    mockBidderStore.error = undefined;
    navigation.navigate.mockClear();
    mockBidderStore.create.mockClear();
  });

  describe('create user flow', () => {
    const wrapper = shallow(
      <Home navigation={navigation} bidderStore={mockBidderStore} />
    );

    beforeAll(() => {
      const bidderEmailInput = wrapper.find(
        '[data-testid="bidder-email-input"]'
      );
      const bidderPasswordInput = wrapper.find(
        '[data-testid="bidder-password-input"]'
      );
      bidderEmailInput.prop('onChangeText')(expectedEmail);
      bidderPasswordInput.prop('onChangeText')(expectedPassword);
      wrapper.update();
    });

    test('should have button with create user text', () => {
      const createButton = wrapper.find('[data-testid="bidder-create-button"]');
      expect(createButton.exists()).toBeTruthy();
      expect(createButton.contains('Create User')).toBeTruthy();
    });

    test('should create a user when clicked and navigate', async () => {
      const createButton = wrapper.find('[data-testid="bidder-create-button"]');
      mockBidderStore.error = undefined;
      createButton.simulate('press');
      await waitMiliseconds(100);
      expect(mockBidderStore.create).toHaveBeenCalledWith(
        expectedEmail,
        expectedPassword
      );
      expect(navigation.navigate).toHaveBeenCalledWith('Search');
    });

    test('should not navigate if there is an error', async () => {
      const createButton = wrapper.find('[data-testid="bidder-create-button"]');
      mockBidderStore.error = faker.random.uuid();
      createButton.simulate('press');
      await waitMiliseconds(100);
      expect(navigation.navigate).not.toHaveBeenCalledWith('Search');
    });
  });

  describe('button submit enable/disable state', () => {
    const wrapper = shallow(
      <Home navigation={navigation} bidderStore={mockBidderStore} />
    );

    test('should be disable by default', () => {
      const createButton = wrapper.find('[data-testid="bidder-create-button"]');
      expect(createButton.prop('disabled')).toBeTruthy();
    });

    test('should be enable when mandatory fields are set', async () => {
      const bidderEmailInput = wrapper.find(
        '[data-testid="bidder-email-input"]'
      );
      bidderEmailInput.prop('onChangeText')(expectedEmail);
      const bidderPasswordInput = wrapper.find(
        '[data-testid="bidder-password-input"]'
      );
      bidderPasswordInput.prop('onChangeText')(expectedPassword);
      wrapper.update();
      const createButton = wrapper.find('[data-testid="bidder-create-button"]');
      expect(createButton.prop('disabled')).toBeFalsy();
    });

    test('should be disable when email mandatory fields is unset', async () => {
      const bidderEmailInput = wrapper.find(
        '[data-testid="bidder-email-input"]'
      );
      bidderEmailInput.prop('onChangeText')(undefined);
      const bidderPasswordInput = wrapper.find(
        '[data-testid="bidder-password-input"]'
      );
      bidderPasswordInput.prop('onChangeText')(expectedPassword);
      wrapper.update();
      const createButton = wrapper.find('[data-testid="bidder-create-button"]');
      expect(createButton.prop('disabled')).toBeTruthy();
    });

    test('should be disable when password mandatory fields is unset', async () => {
      const bidderEmailInput = wrapper.find(
        '[data-testid="bidder-email-input"]'
      );
      bidderEmailInput.prop('onChangeText')(expectedEmail);
      const bidderPasswordInput = wrapper.find(
        '[data-testid="bidder-password-input"]'
      );
      bidderPasswordInput.prop('onChangeText')(undefined);
      wrapper.update();
      const createButton = wrapper.find('[data-testid="bidder-create-button"]');
      expect(createButton.prop('disabled')).toBeTruthy();
    });
  });
});
