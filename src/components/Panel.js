import PropTypes from 'prop-types';
import React from 'react';

export const Panel = props => {
  const { children, style } = props;
  const className =
    'bg-gray-700 text-gray-200 text-center p-8 rounded-xl mb-4 overflow-auto';

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
};

Panel.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
};
