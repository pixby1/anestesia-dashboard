import React, { useState, useEffect } from 'react';
import { Box, Badge, Image, Flex, Link, Text, Spinner } from '@chakra-ui/core';

import  Layout  from '../components/Layout';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch('https://anestesia.now.sh/api/user');
      res.json().then(res => setData(res));
      setLoading(false);
    };
    fetchData();
  }, []);
  return (
    <Layout>
      <Flex align="center" justify="center" m={10}>
        {isLoading ? (
          <Spinner size="xl" color="#F49B0B" />
        ) : (
          <Box>usuarios penddientes</Box>
        )}
      </Flex>
    </Layout>
  );
};

export default Dashboard;
