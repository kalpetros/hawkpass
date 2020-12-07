import PropTypes from 'prop-types';
import React from 'react';

import { Panel } from './Panel';

export const Password = props => {
  const { value } = props;

  return (
    <Panel style={value !== '-' ? { cursor: 'copy' } : null}>
      <span className="text-xl font-semibold">{value}</span>
    </Panel>
  );
};

Password.defaultProps = {
  value: '-',
};

Password.propTypes = {
  value: PropTypes.string.isRequired,
};
