import React from 'react';

import './StoryCard.css';

const StoryCard = () => (
  <div className="card">
    <div className="card-header">
      <div className="card-info-container">
        <h4 className="card-title">Title</h4>
      </div>
      <div className="card-button-container">
        <button className="card-button upvote-button">
          <span className="vote-count">16</span>
          <i className="fa fa-angle-up" />
        </button>
        <button className="card-button downvote-button">
          <span className="vote-count">4</span>
          <i className="fa fa-angle-down" />
        </button>
      </div>
    </div>
    <div className="card-content">
      <p className="card-context">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industrys standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
      </p>
      <p className="card-context">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
        been the industrys standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
        It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
        passages, and more recently with desktop publishing software like Aldus PageMaker including
        versions of Lorem Ipsum.
      </p>
    </div>
    <div className="card-branch-container">
      <button className="branch-button">Branch 1</button>
      <button className="branch-button">Branch 2</button>
      <button className="branch-button">Branch 3</button>
      <button className="branch-button">Branch 4</button>
    </div>
  </div>
);

export default StoryCard;
