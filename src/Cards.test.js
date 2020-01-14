import React from 'react';
import { render } from '@testing-library/react';
import Cards from './Cards';
import renderer from 'react-test-renderer';

it('matches the snapshot', () => {
  const tree = renderer.create(<Cards />).toJSON();
  expect(tree).toMatchSnapshot();
});