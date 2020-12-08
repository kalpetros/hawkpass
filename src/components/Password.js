import PropTypes from 'prop-types';
import React from 'react';

import { Panel } from './Panel';
import { toast } from './toast';

export const Password = props => {
  const { value } = props;

  const handleCopyPassword = () => {
    const element = document.getElementById('password');
    element.select();
    document.execCommand('copy');
    toast('Copied to clipboard');
  };

  let className =
    'bg-transparent focus:outline-none text-xl font-semibold w-full text-center';
  className = value !== '-' ? `${className} cursor-copy` : className;

  return (
    <Panel
      style={value !== '-' ? { cursor: 'copy' } : null}
      onClick={
        value !== '-'
          ? handleCopyPassword
          : () => toast('Generate a password first')
      }
    >
      <input
        type="text"
        value={value}
        className={className}
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
