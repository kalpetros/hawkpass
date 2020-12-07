import PropTypes from 'prop-types';
import React from 'react';

import { Panel } from './Panel';

export const Entropy = props => {
  const { value } = props;

  return (
    <Panel>
      <div className="text-xl font-semibold truncate">{value}</div>
      <div className="truncate">bits of entropy</div>
    </Panel>
  );
};

Entropy.defaultProps = {
  value: '-',
};

Entropy.propTypes = {
  value: PropTypes.string.isRequired,
};
