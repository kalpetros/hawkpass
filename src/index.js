import './styles/global.css';

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import { Layout } from './components/Layout';
import { Password } from './components/Password';
import { Options } from './components/Options';
import { Entropy } from './components/Entropy';
import { Scenario } from './components/Scenario';
import { Actions } from './components/Actions';
import { generate } from './utils';

const App = () => {
  const [data, setData] = useState({});
  const [options, setOptions] = useState({
    useNumbers: false,
    useSymbols: false,
    useSpaces: false,
    useDiceware: false,
    useMoreWords: false,
  });

  const handleSetOptions = option => {
    setOptions({ ...options, [option]: options[option] ? false : true });
  };

  const handleGenerate = () => {
    const result = generate(options);
    setData(result);
  };

  const handleReset = () => {
    setData({});
  };

  return (
    <Layout>
      <div className="grid gap-4">
        <Password value={data.password} />
        <Options options={options} onSetOptions={handleSetOptions} />
        <Entropy value={data.entropy} />
        <Scenario values={data.guesses} />
        <Actions onGenerate={handleGenerate} onReset={handleReset} />
      </div>
    </Layout>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
