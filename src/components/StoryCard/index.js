import React, { Component } from 'react';

import './StoryCard.css';

class StoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upvotes: props.upvotes,
      downvotes: props.downvotes
    };
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }

  upvote() {
    fetch(`/api/story/${this.props.id}/upv`, {
      method: 'POST'
    })
      .then(results => results.json())
      .then((data) => {
        if (data.success) {
          this.setState({ upvotes: this.state.upvotes + 1 });
        }
      });
  }

  downvote() {
    fetch(`/api/story/${this.props.id}/dv`, {
      method: 'POST'
    })
      .then(results => results.json())
      .then((data) => {
        if (data.success) {
          this.setState({ downvotes: this.state.downvotes + 1 });
        }
      });
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <div className="card-info-container">
            <h4 className="card-title">{this.props.title}</h4>
          </div>
          <div className="card-button-container">
            <button className="card-button upvote-button" onClick={this.upvote}>
              <span className="vote-count">{this.state.upvotes}</span>
              <i className="fa fa-angle-up" />
            </button>
            <button className="card-button downvote-button" onClick={this.downvote}>
              <span className="vote-count">{this.state.downvotes}</span>
              <i className="fa fa-angle-down" />
            </button>
          </div>
        </div>
        <div className="card-content">
          <p className="card-context">{this.props.content}</p>
        </div>
        <div className="card-branch-container">
          <button className="branch-button">Branch 1</button>
          <button className="branch-button">Branch 2</button>
          <button className="branch-button">Branch 3</button>
          <button className="branch-button">Branch 4</button>
        </div>
      </div>
    );
  }
}

export default StoryCard;