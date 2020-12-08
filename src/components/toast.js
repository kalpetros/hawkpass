import React from 'react';

export const toast = msg => {
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
  element.className = `bg-gray-900 text-gray-200 font-semibold fixed p-4 rounded-xl shadow-lg show`;
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
