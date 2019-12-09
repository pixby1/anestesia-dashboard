// Packages
import React, { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/core';

// Components
import { Layout } from '../components/Dashboard/Layout';
import { SpinnerLoad } from '../components/Spinner';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { MessageInfo } from '../components/MessageInfo';

const Dashboard = () => {
  const [users, setUser] = useState([]);
  const [isLoading, setLoading] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch('https://anestesia.now.sh/api/user');
      res.json().then(res => setUser(res));
      setLoading(false);
    };
    fetchData();
  }, []);
  const checkUsers = () => {
    if (users.length) {
      return users.map((item, index) => (
        <Card key={item._id} index={index} user={item}>
          <Button action={() => {}} type="succes">
            Aprobar
          </Button>
          <Button action={() => {}} type="error">
            Rechazar
          </Button>
        </Card>
      ));
    }
    return <MessageInfo />;
  };
  return (
    <Layout tabIndex={0}>
      <Flex align="center" justify="center" m={10}>
        {isLoading ? <SpinnerLoad /> : <Box>{checkUsers()}</Box>}
      </Flex>
    </Layout>
  );
};

Dashboard.getInitialProps = ({ req, res }) => {
  if (typeof window === 'undefined') {
    // Packages
    const Cookies = require('cookies');
    const jwt = require('jsonwebtoken');

    const cookie = new Cookies(req, res);
    const token = cookie.get('token');
    const dataDecoded = jwt.verify(
      token,
      '2BD41682-8DA5-438B-808A-05C4E12EC919'
    );
    const { verify } = dataDecoded;
    if (!token) {
      res.writeHead(301, { Location: '/login' });
      res.end();
      return {};
    }
    if (!verify) {
      res.writeHead(301, { Location: '/login' });
      res.end();
      return {};
    }
    return { dataDecoded };
  }
};

export default Dashboard;
