import React from 'react';
import PropTypes from 'prop-types';
import { CSSReset, Flex, ThemeProvider, theme } from '@chakra-ui/core';

const Layout = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Flex align="center" justify="center">
        {children}
      </Flex>
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.array.isRequired
};

export { Layout };
