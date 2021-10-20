import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const findDuplicatedTask = updatedTasks.find(item => newTaskTitle === item.title)

    if (findDuplicatedTask)
      return Alert.alert('Task already exists', 'You cannot add a new task with the same name!', [
        {
          text: "Ok",
          onPress: () => console.log("Ok Pressed"),
        },
      ]);

    const task: Task = {
      done: false,
      id: new Date().getTime(),
      title: newTaskTitle,
    }
    setTasks(oldState => [...oldState, task]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const taskToBeMarkedAsDone = updatedTasks.find(item => item.id === id)

    if (!taskToBeMarkedAsDone)
      return;

    // updatedTasks.find(task => task.id === id)!.done = updatedTasks.find(task => task.id === id)!.done === true ? false : true //WRONG WAY BY CROZA
    taskToBeMarkedAsDone.done = !taskToBeMarkedAsDone.done;
    setTasks(updatedTasks);
  }

  function handleEditTask(id: number, taskNewTitle: string) {
    const updatedTasks = tasks.map(task => ({ ...task }))

    const editTask = updatedTasks.find(item => taskNewTitle !== item.title);

    if (!editTask)
      return;

    editTask.title = taskNewTitle;

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remove this task?', 'Deleting this task cannot be undone!', [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: () => {
          const updatedTasks = tasks.filter(task => task.id !== id);

          setTasks(updatedTasks);
        }
      }
    ]);
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      // editTask={}
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
