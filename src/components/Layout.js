import PropTypes from 'prop-types';
import React from 'react';

export const Layout = ({ children }) => {
  return <div className="max-w-screen-lg mx-auto p-8">{children}</div>;
};

Layout.propTypes = {
  children: PropTypes.node,
};
