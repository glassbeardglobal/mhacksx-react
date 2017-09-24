import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js';

import ForkedEditor from './ForkedEditor';
import ChildView from './ChildView';
import './view.css';

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: EditorState.createEmpty(),
      breakKey: '',
      breakIdx: -1,
      root: null,
      originalChild: null,
      children: [],
      upvotes: 0,
      downvotes: 0
    };

    this.textChange = this.textChange.bind(this);
    this.branch = this.branch.bind(this);
    this.upvote = this.upvote.bind(this);
    this.downvote = this.downvote.bind(this);
  }

  componentWillMount() {
    const id = this.props.subId === '' ? this.props.match.params.id : this.props.subId;
    fetch(`/api/story/${id}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          title: data.title,
          text: EditorState.createWithContent(convertFromRaw(data.content)),
          children: data.children,
          imageUrl: data.image,
          upvotes: data.upv,
          downvotes: data.dv
        });
      });
  }

  upvote() {
    const id = this.props.subId === '' ? this.props.match.params.id : this.props.subId;
    fetch(`/api/story/${id}/upv`, {
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
    const id = this.props.subId === '' ? this.props.match.params.id : this.props.subId;
    fetch(`/api/story/${id}/dv`, {
      method: 'POST'
    })
      .then(results => results.json())
      .then((data) => {
        if (data.success) {
          this.setState({ downvotes: this.state.downvotes + 1 });
        }
      });
  }

  textChange(editorState) {
    const breakKey = editorState.getSelection().getStartKey();
    const breakIdx = editorState.getSelection().getStartOffset();
    this.setState({
      breakKey,
      breakIdx
    });
  }

  branch() {
    const raw = convertToRaw(this.state.text.getCurrentContent());
    const root = [];
    const originalChild = [];

    let seen = false;
    raw.blocks.forEach((d) => {
      if (seen) {
        originalChild.push(d);
      } else {
        root.push(d);
      }
      if (d.key === this.state.breakKey) {
        seen = true;
      }
    });

    this.setState({
      root: { entityMap: raw.entityMap, blocks: root },
      originalChild: { entityMap: raw.entityMap, blocks: originalChild }
    });
  }

  render() {
    const id = this.props.subId === '' ? this.props.match.params.id : this.props.subId;
    const subView = this.props.subId === '';

    let currentEditor;
    const mainEditor = (
      <div className="main-editor">
        <Editor editorState={this.state.text} onClick={this.textClick} onChange={this.textChange} />
        <ChildView viewChildren={this.state.children} />
      </div>
    );

    currentEditor = mainEditor;

    if (this.state.root) {
      currentEditor = (
        <ForkedEditor
          root={this.state.root}
          originalChild={this.state.originalChild}
          id={id}
          title={this.state.title}
        />
      );
    }

    return (
      <div className="view">
        <div className="branch-button">
          {this.state.breakKey !== '' && (
            <button className="btn btn-primary" onClick={this.branch}>
              Branch
            </button>
          )}
        </div>

        <div className="view-title-wrapper">
          {subView && <h1 className="view-title">{this.state.title}</h1>}
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

        { this.state.imageUrl && <img className="banner" src={this.state.imageUrl} alt="" /> }
        {currentEditor}
      </div>
    );
  }
}

View.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  subId: PropTypes.string
};

View.defaultProps = {
  subId: '',
  match: {
    params: {
      id: ''
    }
  }
};

export default View;
