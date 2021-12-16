import axiosClient from './axiosClient';

const userApi = {
  login(data) {
    const url = 'Users/signin';
    return axiosClient.post(url, data);
  },

  getUser(keyWord) {
    return axiosClient.get(`Users/getUser?keyword=${keyWord}`);
  },

  assignUserToProject(userProject) {
    return axiosClient.post('Project/assignUserProject', userProject);
  },

  deleteUserFromProject(userProject) {
    return axiosClient.post('Project/removeUserFromProject', userProject);
  },
};

export default userApi;
