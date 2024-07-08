const initialState = {
  loading: false,
  data: [],
  error: null,
};

const tasksReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'FETCH_TASKS_REQUEST':
      return {
        ...state,
        loading: true,
      };
    case 'FETCH_TASKS_SUCCESS':
      console.log('FETCH_TASKS_SUCCESS', action);
      return {
        ...state,
        loading: false,
        data: action.payload,
      };
    case 'FETCH_TASKS_FAILURE':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default tasksReducer;
