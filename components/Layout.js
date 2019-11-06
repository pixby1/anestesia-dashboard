import React, { useState } from 'react';
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

const Layout = ({ children }) => {
  const router = useRouter();
  const [tabIndex, setTabIndex] = useState(0);
  const handleTab = () => {
    if (tabIndex === '/') {
      setTabIndex(tabIndex);
    }
    if (router.pathname === '/approved') {
      setTabIndex(tabIndex);
    }
    if (router.pathname === '/rejected') {
      setTabIndex(tabIndex);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Tabs index={tabIndex} onChange={handleTab} isFitted>
        <TabList color="#666">
          <Tab onClick={() => router.push('/')}>usuarios pendientes</Tab>
          <Tab onClick={() => router.push('/approved')}>usuarios aprovados</Tab>
          <Tab onClick={() => router.push('/rejected')}>
            usuarios rechazados
          </Tab>
        </TabList>
      </Tabs>
      {children}
    </ThemeProvider>
  );
};

Layout.propTypes = {
  children: PropTypes.object.isRequired
};

export default Layout;
