import React from 'react';

/* eslint-disable-next-line @typescript-eslint/ban-types */
export type Store = {};

export const storesContext = React.createContext<Store>({});
