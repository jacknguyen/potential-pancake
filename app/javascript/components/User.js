import React from 'react';

const User = props => {
  return (
    <div>
      {props.id}
      {' '}
      {props.email}
    </div>
  )
}

export default User;
