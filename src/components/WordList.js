import PropTypes from 'prop-types';
import React from 'react';

import { Button } from './Button';
import { words } from '../wordlists/words';

export const WordList = props => {
  const { useWordList, onSetWordList } = props;

  const lists = Object.keys(words).map((list, index) => {
    return (
      <Button
        key={`list-${index}`}
        title={list}
        bgColor={useWordList === list ? 'bg-black' : 'bg-gray-800'}
        onClick={() => onSetWordList(list)}
      />
    );
  });

  return <div className="grid grid-cols-2 gap-4">{lists}</div>;
};

WordList.propTypes = {
  useWordList: PropTypes.string.isRequired,
  onSetWordList: PropTypes.func.isRequired,
};
