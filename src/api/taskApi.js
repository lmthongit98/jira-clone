import axiosClient from './axiosClient';

const taskApi = {
  createTask(task) {
    return axiosClient.post(`Project/createTask`, task);
  },

  removeTask(taskId) {
    return axiosClient.delete(`Project/removeTask?taskId=${taskId}`);
  },

  updateTask(updatedTask) {
    return axiosClient.post(`Project/updateTask`, updatedTask);
  },
};

export default taskApi;
