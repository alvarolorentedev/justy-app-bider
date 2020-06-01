import fs from 'fs';
import * as faker from 'faker';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as BidderService from '../../src/services/bidder';
import ENV from '../../src/utils/constants';

describe('Bidder Service', () => {
  describe('action to create new bidder', () => {
    const createBidderMutation = fs.readFileSync(
      `${__dirname}/../../src/services/mutations/createBidder.graphql`,
      'ascii'
    );

    it('should call the backend to create a new bidder', async () => {
      const mock = new MockAdapter(axios);
      const email = faker.random.uuid();
      const password = faker.random.uuid();
      mock
        .onPost(`${ENV.SERVER_URL}/graphql`, {
          query: createBidderMutation,
          variables: {
            email,
            password,
          },
        })
        .replyOnce(200, { data: { createBidder: { success: true } } });

      const result = await BidderService.createBidder(email, password);

      expect(result).toEqual({ success: true });
    });
  });
});
