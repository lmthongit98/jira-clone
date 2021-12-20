import axiosClient from './axiosClient';

const taskTypeApi = {
  getAllTaskTypes() {
    return axiosClient.get('TaskType/getAll');
  },
};

export default taskTypeApi;
