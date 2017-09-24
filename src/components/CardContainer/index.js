import React, { Component } from 'react';
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
    const route = this.props.source === 'user' ? '/api/story' : '/api/story';

    fetch(route)
      .then(results => results.json())
      .then((data) => {
        this.setState({ stories: data });
      });
  }

  render() {
    const cards = [];
    this.state.stories.forEach((story, i) => {
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
