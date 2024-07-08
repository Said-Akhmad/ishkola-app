import moment from 'moment';

const initialState = {
  isSignedIn: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case 'LOGIN':
      console.log('LOGIN', payload);
      return {
        ...state,
        isSignedIn: payload,
      };

    default:
      return state;
  }
};
