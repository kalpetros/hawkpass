import PropTypes from 'prop-types';
import React from 'react';

export const Actions = props => {
  const { onGenerate, onReset } = props;
  return (
    <div className="grid grid-flow-col gap-4">
      <button
        className="bg-gray-900 text-gray-200 text-xl font-semibold p-8 rounded-xl"
        onClick={onGenerate}
      >
        Generate
      </button>
      <button
        className="bg-gray-900 text-gray-200 text-xl font-semibold p-8 rounded-xl"
        onClick={onReset}
      >
        Reset
      </button>
    </div>
  );
};

Actions.propTypes = {
  onGenerate: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};
