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
      const res = await fetch('/api/pending');
      res.json().then(res => setUser(res));
      setLoading(false);
    };
    fetchData();
  }, []);
  const approvedUser = (index, item) => {
    fetch('/api/approved', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, state: 'APPROVED' })
    }).then(() => {
      const removeItem = [...users];
      removeItem.splice(index, 1);
      setUser(removeItem);
    });
  };
  const rejectedUser = (index, item) => {
    fetch('/api/rejected', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: item.id, state: 'REJECTED' })
    }).then(() => {
      const removeItem = [...users];
      removeItem.splice(index, 1);
      setUser(removeItem);
    });
  };
  const checkUsers = () => {
    if (users.length) {
      return users.map((item, index) => (
        <Card key={item._id} index={index} user={item}>
          <Button action={() => approvedUser(index, item)} type="succes">
            Aprobar
          </Button>
          <Button action={() => rejectedUser(index, item)} type="error">
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

export default Dashboard;
