import * as user from './user';

// The promise that is being tested should be returned.
it('returns correct name for given user (Async)', () => {
  expect(false).toBe(true);
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