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
import { toast, ToastContainer } from './components/toast';
import { Portal } from './components/Portal';
import { Pwd } from './pwd';

const App = () => {
  const [entropyCollected, setEntropyCollected] = useState(false);
  const [data, setData] = useState({});
  const [options, setOptions] = useState({
    useNumbers: false,
    useSymbols: false,
    useSpaces: false,
    useWordList: 'original',
    useCase: 'lowercase',
    useWords: 5,
  });
  const pwd = useMemo(() => new Pwd(), []);

  useEffect(() => {
    if (Object.keys(data).includes('password') && !entropyCollected) {
      setEntropyCollected(true);
      document.body.style.overflow = 'initial';
    } else if (Object.keys(data).length === 0 && entropyCollected) {
      toast('Password cleared');
    }
  }, [entropyCollected, data]);

  const handleSetOptions = option => {
    setOptions({ ...options, [option]: options[option] ? false : true });
  };

  const handleSetWordList = option => {
    setOptions({ ...options, ['useWordList']: option });
  };

  const handleSetCase = option => {
    setOptions({ ...options, ['useCase']: option });
  };

  const handleSetWords = action => {
    if (action === 'increase' && options.useWords < 14) {
      setOptions({ ...options, ['useWords']: options.useWords + 1 });
    }

    if (action === 'decrease' && options.useWords > 5) {
      setOptions({ ...options, ['useWords']: options.useWords - 1 });
    }
  };

  const handleGenerate = () => {
    const result = pwd.generate(options);
    setData(result);
  };

  const handleReset = () => {
    if (Object.keys(data).length > 0) {
      setData({});
    }
  };

  return (
    <>
      <ToastContainer />
      {!entropyCollected ? (
        <CollectEntropy options={options} setData={setData} fn={pwd} />
      ) : null}
      <Portal>
        <Options
          options={options}
          onSetOptions={handleSetOptions}
          onSetWords={handleSetWords}
          onSetCase={handleSetCase}
          onSetWordList={handleSetWordList}
        />
      </Portal>
      <Layout>
        <div className="grid gap-4">
          <Password value={data.password} />
          <Entropy value={data.entropy} />
          <Scenario values={data.guesses} />
          <Actions onGenerate={handleGenerate} onReset={handleReset} />
        </div>
      </Layout>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
