import PropTypes from 'prop-types';
import React from 'react';

import { Button } from './Button';

export const Options = props => {
  const {
    useNumbers,
    useSymbols,
    useSpaces,
    useDiceware,
    useMoreWords,
  } = props.options;
  const { onSetOptions } = props;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-4">
      <Button
        title="Numbers"
        bgColor={useNumbers ? 'bg-black' : 'bg-gray-900'}
        onClick={() => onSetOptions('useNumbers')}
      />
      <Button
        title="Symbols"
        bgColor={useSymbols ? 'bg-black' : 'bg-gray-900'}
        onClick={() => onSetOptions('useSymbols')}
      />
      <Button
        title="Spaces"
        bgColor={useSpaces ? 'bg-black' : 'bg-gray-900'}
        onClick={() => onSetOptions('useSpaces')}
      />
      <Button
        title="Diceware"
        bgColor={useDiceware ? 'bg-black' : 'bg-gray-900'}
        onClick={() => onSetOptions('useDiceware')}
      />
      <Button
        title="More words"
        bgColor={useMoreWords ? 'bg-black' : 'bg-gray-900'}
        onClick={() => onSetOptions('useMoreWords')}
      />
    </div>
  );
};

Options.propTypes = {
  options: PropTypes.object.isRequired,
  onSetOptions: PropTypes.func.isRequired,
};
