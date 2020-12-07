import PropTypes from 'prop-types';
import React from 'react';

export const Layout = ({ children }) => {
  return <div className="h-full w-screen p-8">{children}</div>;
};

Layout.propTypes = {
  children: PropTypes.node,
};
