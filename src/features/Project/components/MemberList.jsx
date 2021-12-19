import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import {
  Autocomplete,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import { Box } from '@mui/system';
import userApi from 'api/userApi';
import BackdropProgress from 'components/BackdropProgress';
import ConfirmDialog from 'components/ConfirmDialog';
import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { getProjects } from '../projectSlice';

export default function MemberList(props) {
  const { selectedProject } = props;
  const searchRef = useRef();
  const [members, setMembers] = useState(selectedProject.members);
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [idToDelete, setIdToDelete] = useState();
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  const handleClickDelete = (userId) => {
    if (!userId) return;
    setConfirmOpen(true);
    setIdToDelete(userId);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const data = await userApi.deleteUserFromProject({ projectId: selectedProject.id, userId: idToDelete });
      setMembers((prevMembers) => [...prevMembers.filter((member) => member.userId !== idToDelete)]);
      dispatch(getProjects());
      toast.success('Successfully!');
    } catch (error) {
      toast.error('Fail to delete member from project');
      console.log('Fail to delete member from project', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e, value) => {
    if (!value) return;
    try {
      setLoading(true);
      const data = await userApi.assignUserToProject({ projectId: selectedProject.id, userId: value.userId });
      setMembers((prevMembers) => {
        const newMember = users.find((user) => user.userId === value.userId);
        if (newMember) {
          return [...prevMembers, newMember];
        }
      });
      dispatch(getProjects());
      toast.success('Successfully!');
    } catch (error) {
      toast.error('Fail to assign member to project');
      console.log('Fail to assign member to project', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (searchRef.current) {
      //debounce search
      clearTimeout(searchRef.current);
    }

    searchRef.current = setTimeout(() => {
      (async () => {
        try {
          const data = await userApi.getUser(value);
          setUsers(data?.content);
        } catch (error) {
          console.log('Fail to get users');
        }
      })();
    }, 300);
  };

  return (
    <Box sx={{ width: '100%', mt: 3 }}>
      <Autocomplete
        fullWidth
        disablePortal
        onChange={handleAddUser}
        id="combo-box-users"
        options={users.map((user) => ({ label: user.name, userId: user.userId }))}
        renderInput={(params) => <TextField {...params} onChange={handleChange} label="Add member" />}
      />
      <Paper sx={{ width: '100%', mt: 2 }}>
        <TableContainer>
          <Table aria-labelledby="tableTitle" size="medium">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Avatar</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members?.map((member, idx) => (
                <TableRow key={member.userId}>
                  <TableCell>{member.userId}</TableCell>
                  <TableCell>
                    <img style={{ borderRadius: '50%', width: '40px' }} src={member.avatar} alt="" />
                  </TableCell>
                  <TableCell>{member.name}</TableCell>

                  <TableCell>
                    <IconButton onClick={() => handleClickDelete(member.userId)} variant="contained" color="error">
                      <DeleteOutlineOutlinedIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <BackdropProgress isOpen={loading} />
      <ConfirmDialog title="Delete Member?" open={confirmOpen} setOpen={setConfirmOpen} onConfirm={handleDelete}>
        Are you sure you want to remove this user?
      </ConfirmDialog>
    </Box>
  );
}
