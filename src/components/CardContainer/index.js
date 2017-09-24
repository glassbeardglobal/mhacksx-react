import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StoryCard from '../StoryCard';

import './CardContainer.css';

class CardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { stories: [] };
    this.getStories = this.getStories.bind(this);
  }

  componentWillMount() {
    this.getStories();
  }

  getStories() {
    const user = this.props.source === 'user';
    const currentUserId = localStorage.getItem('currentUserId');
    fetch('/api/story')
      .then(results => results.json())
      .then((data) => {
        this.setState({
          stories: user ? data.filter(story => story.author === currentUserId) : data
        });
      });
  }

  render() {
    const cards = [];
    this.state.stories.forEach((story) => {
      cards.push(
        <StoryCard
          key={story._id}
          id={story._id}
          content={story.content}
          title={story.title}
          upvotes={story.upv}
          downvotes={story.dv}
          author={story.author}
          imageUrl={story.image}
          branches={story.children.length}
        />
      );
    });

    return <div className="cardContainer">{cards}</div>;
  }
}

CardContainer.propTypes = {
  source: PropTypes.string.isRequired
};

CardContainer.defaultProps = {
  source: 'all'
};

export default CardContainer;
