import PropTypes from 'prop-types';
import React from 'react';

export const Panel = props => {
  const { children, bgColor, style, onClick } = props;
  const className = `${bgColor} text-gray-200 text-center p-8 rounded-xl mb-4 relative test`;

  return (
    <div className={className} style={style} onClick={onClick} data-test="">
      {children}
    </div>
  );
};

Panel.defaultProps = {
  bgColor: 'bg-gray-700',
};

Panel.propTypes = {
  children: PropTypes.node,
  bgColor: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
};
