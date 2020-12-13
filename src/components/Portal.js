import { doc } from 'prettier';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export const Portal = props => {
  const { children } = props;
  const [active, setActive] = useState(false);
  const container = document.getElementById('portal-container');
  const className = `bg-gray-900 fixed top-0 p-4 p-8 h-full z-30 transition-all`;

  useEffect(() => {
    const element = document.getElementById('portal');
    const width = element.offsetWidth;

    if (active) {
      element.style.left = 0;
    } else {
      element.style.left = `-${width}px`;
    }
  }, [active]);

  const handleToggle = () => {
    setActive(a => (a ? false : true));
  };

  return ReactDOM.createPortal(
    <div className={className} id="portal">
      <div
        className="bg-gray-900 text-gray-200 font-semibold p-4 rounded-r-xl cursor-pointer absolute top-32 sm:top-8 left-full"
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
