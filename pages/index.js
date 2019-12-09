import React from 'react';

import Dashboard from './dashboard';

const Index = () => {
  return <Dashboard />;
};

Index.getInitialProps = ({ req, res }) => {
  if (typeof window === 'undefined') {
    // Packages
    const Cookies = require('cookies');

    const cookie = new Cookies(req, res);
    const token = cookie.get('token');
    if (!token) {
      res.writeHead(301, { Location: '/login' });
      res.end();
      return {};
    }
    return {};
  }
};

export default Index;
