import PropTypes from 'prop-types';
import React from 'react';

import { Button } from './Button';
import { WordList } from './WordList';

export const Options = props => {
  const {
    useWords,
    useNumbers,
    useSymbols,
    useSpaces,
    useCase,
    useWordList,
  } = props.options;
  const { onSetWords, onSetOptions, onSetCase, onSetWordList } = props;

  return (
    <div>
      <p className="text-gray-200 font-semibold my-4">Passphrase length</p>
      <div>
        <div className="grid grid-cols-3 gap-4">
          <Button
            title="-"
            bgColor="bg-gray-800"
            onClick={() => onSetWords('decrease')}
          />
          <div className="bg-gray-800 text-gray-200 font-semibold p-8 rounded-xl text-center">
            {useWords}
          </div>
          <Button
            title="+"
            bgColor="bg-gray-800"
            onClick={() => onSetWords('increase')}
          />
        </div>
      </div>
      <p className="text-gray-200 font-semibold my-4">Options</p>
      <div className="grid grid-cols-2 gap-4">
        <Button
          title="Numbers"
          bgColor={useNumbers ? 'bg-black' : 'bg-gray-800'}
          onClick={() => onSetOptions('useNumbers')}
        />
        <Button
          title="Symbols"
          bgColor={useSymbols ? 'bg-black' : 'bg-gray-800'}
          onClick={() => onSetOptions('useSymbols')}
        />
        <Button
          title="Spaces"
          bgColor={useSpaces ? 'bg-black' : 'bg-gray-800'}
          onClick={() => onSetOptions('useSpaces')}
        />
        <Button
          title="Lowercase"
          bgColor={useCase === 'lowercase' ? 'bg-black' : 'bg-gray-800'}
          onClick={() => onSetCase('lowercase')}
        />
        <Button
          title="Uppercase"
          bgColor={useCase === 'uppercase' ? 'bg-black' : 'bg-gray-800'}
          onClick={() => onSetCase('uppercase')}
        />
        <Button
          title="Capitalize"
          bgColor={useCase === 'capitalize' ? 'bg-black' : 'bg-gray-800'}
          onClick={() => onSetCase('capitalize')}
        />
      </div>
      <p className="text-gray-200 font-semibold py-4">Word list</p>
      <WordList useWordList={useWordList} onSetWordList={onSetWordList} />
    </div>
  );
};

Options.propTypes = {
  options: PropTypes.object.isRequired,
  onSetWords: PropTypes.func.isRequired,
  onSetOptions: PropTypes.func.isRequired,
  onSetCase: PropTypes.func.isRequired,
  onSetWordList: PropTypes.func.isRequired,
};
