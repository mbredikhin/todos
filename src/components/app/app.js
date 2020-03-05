import React, { Component } from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import AddItem from '../add-item';
import ItemStatusFilter from '../item-status-filter';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Make App'),
      this.createTodoItem('Have a lunch')
    ],
    term: '',
    filter: 'all'
  };

  createTodoItem(label) {
    return {
      label,
      important: false,
      done: false,
      id: this.maxId++,
      visible: true
    };
  }

  addItem = text => {
    const newItem = this.createTodoItem(text);
    this.setState(({ todoData }) => ({ todoData: [newItem, ...todoData] }));
  };

  deleteItem = id => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex(e => e.id === id);
      const before = todoData.slice(0, index);
      const after = todoData.slice(index + 1);
      return {
        todoData: [...before, ...after]
      };
    });
  };

  toggleProperty(array, id, propName) {
    const index = array.findIndex(e => e.id === id);
    const oldItem = array[index];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...array.slice(0, index), newItem, ...array.slice(index + 1)];
  }

  onToggleDone = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'done')
      };
    });
  };

  onToggleImportant = id => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'important')
      };
    });
  };

  search(items, term) {
    if (!term.length) {
      return items;
    }
    return items.filter(item => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  }

  onSearchChange = term => {
    this.setState({ term });
  };
  onFilterChange = filter => {
    this.setState({ filter });
  };

  filter(items, filter) {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter(item => !item.done);
      case 'done':
        return items.filter(item => item.done);
      default:
        return items;
    }
  }

  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter(el => el.done).length;
    const toDoCount = todoData.filter(el => !el.done).length;
    return (
      <div
        style={{
          maxWidth: '575px',
          minWidth: '400px',
          width: 55 + '%',
          margin: '0 auto'
        }}
      >
        <AppHeader toDo={toDoCount} done={doneCount} />
        <div className='top-panel d-flex'>
          <SearchPanel onSearchChange={this.onSearchChange} />
          <ItemStatusFilter
            filter={filter}
            onFilterChange={this.onFilterChange}
          />
        </div>
        <TodoList
          todos={visibleItems}
          onDelete={this.deleteItem}
          onToggleImportant={this.onToggleImportant}
          onToggleDone={this.onToggleDone}
        />
        <AddItem onItemAdd={this.addItem} />
      </div>
    );
  }
}
