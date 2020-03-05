import React from 'react';
import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({ todos, onDelete, onToggleImportant, onToggleDone }) => {
  const elements = todos.map(item => {
    const { id, ...props } = item;
    if (props.visible) {
      return (
        <li className='todo-list-item list-group-item' key={id}>
          <TodoListItem
            {...props}
            onDelete={() => onDelete(id)}
            onToggleDone={() => onToggleDone(id)}
            onToggleImportant={() => onToggleImportant(id)}
          />
        </li>
      );
    }
  });

  return <ul className='list-group todo-list'>{elements}</ul>;
};

export default TodoList;
