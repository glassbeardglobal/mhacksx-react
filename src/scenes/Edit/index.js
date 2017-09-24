import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Editor, EditorState, RichUtils, convertToRaw } from 'draft-js';
import { Redirect } from 'react-router-dom';

import './edit.css';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: EditorState.createEmpty(),
      title: '',
      redirectUrl: ''
    };

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.editorChange = this.editorChange.bind(this);
    this.submitStory = this.submitStory.bind(this);
  }

  handleTitleChange(event) {
    this.setState({ title: event.target.value });
  }

  editorChange(editorState) {
    RichUtils.toggleInlineStyle(this.state.text, 'BOLD');
    this.setState({ text: editorState });
  }

  submitStory() {
    const payload = {
      title: this.state.title,
      content: convertToRaw(this.state.text.getCurrentContent())
    };

    fetch('/api/story', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(payload)
    })
      .then(response => response.json())
      .then((responseData) => {
        this.setState({
          redirectUrl: `/read/${responseData.id}`
        });
      });
  }

  render() {
    return (
      <div className="write-wrapper">
        { this.state.redirectUrl !== '' && <Redirect to={this.state.redirectUrl} push /> }
        <div className="editor-options-wrapper">
          <div id="justify-options" className="options-list btn-group" data-toggle="buttons-radio">
            <button>
              <i className="fa fa-align-left" aria-hidden="true" />
            </button>
            <button>
              <i className="fa fa-align-center" aria-hidden="true" />
            </button>
            <button>
              <i className="fa fa-align-right" aria-hidden="true" />
            </button>
            <button>
              <i className="fa fa-align-justify" aria-hidden="true" />
            </button>
          </div>

          <div id="text-options" className="options-list btn-group" data-toggle="buttons-radio">
            <button>
              <i className="fa fa-italic" aria-hidden="true" />
            </button>
            <button>
              <i className="fa fa-bold" aria-hidden="true" />
            </button>
            <button>
              <i className="fa fa-underline" aria-hidden="true" />
            </button>
          </div>
        </div>
        <div className="edit-wrapper">
          <div>
            <div className="edit-header">
              <div className="edit-title-wrapper">
                <TitleInput title={this.state.title} titleChange={this.handleTitleChange} />
              </div>
              <div className="done-button">
                <button className="btn btn-primary" onClick={this.submitStory}>
                  Publish
                </button>
              </div>
            </div>

            <div className="content-editor">
              <Editor editorState={this.state.text} onChange={this.editorChange} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Toolbar = props => (
  <div className="toolbar">
    <button onClick={props.bold}>Bold</button>
  </div>
);

Toolbar.propTypes = {
  bold: PropTypes.func.isRequired
};

const TitleInput = props => (
  <input
    className="title-input"
    placeholder={'Title your story'}
    value={props.title}
    onChange={props.titleChange}
  />
);

TitleInput.propTypes = {
  title: PropTypes.string.isRequired,
  titleChange: PropTypes.func.isRequired
};

export default Edit;
