import PropTypes from 'prop-types';
import React from 'react';

export const Entropy = props => {
  const { value } = props;

  return (
    <div className="bg-gray-700 text-gray-200 text-center p-8 rounded-xl mb-4">
      <div className="text-xl font-semibold truncate">{value}</div>
      <div className="truncate">bits of entropy</div>
    </div>
  );
};

Entropy.defaultProps = {
  value: '-',
};

Entropy.propTypes = {
  value: PropTypes.string.isRequired,
};
