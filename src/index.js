import './styles/global.css';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { Layout } from './components/Layout';
import { generate } from './utils';

const App = () => {
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [spaces, setSpaces] = useState(false);
  const [diceware, setDiceware] = useState(false);
  const [moreWords, setMoreWords] = useState(false);

  const handleGenerate = () => {
    const options = {
      useNumbers: numbers,
      useSymbols: symbols,
      useSpaces: spaces,
      userDiceware: diceware,
      useMoreWords: moreWords,
    };
    generate(options);
  };

  const handleReset = () => {};

  return (
    <Layout>
      <div className="grid gap-4">
        <div className="bg-gray-700 hover:bg-gray-600 text-gray-200 w-full p-8 text-center rounded-xl">
          kj12lej 12lj 3lk12l3kl12j kl12j34 kl124j
        </div>
        <div className="grid grid-flow-col gap-4">
          <button
            className={`${
              numbers ? 'bg-black border border-indigo-900' : 'bg-gray-900'
            } text-gray-200 w-full rounded-xl p-8`}
            onClick={() => setNumbers(n => (n ? false : true))}
          >
            Numbers
          </button>
          <button
            className={`${
              symbols ? 'bg-black border border-indigo-900' : 'bg-gray-900'
            } text-gray-200 w-full rounded-xl p-8`}
            onClick={() => setSymbols(s => (s ? false : true))}
          >
            Symbols
          </button>
          <button
            className={`${
              spaces ? 'bg-black border border-indigo-900' : 'bg-gray-900'
            } text-gray-200 w-full rounded-xl p-8`}
            onClick={() => setSpaces(s => (s ? false : true))}
          >
            Spaces
          </button>
          <button
            className={`${
              diceware ? 'bg-black border border-indigo-900' : 'bg-gray-900'
            } text-gray-200 w-full rounded-xl p-8`}
            onClick={() => setDiceware(d => (d ? false : true))}
          >
            Diceware
          </button>
          <button
            className={`${
              moreWords ? 'bg-black border border-indigo-900' : 'bg-gray-900'
            } text-gray-200 w-full rounded-xl p-8`}
            onClick={() => setMoreWords(m => (m ? false : true))}
          >
            More words
          </button>
        </div>
        <div className="bg-gray-700 text-gray-200 w-full text-center rounded-xl p-8">
          65 bits of entropy
        </div>
        <div className="grid grid-flow-col gap-4">
          <button
            className="bg-gray-900 text-gray-200 p-8 rounded-xl"
            onClick={handleGenerate}
          >
            Generate
          </button>
          <button
            className="bg-gray-900 text-gray-200 p-8 rounded-xl"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      </div>
    </Layout>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
