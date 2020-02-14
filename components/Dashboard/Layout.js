import React from 'react';
import PropTypes from 'prop-types';
import {
  ThemeProvider,
  CSSReset,
  theme,
  Tabs,
  TabList,
  Tab,
  Flex
} from '@chakra-ui/core';
import { useRouter } from 'next/router';

// Components
import { Badge } from './Badge';

const Layout = ({ children, tabIndex }) => {
  const router = useRouter();
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Flex justify="space-between">
        <Badge>Admin</Badge>
      </Flex>
      <Tabs index={tabIndex} isFitted>
        <TabList>
          <Tab onClick={() => router.push('/')}>usuarios pendientes</Tab>
          <Tab onClick={() => router.push('/approved')}>usuarios aprobados</Tab>
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
