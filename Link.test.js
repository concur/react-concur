// Link.react-test.js
import React from 'react';
import Link from './Link';
import renderer from 'react-test-renderer';

test('Link changes the class when hovered', () => {
  const component = renderer.create(
    <Link page="http://www.facebook.com">Facebook</Link>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseEnter();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  tree.props.onMouseLeave();
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('href is set to hash when no page is passed', () => {
  const component = renderer.create(
    <Link>Facebook</Link>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});