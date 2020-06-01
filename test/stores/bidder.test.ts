import * as faker from 'faker';
import { createBidder } from '../../src/services/bidder';
import BidderStore from '../../src/stores/bidder';
import { SimpleResponse } from '../../src/types/SimpleResponse';

jest.mock('../../src/services/bidder', () => ({
  __esModule: true,
  createBidder: jest.fn(),
}));

describe('Bidder Store', () => {
  const bidder = new BidderStore();

  beforeEach(() => {
    bidder.error = undefined;
  });

  describe('has action for create account', () => {
    const email: string = faker.random.uuid();
    const password: string = faker.random.uuid();

    it('should return if success creating accout', async () => {
      (createBidder as jest.Mock<Promise<SimpleResponse>>).mockReturnValue(
        Promise.resolve({ success: true })
      );

      await bidder.create(email, password);

      expect(createBidder).toHaveBeenCalledWith(email, password);
    });

    it('should have error if not success on creation', async () => {
      (createBidder as jest.Mock<Promise<SimpleResponse>>).mockReturnValue(
        Promise.resolve({ success: false })
      );

      await bidder.create(email, password);

      expect(createBidder).toHaveBeenCalledWith(email, password);
      expect(bidder.error).toEqual('Unable to create accout');
    });

    it('should have error if server error', async () => {
      (createBidder as jest.Mock<Promise<SimpleResponse>>).mockReturnValue(
        Promise.reject(new Error('server failed'))
      );

      await bidder.create(email, password);

      expect(createBidder).toHaveBeenCalledWith(email, password);
      expect(bidder.error).toEqual('server failed');
    });
  });
});
