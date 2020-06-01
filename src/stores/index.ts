import React from 'react';
import BidderStore from './bidder';

/* eslint-disable-next-line @typescript-eslint/ban-types */
export type Store = {
  bidderStore: BidderStore;
};

export const storesContext = React.createContext<Store>({
  bidderStore: new BidderStore(),
});
