import React, { Component } from 'react';
import ItemStatusFilter from '../item-status-filter';
import './search-panel.css';

export default class SearchPanel extends Component {
  state = {
    term: ''
  };
  onSearchChange = e => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchChange(term);
  };

  render() {
    return (
        <input
          className='search-input'
          value={this.state.term}
          onChange={this.onSearchChange}
        />
    );
  }
}
