import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Breadcrumbs, Button, Paper, Typography } from '@mui/material';
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import useProjectDetail from '../hooks/useProjectDetail';

export default function ProjectDetail() {
  const { projectId } = useParams();

  const [project, loading] = useProjectDetail(projectId);

  return (
    <Box sx={{ paddingLeft: '2%' }}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" to="/project/list">
          Project
        </Link>
        <Link underline="hover" color="inherit" to="/project/list">
          Project Management
        </Link>
        <Link underline="hover" color="text.primary" to="">
          Board
        </Link>
      </Breadcrumbs>
      <Box component="section" sx={{ mt: 2 }}>
        <Typography component="h1" variant="h4">
          {project?.projectName}
        </Typography>
        <Box sx={{ backgroundColor: '#fbfbfb', p: 1 }} component="div">
          <Typography>Description</Typography>
          <Box
            sx={{ '&:hover': { backgroundColor: '#f4f5f7' }, p: 1 }}
            dangerouslySetInnerHTML={{ __html: project?.description }}
          />
        </Box>
      </Box>
      <Typography sx={{ marginBottom: '20px' }} variant="h5">
        Board
      </Typography>
      <Box classes="info" sx={{ display: 'flex' }}>
        <Box classes="search-block" sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <input
            type="text"
            style={{
              height: '32px',
              width: '200px',
              backgroundColor: 'rgb(250, 251, 252)',
              border: '2px solid rgb(223, 225, 230)',
              borderRadius: '3px',
              paddingLeft: '32px',
            }}
          />
          <SearchIcon sx={{ position: 'absolute', left: '5%', top: '25%', color: ' #67748b' }} />
        </Box>
        <Box
          classes="avatar-group"
          sx={{
            display: 'flex',
            marginLeft: '20px',
            '& > img': {
              width: '40px',
              border: '1px solid transparent',
              height: '40px',
              borderRadius: '50$',
            },
            '& > img > img': {
              width: '40px',
              border: '1px solid transparent',
              height: '40px',
              borderRadius: '50$',
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {project?.members.map((member) => (
              <Box
                key={member.userId}
                component="img"
                src={member.avatar}
                height="35px"
                alt={member.name}
                sx={{ borderRadius: '50%', margin: '0 3px' }}
              />
            ))}
          </Box>
        </Box>
        <Button sx={{ marginLeft: '20px', textAlign: 'center', lineHeight: '35px' }}>Only My Issues</Button>
        <Button sx={{ marginLeft: '20px', textAlign: 'center', lineHeight: '35px' }}>Recently Updated</Button>
      </Box>
      <Box classes="content" sx={{ display: 'flex', marginTop: '20px' }}>
        <Box classes="card" sx={{ width: '17rem', height: '25rem', marginRight: '10px', backgroundColor: '#f4f5f7' }}>
          <Typography classes="card-header" sx={{ color: '#5e6c84', p: 1 }}>
            BACKLOG
          </Typography>
          <Box classes="list-group" sx={{ border: 'none', display: 'flex', flexDirection: 'column' }}>
            <Paper
              classes="list-group-item"
              data-toggle="modal"
              data-target="#infoModal"
              sx={{ cursor: 'pointer', margin: '5px', p: 1 }}
            >
              <Typography>Each issue has a single reporter but can have multiple assignees</Typography>
              <Box classes="block" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box classes="block-left" sx={{ lineHeight: '40px' }}>
                  <BookmarkIcon color="success" />
                  <ArrowUpwardIcon color="error" />
                </Box>
                <Box classes="block-right">
                  <Box classes="avatar-group" sx={{ display: 'flex' }}>
                    <Box classes="avatar">
                      <img src="./assets/img/download (1).jfif" alt />
                    </Box>
                    <Box classes="avatar">
                      <img src="./assets/img/download (2).jfif" alt />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>

            <Paper classes="list-group-item" sx={{ cursor: 'pointer', margin: '5px', p: 1 }}>
              <Typography>Each issue has a single reporter but can have multiple assignees</Typography>
              <Box classes="block" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box classes="block-left">
                  <CheckBoxIcon color="primary" />
                  <ArrowUpwardIcon color="error" />
                </Box>
                <Box classes="block-right">
                  <Box classes="avatar-group" sx={{ display: 'flex' }}>
                    <Box classes="avatar">
                      <img src="./assets/img/download (1).jfif" alt />
                    </Box>
                    <Box classes="avatar">
                      <img src="./assets/img/download (2).jfif" alt />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
        <Box classes="card" sx={{ width: '17rem', height: '25rem', marginRight: '10px', backgroundColor: '#f4f5f7' }}>
          <Typography classes="card-header" sx={{ color: '#5e6c84', p: 1 }}>
            SELECTED FOR DEVELOPMENT
          </Typography>
          <Box classes="list-group" sx={{ border: 'none' }}>
            <Paper
              classes="list-group-item"
              data-toggle="modal"
              data-target="#infoModal"
              sx={{ cursor: 'pointer', margin: '5px', p: 1 }}
            >
              <Typography>Each issue has a single reporter but can have multiple assignees</Typography>
              <Box classes="block" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box classes="block-left" sx={{ lineHeight: '40px' }}>
                  <BookmarkIcon color="success" />
                  <ArrowUpwardIcon color="error" />
                </Box>
                <Box classes="block-right">
                  <Box classes="avatar-group" sx={{ display: 'flex' }}>
                    <Box classes="avatar">
                      <img src="./assets/img/download (1).jfif" alt />
                    </Box>
                    <Box classes="avatar">
                      <img src="./assets/img/download (2).jfif" alt />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
        <Box classes="card" sx={{ width: '17rem', height: '25rem', marginRight: '10px', backgroundColor: '#f4f5f7' }}>
          <Typography classes="card-header" sx={{ color: '#5e6c84', p: 1 }}>
            IN PROGRESS
          </Typography>
          <Box classes="list-group" sx={{ border: 'none' }}>
            <Paper
              classes="list-group-item"
              data-toggle="modal"
              data-target="#infoModal"
              sx={{ cursor: 'pointer', margin: '5px', p: 1 }}
            >
              <Typography>Each issue has a single reporter but can have multiple assignees</Typography>
              <Box classes="block" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box classes="block-left" sx={{ lineHeight: '40px' }}>
                  <BookmarkIcon color="success" />
                  <ArrowUpwardIcon color="error" />
                </Box>
                <Box classes="block-right">
                  <Box classes="avatar-group" sx={{ display: 'flex' }}>
                    <Box classes="avatar">
                      <img src="./assets/img/download (1).jfif" alt />
                    </Box>
                    <Box classes="avatar">
                      <img src="./assets/img/download (2).jfif" alt />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
        <Box classes="card" sx={{ width: '17rem', height: '25rem', marginRight: '10px', backgroundColor: '#f4f5f7' }}>
          <Typography classes="card-header" sx={{ color: '#5e6c84', p: 1 }}>
            DONE
          </Typography>
          <Box classes="list-group" sx={{ border: 'none' }}>
            <Paper
              classes="list-group-item"
              data-toggle="modal"
              data-target="#infoModal"
              sx={{ cursor: 'pointer', margin: '5px', p: 1 }}
            >
              <Typography>Each issue has a single reporter but can have multiple assignees</Typography>
              <Box classes="block" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box classes="block-left" sx={{ lineHeight: '40px' }}>
                  <BookmarkIcon color="success" />
                  <ArrowUpwardIcon color="error" />
                </Box>
                <Box classes="block-right">
                  <Box classes="avatar-group" sx={{ display: 'flex' }}>
                    <Box classes="avatar">
                      <img src="./assets/img/download (1).jfif" alt />
                    </Box>
                    <Box classes="avatar">
                      <img src="./assets/img/download (2).jfif" alt />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
