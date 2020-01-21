import React from 'react';
import PropTypes from 'prop-types';
import {
  ThemeProvider,
  CSSReset,
  theme,
  Tabs,
  TabList,
  Tab,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
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
        <Menu>
          <MenuButton mr="1em">Home</MenuButton>
          <MenuList>
            <MenuItem onClick={() => router.push('/removeUser')}>
              Usuarios borrados
            </MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Tabs index={tabIndex} isFitted>
        <TabList color="#666">
          <Tab onClick={() => router.push('/dashboard')}>
            usuarios pendientes
          </Tab>
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
