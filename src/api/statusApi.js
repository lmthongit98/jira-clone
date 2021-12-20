import axiosClient from './axiosClient';

const statusApi = {
  getAllStatus() {
    return axiosClient.get('Status/getAll');
  },
};

export default statusApi;
