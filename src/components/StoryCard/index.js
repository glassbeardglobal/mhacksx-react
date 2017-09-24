/* eslint jsx-a11y/interactive-supports-focus: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { convertFromRaw } from 'draft-js';

import './StoryCard.css';

// const testImage = require('../../images/test01.jpg');

class StoryCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      upvotes: props.upvotes,
      downvotes: props.downvotes,
      author: 'No author',
      branches: props.branches,
      genre: 'No genre',
      redirectUrl: ''
    };
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
    this.getAuthorUsername = this.getAuthorUsername.bind(this);
    this.cardclick = this.cardclick.bind(this);
  }

  componentWillMount() {
    this.getAuthorUsername();
  }

  getAuthorUsername() {
    fetch(`/api/user/${this.props.author}`)
      .then(results => results.json())
      .then((data) => {
        this.setState({ author: data.username });
      });
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

  cardclick() {
    this.setState({
      redirectUrl: `/read/${this.props.id}`
    });
  }

  render() {
    return (
      <div onClick={this.cardclick} role="link" className="card">
        {this.state.redirectUrl && <Redirect to={this.state.redirectUrl} />}
        <div className="card-header-image">
          <img src={this.props.imageUrl} alt="" />
        </div>
        <div className="card-header">
          <div className="card-info-container">
            <h4 className="card-title">{this.props.title}</h4>
            <h4 className="card-author">
              {this.state.author} - {this.state.genre}
            </h4>
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
          <p className="card-context">{convertFromRaw(this.props.content).getPlainText()}</p>
        </div>
        <div className="branch-info">
          <span className="vote-count">{this.state.branches}</span>
          <i className="branch-icon fa fa-share-alt" />
        </div>
      </div>
    );
  }
}

StoryCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  upvotes: PropTypes.number.isRequired,
  downvotes: PropTypes.number.isRequired,
  author: PropTypes.string.isRequired,
  content: PropTypes.shape({}).isRequired,
  branches: PropTypes.number,
  imageUrl: PropTypes.string
};

StoryCard.defaultProps = {
  imageUrl: '',
  branches: 0
};

export default StoryCard;
