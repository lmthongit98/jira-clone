import { Box } from '@mui/material';
import React from 'react';
import TaskItem from './TaskItem';
import { Container, Draggable } from 'react-smooth-dnd';

export default function TaskList({ columnId, taskList = [], onCardDrop }) {
  return (
    <Box sx={{ border: 'none', display: 'flex', flexDirection: 'column' }}>
      <Container
        orientation="vertical" // default
        groupName="thong-columns"
        onDrop={(dropResult) => onCardDrop(columnId, dropResult)}
        getChildPayload={(index) => taskList[index]}
        dragClass="card-ghost"
        dropClass="card-ghost-drop"
        dropPlaceholder={{
          animationDuration: 150,
          showOnTop: true,
          className: 'task-drop-preview',
        }}
        dropPlaceholderAnimationDuration={200}
      >
        {taskList.map((task) => (
          <Draggable key={task.taskId}>
            <TaskItem task={task} />
          </Draggable>
        ))}
      </Container>
    </Box>
  );
}
