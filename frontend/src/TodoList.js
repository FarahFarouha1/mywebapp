import React, { Component } from 'react';
import axios from 'axios';
import TodoItems from './TodoItems';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      inputValue: '',
    };
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount() {
    this.fetchTasks();
  }

  async fetchTasks() {
    try {
      const response = await axios.get('http://backend:5000/api/tasks');
      this.setState({ items: response.data });
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  async addItem(e) {
    e.preventDefault();
    if (this.state.inputValue.trim() !== '') {
      try {
        const response = await axios.post('http://backend:5000/api/tasks', {
          text: this.state.inputValue.trim(),
        });
        const newItem = response.data;
        this.setState(prevState => ({
          items: [...prevState.items, newItem],
          inputValue: '',
        }));
      } catch (error) {
        console.error('Error adding task:', error);
      }
    }
  }

  async deleteItem(key) {
    try {
      await axios.delete(`http://backend:5000/api/tasks/${key}`);
      const filteredItems = this.state.items.filter(item => item.key !== key);
      this.setState({ items: filteredItems });
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  }

  handleInputChange(e) {
    this.setState({ inputValue: e.target.value });
  }

  render() {
    return (
      <div className="todoListMain">
        <div className="header">
          <form onSubmit={this.addItem}>
            <input
              value={this.state.inputValue}
              onChange={this.handleInputChange}
              placeholder="Enter task"
            />
            <button type="submit">Add</button>
          </form>
          <TodoItems entries={this.state.items} delete={this.deleteItem} />
        </div>
      </div>
    );
  }
}

export default TodoList;
