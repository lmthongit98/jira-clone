import axiosClient from './axiosClient';

const taskApi = {
  createTask(task) {
    return axiosClient.post(`Project/createTask`, task);
  },
};

export default taskApi;
