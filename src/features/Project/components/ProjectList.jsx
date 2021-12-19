import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { Chip, IconButton, TableCell } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import BackdropProgress from 'components/BackdropProgress';
import CommonDialog from 'components/CommonDialog';
import ConfirmDialog from 'components/ConfirmDialog';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteProject, updateProject } from '../projectSlice';
import MemberList from './MemberList';
import ProjectForm from './ProjectForm';

export default function ProjectList({ projectList = [] }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState();
  const [openMembers, setOpenMembers] = useState(false);
  const [selectedProject, setSelectedProject] = useState(undefined);
  const [openEditProject, setOpenEditProject] = useState(false);
  const { deleteLoading, updateLoading } = useSelector((state) => state.projectReducer);
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = () => {
    if (idToDelete) {
      dispatch(deleteProject(idToDelete));
      setIdToDelete(null);
    }
  };

  const handleClickDelete = (id) => {
    setIdToDelete(id);
    setConfirmOpen(true);
  };

  const handleClickEdit = (project) => {
    setOpenEditProject(true);
    setSelectedProject(project);
  };

  const handleClickMembers = (project) => {
    setOpenMembers(true);
    setSelectedProject(project);
  };

  const handleSubmitFormEdit = (values) => {
    if (!selectedProject) return;
    const projectUpdate = { ...values, id: selectedProject.id, creator: selectedProject.creator.id };
    dispatch(updateProject(projectUpdate));
  };

  return (
    <Box>
      <Paper>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Project name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Creator</TableCell>
                <TableCell>Members</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projectList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((project, idx) => (
                <TableRow key={project.id}>
                  <TableCell>{project.id}</TableCell>
                  <TableCell>
                    <Box sx={{ color: '#1890ff' }} component={Link} to={`/project/${project.id}`}>
                      {project.projectName}
                    </Box>
                  </TableCell>
                  <TableCell>{project.categoryName}</TableCell>
                  <TableCell>
                    <Chip label={project.creator.name} variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {project.members.slice(0, 3).map((member) => (
                        <Box
                          key={member.userId}
                          component="img"
                          src={member.avatar}
                          alt={member.name}
                          height="35px"
                          sx={{ borderRadius: '50%', margin: '0 3px' }}
                        />
                      ))}
                      {project.members.length > 3 ? (
                        <Box
                          component="div"
                          sx={{
                            width: '35px',
                            height: '35px',
                            borderRadius: '50%',
                            backgroundColor: '#dfdfdf',
                            textAlign: 'center',
                            lineHeight: '35px',
                          }}
                        >
                          ...
                        </Box>
                      ) : (
                        ''
                      )}
                      <IconButton
                        onClick={() => {
                          handleClickMembers(project);
                        }}
                        variant="outlined"
                      >
                        <ManageAccountsIcon sx={{ fontSize: '35px' }} />
                      </IconButton>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleClickDelete(project.id)} variant="contained" color="error">
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                    <IconButton onClick={() => handleClickEdit(project)} variant="contained" color="primary">
                      <EditOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={projectList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <ConfirmDialog title="Delete Project?" open={confirmOpen} setOpen={setConfirmOpen} onConfirm={handleDelete}>
        Are you sure you want to delete this project?
      </ConfirmDialog>
      <CommonDialog title="Members" open={openMembers} setOpen={setOpenMembers}>
        <MemberList selectedProject={selectedProject} />
      </CommonDialog>
      <CommonDialog
        title={`Update project: ${selectedProject?.projectName}`}
        maxWidth="md"
        open={openEditProject}
        setOpen={setOpenEditProject}
      >
        <ProjectForm
          setOpen={setOpenEditProject}
          onSubmit={handleSubmitFormEdit}
          initialValue={selectedProject}
          loading={updateLoading}
        />
      </CommonDialog>
      <BackdropProgress isOpen={deleteLoading} />
    </Box>
  );
}
