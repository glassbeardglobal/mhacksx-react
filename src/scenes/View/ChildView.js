import React, { Component } from 'react';
import PropTypes from 'prop-types';

import View from './index';

class ChildView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      children: [],
      nextId: ''
    };

    this.apiCallMade = false;

    this.click = this.click.bind(this);
  }

  componentDidUpdate() {
    const payload = {
      childIds: this.props.viewChildren
    };
    if (this.props.viewChildren.length === 0) {
      return;
    }
    if (this.state.children > 0) {
      return;
    }
    if (this.apiCallMade) {
      return;
    }

    this.apiCallMade = true;

    fetch('/api/story/branches', {
      method: 'POST',
      headers: {
        Accepts: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).then(result => result.json())
      .then((data) => {
        this.setState({
          children: data.data
        });
      });
  }

  click(id) {
    this.setState({
      nextId: id
    });
  }

  render() {
    if (this.props.viewChildren.length === 0) {
      return <div />;
    }

    const paths = [];

    this.state.children.forEach((c) => {
      paths.push(
        <CVLink
          key={c._id}
          id={c._id}
          text={c.content.blocks[0].text}
          click={this.click}
        />
      );
    });

    let selectedChild;
    if (this.state.nextId) {
      selectedChild = <View subId={this.state.nextId} />;
    }

    return (
      <div className="branch-options">
        <div className="paths">
          {paths}
        </div>
        { selectedChild }
      </div>
    );
  }
}

ChildView.propTypes = {
  viewChildren: PropTypes.arrayOf(PropTypes.string).isRequired
};

const CVLink = (props) => {
  const CAP = 26;
  let text = props.text;
  if (props.text.length > CAP) {
    text = `${props.text.slice(0, CAP - 3)}...`;
  }
  return (
    <div className="cv-link">
      <button className="btn" onClick={() => { props.click(props.id); }}>
        {text}
      </button>
    </div>
  );
};

CVLink.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  click: PropTypes.func.isRequired
};

export default ChildView;
