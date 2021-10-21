import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import { Task } from './TasksList';

interface TaskItemProps {
  task: Task;
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string) => void;
}

export function TaskItem({ task, toggleTaskDone, removeTask, editTask }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(task.title);

  const textInputRef = useRef<TextInput>(null);

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setIsEditing(false);
    setTitle(task.title);
  }

  function handleSubmitEditing() {
    editTask(task.id, title);
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current) {
      if (isEditing) {
        textInputRef.current.focus()
      } else {
        textInputRef.current.blur()
      }
    }

  }, [isEditing])

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${task.id}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${task.id}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && (
              <Icon
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            value={title}
            onChangeText={setTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={textInputRef}
          />
        </TouchableOpacity>
      </View>

      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        {isEditing ?
          <TouchableOpacity
            onPress={handleCancelEditing}
          >
            <Icon
              name="x"
              size={18}
              color="#AFAFAF"
            />
          </TouchableOpacity>
          : <TouchableOpacity
            onPress={handleStartEditing}
          >
            <Icon
              name="edit"
              size={18}
              color="#AFAFAF"
            />
          </TouchableOpacity>}
        <View
          style={{
            width: 1,
            height: 24,
            backgroundColor: 'rgba(196, 196, 196, 0.24)',
            marginLeft: 20,
          }}
        />
        <TouchableOpacity
          testID={`trash-${task.id}`}
          style={{ paddingHorizontal: 24, opacity: isEditing ? 0.2 : 1 }}
          onPress={() => removeTask(task.id)}
          disabled={isEditing}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium'
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#B2B2B2',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium'
  }
})
