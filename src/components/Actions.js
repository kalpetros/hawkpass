import PropTypes from 'prop-types';
import React from 'react';

import { Button } from './Button';

export const Actions = props => {
  const { onGenerate, onReset } = props;

  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <Button title="Generate" onClick={onGenerate} />
      <Button title="Reset" onClick={onReset} />
    </div>
  );
};

Actions.propTypes = {
  onGenerate: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};
