import PropTypes from 'prop-types';
import React from 'react';

export const Scenario = props => {
  const { per_second, per_minute, per_hour, per_day, per_year } = props.values;

  return (
    <div className="grid grid-flow-col gap-4">
      <div className="bg-gray-700 text-gray-200 text-center p-8 rounded-xl">
        <div className="text-xl font-semibold">{per_second}</div>
        <div>seconds</div>
      </div>
      <div className="bg-gray-700 text-gray-200 text-center p-8 rounded-xl">
        <div className="text-xl font-semibold">{per_minute}</div>
        <div>minutes</div>
      </div>
      <div className="bg-gray-700 text-gray-200 text-center p-8 rounded-xl">
        <div className="text-xl font-semibold">{per_hour}</div>
        <div>hours</div>
      </div>
      <div className="bg-gray-700 text-gray-200 text-center p-8 rounded-xl">
        <div className="text-xl font-semibold">{per_day}</div>
        <div>days</div>
      </div>
      <div className="bg-gray-700 text-gray-200 text-center p-8 rounded-xl">
        <div className="text-xl font-semibold">{per_year}</div>
        <div>years</div>
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
