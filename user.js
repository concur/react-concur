export function updateName(name) {
  return {
    type: 'UPDATE_NAME',
    name: name
  }
}

const initialState = { name: '' };
export function reducer(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_NAME':
      return Object.assign({}, state, {
        name: action.name,
      });
  }
}