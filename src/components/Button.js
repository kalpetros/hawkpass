import PropTypes from 'prop-types';
import React from 'react';

export const Button = props => {
  const { title, bgColor, bgHoverColor, onClick } = props;
  const colorClasses = `${bgColor} hover:${bgHoverColor} text-gray-200`;
  const className = `${colorClasses} text-xl focus:outline-none font-semibold p-8 rounded-xl capitalize truncate shadow-lg`;

  return (
    <button className={className} onClick={onClick}>
      {title}
    </button>
  );
};

Button.defaultProps = {
  title: 'Button',
  bgColor: 'bg-gray-900',
  bgHoverColor: 'bg-black',
  onClick: () => {
    alert('Button clicked!');
  },
};

Button.propTypes = {
  title: PropTypes.string,
  bgColor: PropTypes.string,
  bgHoverColor: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};
