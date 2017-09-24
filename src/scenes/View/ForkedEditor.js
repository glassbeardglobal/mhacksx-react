/* eslint react/prop-types: 0 */

import React, { Component } from 'react';

import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import anime from 'animejs';
import $ from 'jquery';

class ForkedEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: EditorState.createEmpty()
    };

    this.editorChange = this.editorChange.bind(this);
    this.setDomEditorRef = (ref) => {
      this.domEditor = ref;
    };
    this.submit = this.submit.bind(this);
  }

  componentDidMount() {
    $('.branch-button .btn-primary').prop('disabled', true);
    // Animation
    anime.timeline().add({
      targets: '.origState',
      opacity: [1, 0],
      translateY: {
        value: [0, 100],
        duration: 330
      },
      duration: 300,
      easing: 'easeInQuad',
      complete: () => {
        $('.origState').remove();
      }
    }).add({
      targets: '.divider',
      opacity: [0, 1],
      duration: 500,
      easing: 'easeInQuad',
      complete: () => {
        this.domEditor.focus();
      }
    });
  }

  editorChange(editorState) {
    this.setState({ text: editorState });
  }

  submit() {
    const payload = {
      rootID: this.props.id,
      rootText: this.props.root,
      originalChild: this.props.originalChild,
      branchedChild: convertToRaw(this.state.text.getCurrentContent()),
      title: this.props.title
    };

    fetch('/api/story/branch', {
      method: 'POST',
      headers: {
        Accepts: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(result => result.json())
      .then((data) => {
        console.log(data);
      });
  }

  render() {
    const rootState = EditorState
      .createWithContent(convertFromRaw(this.props.root));

    const origState = EditorState
      .createWithContent(convertFromRaw(this.props.originalChild));

    return (
      <div>
        <Editor editorState={rootState} readOnly />
        <div className="origState">
          <Editor editorState={origState} readOnly />
        </div>

        <div className="divider">
          <div className="dashed" />
          <button className="btn btn-primary" onClick={this.submit}>
            Publish
          </button>
        </div>

        <Editor
          editorState={this.state.text}
          onChange={this.editorChange}
          ref={this.setDomEditorRef}
        />
      </div>
    );
  }
}

export default ForkedEditor;
