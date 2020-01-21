// Packages
import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider, theme, CSSReset } from '@chakra-ui/core';

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      {children}
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.object.isRequired
};

export { Layout };
