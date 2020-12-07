import PropTypes from 'prop-types';
import React from 'react';

import { Panel } from './Panel';

export const Password = props => {
  const { value } = props;

  return (
    <Panel style={value !== '-' ? { cursor: 'copy' } : null}>{value}</Panel>
  );
};

Password.defaultProps = {
  value: '-',
};

Password.propTypes = {
  value: PropTypes.string.isRequired,
};
