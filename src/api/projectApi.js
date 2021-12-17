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

  getAllProject() {
    const url = 'Project/getAllProject';
    return axiosClient.get(url);
  },

  deleteProject(id) {
    const url = `Project/deleteProject?projectId=${id}`;
    return axiosClient.delete(url);
  },

  getProjectDetail(projectId) {
    return axiosClient.get(`Project/getProjectDetail?id=${projectId}`);
  },

  updateProject(projectUpdate) {
    return axiosClient.put(`Project/updateProject?projectId=${projectUpdate.id}`, projectUpdate);
  },
};

export default projectApi;
