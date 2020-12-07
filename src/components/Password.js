import PropTypes from 'prop-types';
import React from 'react';

export const Password = props => {
  const { value } = props;

  let className =
    'bg-gray-700 hover:bg-gray-600 text-gray-200 text-center text-xl font-semibold p-8 rounded-xl mb-4 overflow-auto';
  className = value !== '-' ? `${className} cursor-copy` : className;

  return <div className={className}>{value}</div>;
};

Password.defaultProps = {
  value: '-',
};

Password.propTypes = {
  value: PropTypes.string.isRequired,
};
