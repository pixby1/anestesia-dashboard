import React from 'react';
import PropTypes from 'prop-types';
import {
  ThemeProvider,
  CSSReset,
  theme,
  Tabs,
  TabList,
  Tab,
  Flex,
  Menu,
  MenuList,
  MenuButton,
  MenuItem
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
            <MenuItem onClick={() => router.push('/deletedUsers')}>
              Usuarios borrados
            </MenuItem>
            <MenuItem onClick={() => {}}>Sistema de alertas</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Tabs index={tabIndex} isFitted>
        <TabList>
          <Tab onClick={() => router.push('/')}>CLASA</Tab>
          <Tab onClick={() => router.push('/pending')}>USUARIOS PENDIENTES</Tab>
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
