import tasksApi from '../api/tasksApi';
import {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
} from '../store/tasksActions';
import {Dispatch} from 'redux';
export const getTasks = () => {
  return async (dispatch: Dispatch) => {
    dispatch(fetchTasksRequest());
    try {
      const response = await tasksApi.getTasks();
      dispatch(fetchTasksSuccess(response?.data?.response.data));
      return response;
    } catch (error) {
      dispatch(fetchTasksFailure(error));
      throw error;
    }
  };
};
