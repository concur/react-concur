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