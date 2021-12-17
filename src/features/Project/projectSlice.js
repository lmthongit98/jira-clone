import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import projectApi from 'api/projectApi';
import { toast } from 'react-toastify';

export const getProjects = createAsyncThunk('project/getProjects', async () => {
  const data = await projectApi.getAllProject();
  return data.content;
});

export const deleteProject = createAsyncThunk('project/deleteProject', async (id) => {
  const data = await projectApi.deleteProject(id);
  return data.content;
});

export const updateProject = createAsyncThunk('project/updateProject', async (projectUpdate, ApiThunk) => {
  const data = await projectApi.updateProject(projectUpdate);
  ApiThunk.dispatch(getProjects());
  return data.content;
});

const userSlice = createSlice({
  name: 'project',
  initialState: {
    projects: [],
    loading: false,
    deleteLoading: false,
    updateLoading: false,
  },
  reducers: {},
  extraReducers: {
    // GET ALL PROJECTS
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

    // DELETE
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
    [deleteProject.rejected]: (state, action) => {
      state.deleteLoading = false;
      toast.error('Fail to delete project', action.error);
    },

    // UPDATE
    [updateProject.pending]: (state) => {
      state.updateLoading = true;
    },
    [updateProject.fulfilled]: (state, action) => {
      state.updateLoading = false;
      toast.success('Update project successfully!');
    },
    [updateProject.rejected]: (state, action) => {
      console.log('Fail to get project', action.error);
      toast.error('Fail to update project');
      state.updateLoading = false;
    },
  },
});

const { actions, reducer } = userSlice;
// export const {  } = actions;

export default reducer;
