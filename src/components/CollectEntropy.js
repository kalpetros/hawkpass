import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { toast } from './toast';

export const CollectEntropy = props => {
  const { options, setData, fn } = props;
  const [strokeDasharray, setStrokeDashArray] = useState(0);
  const [percentage, setPercentage] = useState(0);
  let events = 0;

  useEffect(() => {
    toast('Move your mouse to generate entropy', { bgColor: 'bg-indigo-900' });

    const interval = setInterval(() => {
      if (events < 150) {
        toast('Waiting for your input...', { bgColor: 'bg-indigo-900' });
      }
    }, 15000);

    window.addEventListener('mousemove', addEntropy);
    window.addEventListener('touchmove', addEntropy);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const addEntropy = event => {
    events++;

    const clientX = event.clientX;
    const clientY = event.clientY;
    const timeStamp = event.timeStamp;
    const total = clientX + clientY + timeStamp;

    setStrokeDashArray(events);
    setPercentage(parseInt((events / 200) * 100), 0);

    fn.random.addEntropy(total);

    if (events >= 200) {
      removeEvent();
    }
  };

  const removeEvent = () => {
    window.removeEventListener('mousemove', addEntropy);
    window.removeEventListener('touchmove', addEntropy);
    const data = fn.generate(options);
    setData(data);
  };

  return (
    <div className="bg-black bg-opacity-80 fixed top-0 right-0 bottom-0 left-0 z-40 grid items-center justify-center">
      <div>
        <svg height="200" width="200">
          <circle
            style={{
              strokeDasharray: strokeDasharray,
              strokeDashoffset: '1000',
            }}
            cx="100"
            cy="100"
            r="80"
            stroke="#312e81"
            strokeWidth="3"
            fillOpacity="0"
          />
          <text
            style={{ fontSize: '2rem' }}
            x="50%"
            y="50%"
            textAnchor="middle"
            stroke="white"
            strokeWidth="1px"
            dy="0.6rem"
          >
            {percentage} %
          </text>
        </svg>
      </div>
    </div>
  );
};

CollectEntropy.propTypes = {
  options: PropTypes.object.isRequired,
  setData: PropTypes.func.isRequired,
  fn: PropTypes.object.isRequired,
};
