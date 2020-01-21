// Packages
import React, { useEffect, useState } from 'react';
import { Flex, Box } from '@chakra-ui/core';

// Components
import { Card } from '../components/Card';
import { MessageInfo } from '../components/MessageInfo';
import { SpinnerLoad } from '../components/Spinner';
import { Layout } from '../components/Layout';

const RemoveUser = () => {
  const [isLoading, setLoading] = useState(false);
  const [users, setUser] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch('/api/removeUser');
      const userDecoded = await res.json();
      setUser(userDecoded);
      setLoading(false);
    };
    fetchData();
  }, []);
  const checkUsers = () => {
    if (users.length) {
      return users.map((item, index) => (
        <Card key={item._id} index={index} user={item} />
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

export default RemoveUser;
