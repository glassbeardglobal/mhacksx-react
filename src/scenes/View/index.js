import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, convertFromRaw } from 'draft-js';

import './view.css';

class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: EditorState.createEmpty()
    };
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

  render() {
    return (
      <div className="view">
        <h1 className="view-title">{this.state.title}</h1>

        <Editor
          editorState={this.state.text}
          readOnly
        />
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
