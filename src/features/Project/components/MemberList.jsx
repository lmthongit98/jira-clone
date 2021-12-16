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
import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../projectSlice';

export default function MemberList(props) {
  const { members, onAddMember, onDelete } = props;
  const searchRef = useRef();
  const dispatch = useDispatch();

  const { users } = useSelector((state) => state.projectReducer);

  useEffect(() => {
    dispatch(getUsers(''));
  }, [dispatch]);

  const handleClickDelete = () => {};

  const handleAddUser = (e, value) => {
    if (onAddMember && value) {
      onAddMember(value.userId);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    if (searchRef.current) {
      //debounce search
      clearTimeout(searchRef.current);
    }

    searchRef.current = setTimeout(() => {
      dispatch(getUsers(value));
    }, 300);
  };

  return (
    <Box sx={{ width: '100%', mt: 3 }}>
      <Autocomplete
        fullWidth
        disablePortal
        onChange={handleAddUser}
        id="combo-box-users"
        options={users.map((user) => ({ label: `${user.userId} -  ${user.name}`, userId: user.userId }))}
        sx={{ width: 300 }}
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
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member, idx) => (
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
      {/* <ConfirmDialog title="Delete Project?" open={confirmOpen} setOpen={setConfirmOpen} onConfirm={handleDelete}>
        Are you sure you want to delete this project?
      </ConfirmDialog> */}
    </Box>
  );
}
