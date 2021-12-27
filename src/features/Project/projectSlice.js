import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import priorityApi from 'api/priorityApi';
import projectApi from 'api/projectApi';
import statusApi from 'api/statusApi';
import taskTypeApi from 'api/taskTypeApi';
import userApi from 'api/userApi';
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

export const getProjectDetail = createAsyncThunk('project/getProjectDetail', async (projectId) => {
  const data = await projectApi.getProjectDetail(projectId);
  return data.content;
});

export const getStatuses = createAsyncThunk('project/getStatuses', async () => {
  const data = await statusApi.getAllStatus();
  return data.content;
});

export const getPriorities = createAsyncThunk('project/getPriorities', async () => {
  const data = await priorityApi.getAllPriority();
  return data.content;
});

export const getTaskTypes = createAsyncThunk('project/getTaskTypes', async () => {
  const data = await taskTypeApi.getAllTaskTypes();
  return data.content;
});

export const getAssignees = createAsyncThunk('project/getAssignees', async (id) => {
  const data = await userApi.getUserByProjectId(id);
  return data.content;
});

const userSlice = createSlice({
  name: 'project',
  initialState: {
    projects: [],
    projectDetail: null,
    deleteLoading: false,
    updateLoading: false,

    statuses: [],
    priorities: [],
    taskTypes: [],
    assignees: [],
  },
  reducers: {
    clearProjectDetail(state) {
      state.projectDetail = null;
    },
  },
  extraReducers: {
    // GET ALL PROJECTS

    [getProjects.fulfilled]: (state, action) => {
      state.projects = action.payload;
    },
    [getProjects.rejected]: (state, action) => {
      console.log('Fail to get project', action.error);
    },

    // DELETE PROJECT
    [deleteProject.pending]: (state) => {
      state.deleteLoading = true;
    },
    [deleteProject.fulfilled]: (state, action) => {
      const id = action.payload?.[0];
      state.projects = state.projects.filter((project) => project.id !== id);
      state.deleteLoading = false;
      toast.success('Delete project successfully!');
    },
    [deleteProject.rejected]: (state, action) => {
      state.deleteLoading = false;
      toast.error('Fail to delete project', action.error);
    },

    // UPDATE PROJECT
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

    //GET PROJECT DETAIL
    [getProjectDetail.fulfilled]: (state, action) => {
      state.projectDetail = action.payload;
    },

    //GET STATUSES
    [getStatuses.fulfilled]: (state, action) => {
      state.statuses = action.payload;
    },

    //GET PRIORITIES
    [getPriorities.fulfilled]: (state, action) => {
      state.priorities = action.payload;
    },

    //GET TASK TYPES
    [getTaskTypes.fulfilled]: (state, action) => {
      state.taskTypes = action.payload;
    },

    //ASSIGNEES
    [getAssignees.fulfilled]: (state, action) => {
      state.assignees = action.payload;
    },

    [getAssignees.rejected]: (state, action) => {
      state.assignees = [];
    },
  },
});

const { actions, reducer } = userSlice;
export const { clearProjectDetail } = actions;

export default reducer;
