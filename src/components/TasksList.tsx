import React from 'react';
import { FlatList } from 'react-native';


import { ItemWrapper } from './ItemWrapper';
import { TaskItem } from './TaskItem';


export interface Task {
  id: number;
  title: string;
  done: boolean;
}


interface TasksListProps {
  tasks: Task[];
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number) => void;
}

export function TasksList({ tasks, removeTask, toggleTaskDone, editTask }: TasksListProps) {

  return (
    <FlatList
      data={tasks}
      keyExtractor={item => String(item.id)}
      contentContainerStyle={{ paddingBottom: 24 }}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => {
        return (
          <ItemWrapper index={index}>
            <TaskItem
              removeTask={removeTask}
              toggleTaskDone={toggleTaskDone}
              task={item}
              editTask={editTask}
            />
          </ItemWrapper>
        )
      }}
      style={{
        marginTop: 32
      }}
    />
  )
}
