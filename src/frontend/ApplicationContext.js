import React from 'react';

export const defaultApplicationContext = {
  title: 'Kyle Parrish Organizing Hub',
  cover: '/assets/em-header-original.jpg',
  status: 200,
  data: {},
};

export const ApplicationContext = React.createContext(defaultApplicationContext);

export function useApplicationContext() {
  const value = React.useContext(ApplicationContext);
  return value;
}
