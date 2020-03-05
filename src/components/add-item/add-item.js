import React, { Component } from 'react';
import './add-item.css';

export default class AddItem extends Component {
  state = {
    label: ''
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.label) {
      this.props.onItemAdd(this.state.label);
      this.setState({ label: '' });
    }
  };

  onLabelChange = e => {
    this.setState({
      label: e.target.value
    });
  };

  render() {
    return (
      <form className='add-item d-flex' onSubmit={this.onSubmit}>
        <input
          type='text'
          className='form-control'
          onChange={this.onLabelChange}
          placeholder='what need to be done'
          value={this.state.label}
        />
        <button className='btn btn-outline-secondary add-item-button'>
          Add Item
        </button>
      </form>
    );
  }
}
