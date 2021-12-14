import axiosClient from "./axiosClient";

const userApi = {
  login(data) {
    const url = "Users/signin";
    return axiosClient.post(url, data);
  },
  getUser(keyWord) {
    return this.get(`Users/getUser?keyword=${keyWord}`);
  },
};

export default userApi;
