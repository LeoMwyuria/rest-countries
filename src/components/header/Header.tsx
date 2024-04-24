import React from 'react';
import darkmode from '../../assets/darkmode.png';

interface HeaderProps {
  onClick: () => void;
  classname: string;
}

const Header: React.FC<HeaderProps> = ({ onClick,classname }) => {
  return (
    <div className={classname}>
      <p className='headerP'>Where in the world?</p>
      <div onClick={onClick} className='darkmode'>
        <img src={darkmode} alt="" />
        <span >Dark Mode</span>
      </div>
    </div>
  );
};

export default Header;
