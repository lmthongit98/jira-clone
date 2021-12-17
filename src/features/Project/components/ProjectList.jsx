import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Button, Chip, IconButton, TableCell } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import CommonDialog from 'components/CommonDialog';
import ConfirmDialog from 'components/ConfirmDialog';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProject } from '../projectSlice';
import MemberList from './MemberList';
import ProjectForm from './ProjectForm';

export default function ProjectList(props) {
  const { projectList, onDeleteProject } = props;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState();
  const [openMembers, setOpenMembers] = useState(false);
  const [selectedProject, setSelectedProject] = useState(undefined);
  const [openEditProject, setOpenEditProject] = useState(false);
  const dispatch = useDispatch();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = () => {
    if (onDeleteProject && idToDelete) {
      onDeleteProject(idToDelete);
    }
  };

  const handleClickDelete = (id) => {
    setIdToDelete(id);
    setConfirmOpen(true);
  };

  const handleEdit = (values) => {
    const projectUpdate = { ...values, id: selectedProject.id, creator: selectedProject.creator.id };
    dispatch(updateProject(projectUpdate));
  };

  const handleClickEdit = (project) => {
    setOpenEditProject(true);
    setSelectedProject(project);
  };

  const handleClickMembers = (project) => {
    setOpenMembers(true);
    setSelectedProject(project);
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
                  <TableCell>{project.projectName}</TableCell>
                  <TableCell>{project.categoryName}</TableCell>
                  <TableCell>
                    <Chip label={project.creator?.name} color="success" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        handleClickMembers(project);
                      }}
                      variant="outlined"
                    >
                      Members
                    </Button>
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
        title={`Edit project: ${selectedProject?.projectName}`}
        maxWidth="lg"
        open={openEditProject}
        setOpen={setOpenEditProject}
      >
        <ProjectForm onSubmitEdit={handleEdit} editedProject={selectedProject} />
      </CommonDialog>
    </Box>
  );
}
