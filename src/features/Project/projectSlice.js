import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import projectApi from 'api/projectApi';
import { toast } from 'react-toastify';
import userApi from '../../api/userApi';

export const getUsers = createAsyncThunk('project/getUsers', async (payload, thunkApi) => {
  const data = await userApi.getUser(payload);
  return data.content;
});

export const getProjects = createAsyncThunk('project/getProjects', async () => {
  const data = await projectApi.getAllProject();
  return data.content;
});

export const deleteProject = createAsyncThunk('project/deleteProject', async (id) => {
  const data = await projectApi.deleteProject(id);
  return data.content;
});

const userSlice = createSlice({
  name: 'project',
  initialState: {
    projects: [],
    loading: false,
    deleteLoading: false,
  },
  reducers: {},
  extraReducers: {
    [getProjects.pending]: (state) => {
      state.loading = true;
    },
    [getProjects.fulfilled]: (state, action) => {
      state.projects = action.payload;
      state.loading = false;
    },
    [getProjects.rejected]: (state, action) => {
      state.loading = false;
      console.log('Fail to get project', action.error);
    },

    [deleteProject.pending]: (state) => {
      state.deleteLoading = true;
    },
    [deleteProject.fulfilled]: (state, action) => {
      const id = action.payload?.[0];
      if (id) {
        state.projects = state.projects.filter((project) => project.id !== id);
      }
      state.deleteLoading = false;
      toast.success('Delete project successfully!');
    },
    [getProjects.rejected]: (state, action) => {
      state.deleteLoading = false;
      console.log('Fail to get project', action.error);
      toast.error('Fail to delete project');
    },
  },
});

const { actions, reducer } = userSlice;
// export const {  } = actions;

export default reducer;
