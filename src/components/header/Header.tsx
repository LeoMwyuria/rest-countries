import React from 'react';
import darkmode from '../../assets/darkmode.png';

interface HeaderProps {
  onClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onClick }) => {
  return (
    <div className='header'>
      <p className='headerP'>Where in the world?</p>
      <div onClick={onClick} className='darkmode'>
        <img src={darkmode} alt="" />
        <span>dark Mode</span>
      </div>
    </div>
  );
};

export default Header;
