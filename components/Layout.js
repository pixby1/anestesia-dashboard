import React from 'react';
import PropTypes from 'prop-types';
import {
  ThemeProvider,
  CSSReset,
  theme,
  Tabs,
  TabList,
  Tab
} from '@chakra-ui/core';

import { useRouter } from 'next/router';

const Layout = ({ children, tabIndex }) => {
  const router = useRouter();
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Tabs index={tabIndex} isFitted>
        <TabList color="#666">
          <Tab onClick={() => router.push('/')}>usuarios pendientes</Tab>
          <Tab onClick={() => router.push('/approved')}>usuarios aprobados</Tab>
          <Tab onClick={() => router.push('/rejected')}>
            usuarios rechazados
          </Tab>
        </TabList>
      </Tabs>
      {children}
    </ThemeProvider>
  );
};

Layout.defaultProps = {
  tabIndex: 0
};

Layout.propTypes = {
  children: PropTypes.object.isRequired,
  tabIndex: PropTypes.number.isRequired
};

export { Layout };
