import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export const Portal = props => {
  const { children } = props;
  const [active, setActive] = useState(false);
  const container = document.getElementById('portal-container');
  const baseClassName = 'bg-gray-900 fixed p-8 z-30 transition-all';
  const mobileClassName = `${
    active ? 'top-1/4' : 'top-95'
  } left-0 right-0 h-3/4 w-full rounded-t-3xl`;
  const normalClassName = `${
    active ? 'sm:left-0' : 'sm:-left-1/3'
  } sm:top-0 sm:h-full sm:w-1/3 sm:right-auto sm:rounded-t-none`;
  const className = `${baseClassName} ${mobileClassName} ${normalClassName}`;

  const handleToggle = () => {
    setActive(a => (a ? false : true));
  };

  return ReactDOM.createPortal(
    <div className={className}>
      <div
        className="bg-gray-200 h-1 w-1/4 m-auto absolute top-4 left-0 right-0 sm:hidden block"
        onClick={handleToggle}
      ></div>
      <div
        className="bg-gray-900 text-gray-200 font-semibold p-4 rounded-r-xl cursor-pointer absolute top-0 sm:top-8 left-0 sm:left-full hidden sm:block"
        onClick={handleToggle}
      >
        Options
      </div>
      <div className="h-full overflow-auto">{children}</div>
    </div>,
    container
  );
};

Portal.propTypes = {
  children: PropTypes.node.isRequired,
};
