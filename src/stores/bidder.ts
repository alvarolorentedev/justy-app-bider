import { observable, action } from 'mobx';
import { createBidder } from '../services/bidder';

export default class BidderStore {
  @observable
  public error: string;

  @action
  create = async (email: string, password: string): Promise<void> => {
    try {
      const result = await createBidder(email, password);
      if (result.success) {
        this.error = undefined;
      } else throw new Error('Unable to create accout');
    } catch (error) {
      this.error = error.message;
    }
  };
}
