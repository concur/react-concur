import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import LinkList from './LinkList';

test('renders Links when passed an array of hrefs', () => {
  // Render a checkbox with label in the document
  const linkList = shallow(
    <LinkList hrefs={['yahoo', 'google']} />
  );
  expect(toJson(linkList)).toMatchSnapshot();
  
});