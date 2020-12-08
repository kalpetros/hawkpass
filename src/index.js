import './styles/global.css';

import React, { useEffect, useMemo, useState } from 'react';
import ReactDOM from 'react-dom';

import { Layout } from './components/Layout';
import { CollectEntropy } from './components/CollectEntropy';
import { Password } from './components/Password';
import { Options } from './components/Options';
import { Entropy } from './components/Entropy';
import { Scenario } from './components/Scenario';
import { Actions } from './components/Actions';
import { Random } from './random';

const App = () => {
  const [entropyCollected, setEntropyCollected] = useState(false);
  const [data, setData] = useState({});
  const [options, setOptions] = useState({
    useNumbers: false,
    useSymbols: false,
    useSpaces: false,
    useDiceware: false,
    useMoreWords: false,
  });
  const random = useMemo(() => new Random(), []);

  useEffect(() => {
    if (Object.keys(data).includes('password') && !entropyCollected) {
      setEntropyCollected(true);
    }
  }, [entropyCollected, data]);

  const handleSetOptions = option => {
    setOptions({ ...options, [option]: options[option] ? false : true });
  };

  const handleGenerate = () => {
    const result = random.generate(options);
    setData(result);
  };

  const handleReset = () => {
    setData({});
  };

  return (
    <>
      {!entropyCollected ? (
        <CollectEntropy options={options} setData={setData} fn={random} />
      ) : null}
      <Layout>
        <Password value={data.password} />
        <Options options={options} onSetOptions={handleSetOptions} />
        <Entropy value={data.entropy} />
        <Scenario values={data.guesses} />
        <Actions onGenerate={handleGenerate} onReset={handleReset} />
      </Layout>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
