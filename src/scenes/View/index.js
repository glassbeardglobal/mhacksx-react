import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js';

import ForkedEditor from './ForkedEditor';
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
      originalChild: null
    };

    this.textChange = this.textChange.bind(this);
    this.branch = this.branch.bind(this);
  }

  componentWillMount() {
    const id = this.props.match.params.id;
    fetch(`/api/story/${id}`)
      .then(response => response.json())
      .then((data) => {
        this.setState({
          title: data.title,
          text: EditorState.createWithContent(convertFromRaw(data.content))
        });
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
      if (d.key === this.state.breakKey) {
        seen = true;
      }

      if (seen) {
        originalChild.push(d);
      } else {
        root.push(d);
      }
    });

    this.setState({
      root: { entityMap: raw.entityMap, blocks: root },
      originalChild: { entityMap: raw.entityMap, blocks: originalChild }
    });
  }

  render() {
    let currentEditor;
    const mainEditor = (
      <Editor
        editorState={this.state.text}
        onClick={this.textClick}
        onChange={this.textChange}
      />
    );

    currentEditor = mainEditor;

    if (this.state.root) {
      currentEditor = (
        <ForkedEditor
          root={this.state.root}
          originalChild={this.state.originalChild}
          id={this.props.match.params.id}
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

        <h1 className="view-title">{this.state.title}</h1>

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
  }).isRequired
};

export default View;
