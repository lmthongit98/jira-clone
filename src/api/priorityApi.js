import axiosClient from './axiosClient';

const priorityApi = {
  getAllPriority() {
    return axiosClient.get('Priority/getAll');
  },
};

export default priorityApi;
