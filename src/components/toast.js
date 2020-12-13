import React from 'react';

export const toast = (msg, options) => {
  const validOptions = ['bgColor', 'textColor'];
  const colors = {
    bgColor: 'bg-gray-900',
    textColor: 'text-gray-200',
  };

  if (typeof options !== 'undefined') {
    Object.keys(options).forEach(option => {
      if (!validOptions.includes(option)) {
        console.error(`${option} is not a valid toast option.`);
      } else {
        colors[option] = options[option];
      }
    });
  }

  const container = document.getElementById('toast-container');
  let topDistance = `1rem`;

  // Check for existing toasts
  const elements = container.childElementCount;

  if (elements > 0) {
    // Check first child height
    const elementHeight = container.firstElementChild.clientHeight;
    // New element's distance from top
    topDistance = `calc(${elements + 1}rem + ${elementHeight * elements}px)`;
  }

  const element = document.createElement('div');
  element.className = `${colors.bgColor} ${colors.textColor} font-semibold fixed p-4 rounded-xl shadow-lg z-50 fadein-left`;
  element.style.top = topDistance;
  element.setAttribute('data-top', topDistance);
  element.innerText = msg;

  container.appendChild(element);

  setTimeout(() => {
    element.remove();
  }, 5000);
};

export const ToastContainer = () => {
  return <div id="toast-container"></div>;
};
