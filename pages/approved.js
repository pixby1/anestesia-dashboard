// Packages
import React, { useState, useEffect } from 'react';
import { Flex, Box } from '@chakra-ui/core';

// Components
import { Layout } from '../components/Dashboard/Layout';
import { SpinnerLoad } from '../components/Spinner';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { MessageInfo } from '../components/MessageInfo';

const Approved = () => {
  const [users, setUser] = useState([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch('https://anestesia.now.sh/api/approved');
      res.json().then(res => setUser(res));
      setLoading(false);
    };
    fetchData();
  }, []);
  const handleClick = index => {
    const removeItem = [...users];
    removeItem.splice(index, 1);
    setUser(removeItem);
  };
  const checkUsers = () => {
    if (users.length) {
      return users.map((item, index) => (
        <Card key={item._id} index={index} user={item}>
          <Button type="error" action={() => handleClick(index, item)}>
            Borrar usuario
          </Button>
        </Card>
      ));
    }
    return <MessageInfo />;
  };
  return (
    <Layout tabIndex={1}>
      <Flex align="center" justify="center" m={10}>
        {isLoading ? <SpinnerLoad /> : <Box>{checkUsers()}</Box>}
      </Flex>
    </Layout>
  );
};

export default Approved;
