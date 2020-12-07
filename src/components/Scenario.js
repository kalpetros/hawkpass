import PropTypes from 'prop-types';
import React from 'react';

export const Scenario = props => {
  const { per_second, per_minute, per_hour, per_day, per_year } = props.values;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4">
      <div className="bg-gray-700 text-gray-200 text-center p-8 rounded-xl">
        <div className="text-xl font-semibold truncate">{per_second}</div>
        <div className="truncate">seconds</div>
      </div>
      <div className="bg-gray-700 text-gray-200 text-center p-8 rounded-xl">
        <div className="text-xl font-semibold truncate">{per_minute}</div>
        <div className="truncate">minutes</div>
      </div>
      <div className="bg-gray-700 text-gray-200 text-center p-8 rounded-xl">
        <div className="text-xl font-semibold truncate">{per_hour}</div>
        <div className="truncate">hours</div>
      </div>
      <div className="bg-gray-700 text-gray-200 text-center p-8 rounded-xl">
        <div className="text-xl font-semibold truncate">{per_day}</div>
        <div className="truncate">days</div>
      </div>
      <div className="bg-gray-700 text-gray-200 text-center p-8 rounded-xl">
        <div className="text-xl font-semibold truncate">{per_year}</div>
        <div className="truncate">years</div>
      </div>
    </div>
  );
};

Scenario.defaultProps = {
  values: {
    per_second: '-',
    per_minute: '-',
    per_hour: '-',
    per_day: '-',
    per_year: '-',
  },
};

Scenario.propTypes = {
  values: PropTypes.object.isRequired,
};
