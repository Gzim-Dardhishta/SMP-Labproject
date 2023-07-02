import React from 'react';
import './styles/backdrop.scss';

function BackDrop(props) {
  return (
    <div className='nav-backdrop' onClick={props.click}></div>
  )
}

export default BackDrop