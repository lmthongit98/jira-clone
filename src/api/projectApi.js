import axiosClient from './axiosClient';

const projectApi = {
  getProjectCategory() {
    const url = 'ProjectCategory';
    return axiosClient.get(url);
  },
  createProject(data) {
    const url = 'Project/createProjectAuthorize';
    return axiosClient.post(url, data);
  },
};

export default projectApi;
