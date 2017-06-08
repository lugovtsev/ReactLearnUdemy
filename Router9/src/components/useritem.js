import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

const UserItem = (props) => (
  <Link
    className='box'
    onClick={props.onClick}
    to={`/user:${props.user.login.username}`}
  >
    <img src={props.user.picture.thumbnail} />
    <span>{props.user.login.username}</span>
  </Link>
)

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
