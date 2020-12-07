import PropTypes from 'prop-types';
import React from 'react';

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
    <div className="grid grid-flow-col gap-4">
      <button
        className={`${
          useNumbers ? 'bg-black' : 'bg-gray-900'
        } text-gray-200 w-full rounded-xl p-8`}
        onClick={() => onSetOptions('useNumbers')}
      >
        Numbers
      </button>
      <button
        className={`${
          useSymbols ? 'bg-black' : 'bg-gray-900'
        } text-gray-200 w-full rounded-xl p-8`}
        onClick={() => onSetOptions('useSymbols')}
      >
        Symbols
      </button>
      <button
        className={`${
          useSpaces ? 'bg-black' : 'bg-gray-900'
        } text-gray-200 w-full rounded-xl p-8`}
        onClick={() => onSetOptions('useSpaces')}
      >
        Spaces
      </button>
      <button
        className={`${
          useDiceware ? 'bg-black' : 'bg-gray-900'
        } text-gray-200 w-full rounded-xl p-8`}
        onClick={() => onSetOptions('useDiceware')}
      >
        Diceware
      </button>
      <button
        className={`${
          useMoreWords ? 'bg-black' : 'bg-gray-900'
        } text-gray-200 w-full rounded-xl p-8`}
        onClick={() => onSetOptions('useMoreWords')}
      >
        More words
      </button>
    </div>
  );
};

Options.propTypes = {
  options: PropTypes.object.isRequired,
  onSetOptions: PropTypes.func.isRequired,
};
