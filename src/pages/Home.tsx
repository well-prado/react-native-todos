import React, { useState } from 'react';
import { findNodeHandle, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const task : Task = {
      done: false,
      id: new Date().getTime(),
      title: newTaskTitle,
    }
    setTasks(oldState => [...oldState, task]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))
    
    const foundItem = updatedTasks.find(item => item.id === id) 
      
    if(!foundItem)
      return;
      // updatedTasks.find(task => task.id === id)!.done = updatedTasks.find(task => task.id === id)!.done === true ? false : true //WRONG WAY BY CROZA
      foundItem.done = !foundItem.done;
      setTasks(updatedTasks);
    }

  function handleRemoveTask(id: number) {
    // setTasks(oldState => oldState.filter(
    //   task => task.id !== id
    // ));

    const updatedTasks = tasks.filter(task => task.id !== id);

    setTasks(updatedTasks);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})
