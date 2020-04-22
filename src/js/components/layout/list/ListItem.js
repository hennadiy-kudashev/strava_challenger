import React, { PropTypes } from 'react';
import { Link } from "react-router";
import JoinButton from '../JoinButton';
import Markdown from "../../shared/Markdown";

const ListItem = ({ challenge, user }) => {
  return (
    <li className="item">
      <div className="product-img">
        <i className="fa fa-trophy fa-2x"></i>
      </div>
      <div className="product-info">
        <Link to={"/challenge/" + challenge._id} className="product-title">
          <span>{challenge.displayName}</span>
        </Link>
        <JoinButton user={user} challenge={challenge}/>
        <div className="product-description">
          <Markdown>
            {challenge.description || 'Awesome challenge. Become stronger'}
          </Markdown>
        </div>
      </div>
    </li>
  );
};

ListItem.propTypes = {
  challenge: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default ListItem;
