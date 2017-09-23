import React, { Component } from 'react';
import StoryCard from '../StoryCard';

import './CardContainer.css';

class CardContainer extends Component {
  constructor() {
    super();
    this.state = { stories: [] };
    this.getStories = this.getStories.bind(this);
  }

  componentWillMount() {
    this.getStories();
  }

  getStories() {
    fetch('/api/story')
      .then(results => results.json())
      .then((data) => {
        this.setState({ stories: data });
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
        />
      );
    });

    return <div className="cardContainer">{cards}</div>;
  }
}

export default CardContainer;
