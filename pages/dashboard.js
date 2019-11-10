// Packages
import React, { useState, useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/core';

// Components
import { Layout } from '../components/Layout';
import { SpinnerLoad } from '../components/Spinner';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { MessageInfo } from '../components/MessageInfo';

// Utils
import { removeUser } from '../lib/utils/removeUser';
import { createUser } from '../lib/utils/createUser';

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
  const approvedUser = (index, item) => {
    removeUser('https://anestesia.now.sh/api/user', item._id);
    createUser('https://anestesia.now.sh/api/approved', item);
    const removeItem = [...users];
    removeItem.splice(index, 1);
    setUser(removeItem);
  };
  const rejectedUser = (index, item) => {
    removeUser('https://anestesia.now.sh/api/user', item.id);
    createUser('https://anestesia.now.sh/api/rejected', item);
    const removeItem = [...users];
    removeItem.splice(index, 1);
    setUser(removeItem);
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
    <Layout>
      <Flex align="center" justify="center" m={10}>
        {isLoading ? <SpinnerLoad /> : <Box>{checkUsers()}</Box>}
      </Flex>
    </Layout>
  );
};

export default Dashboard;
