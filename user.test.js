jest.mock('./request');

import * as user from './user';

// The promise that is being tested should be returned.
it('works with promises', () => {
  // when Jest 20+ is out, use `.resolves`
  // return expect(user.getUserName(5)).resolves.toEqual('Paul');
  return user.getUserName(5).then(value => {
    expect(value).toEqual('Paul');
  })
});

test('reducer updates name when passed UPDATE_NAME action', () => {
  const state = {
    name: '🐰'
  }
  const action = {
    type: 'UPDATE_NAME',
    name: '🐬'
  }

  expect(user.reducer(state, action)).toEqual({
    name: '🐬'
  })
});

test('updateName action creator creates a valid action', () => {
  expect(user.updateName('simon')).toEqual({
    type: 'UPDATE_NAME',
    name: 'simon'
  })
})

// async redux actions creators are much more complicated. 😥
// see http://redux.js.org/docs/recipes/WritingTests.html