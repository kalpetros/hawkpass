import PropTypes from 'prop-types';
import React from 'react';

import { Panel } from './Panel';

export const Password = props => {
  const { value } = props;

  const handleCopyPassword = () => {
    const element = document.getElementById('password');
    element.select();
    document.execCommand('copy');
  };

  return (
    <Panel
      style={value !== '-' ? { cursor: 'copy' } : null}
      onClick={handleCopyPassword}
    >
      <input
        type="text"
        value={value}
        className="bg-transparent focus:outline-none text-xl font-semibold w-full text-center cursor-copy"
        id="password"
        readOnly
      />
    </Panel>
  );
};

Password.defaultProps = {
  value: '-',
};

Password.propTypes = {
  value: PropTypes.string.isRequired,
};
