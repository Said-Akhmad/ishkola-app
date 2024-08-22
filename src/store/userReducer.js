import moment from 'moment';

const initialState = {
  isSignedIn: false,
};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case 'LOGIN':
      return {
        ...state,
        isSignedIn: payload,
      };

    default:
      return state;
  }
};
