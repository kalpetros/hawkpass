import PropTypes from 'prop-types';
import React from 'react';

export const Password = props => {
  const { value } = props;

  return (
    <div className="bg-gray-700 hover:bg-gray-600 text-gray-200 text-center text-xl font-semibold p-8 rounded-xl">
      {value}
    </div>
  );
};

Password.defaultProps = {
  value: '-',
};

Password.propTypes = {
  value: PropTypes.string.isRequired,
};
