export const fetchTasksRequest = () => ({
  type: 'FETCH_TASKS_REQUEST',
});

export const fetchTasksSuccess = (tasks: any) => ({
  type: 'FETCH_TASKS_SUCCESS',
  payload: tasks,
});

export const fetchTasksFailure = (error: any) => ({
  type: 'FETCH_TASKS_FAILURE',
  payload: error,
});
