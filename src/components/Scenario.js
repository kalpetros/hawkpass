import PropTypes from 'prop-types';
import React from 'react';

import { Panel } from './Panel';

export const Scenario = props => {
  const { per_second, per_minute, per_hour, per_day, per_year } = props.values;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
      <Panel>
        <div className="text-xl font-semibold truncate">{per_second}</div>
        <div className="truncate">seconds</div>
      </Panel>
      <Panel>
        <div className="text-xl font-semibold truncate">{per_minute}</div>
        <div className="truncate">minutes</div>
      </Panel>
      <Panel>
        <div className="text-xl font-semibold truncate">{per_hour}</div>
        <div className="truncate">hours</div>
      </Panel>
      <Panel>
        <div className="text-xl font-semibold truncate">{per_day}</div>
        <div className="truncate">days</div>
      </Panel>
      <Panel>
        <div className="text-xl font-semibold truncate">{per_year}</div>
        <div className="truncate">years</div>
      </Panel>
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
