import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Text, Input, Box, Stack, Button } from '@chakra-ui/core';

import { Layout } from '../components/Login/Layout';

const Login = () => {
  const [state, setState] = useState({ email: '', password: '' });
  const router = useRouter();
  const handleChange = event => {
    const { name, value } = event.target;
    setState({
      ...state,
      [name]: value
    });
  };
  const handleClick = () => {
    fetch('/api/auth', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: state.email,
        password: state.password
      })
    })
      .then(() => {
        router.push('/dashboard');
      })
      .catch(err => {
        console.log(`Ocurrio un problema: ${err}`);
      });
  };
  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <Box mt="12em">
        <Text fontSize="3xl" color="#000" fontWeight="bold">
          Login
        </Text>
        <Box mt="5">
          <Stack spacing={3}>
            <Input
              value={state.email}
              onChange={handleChange}
              name="email"
              isRequired
              variant="filled"
              placeholder="email"
            />
            <Input
              value={state.password}
              onChange={handleChange}
              name="password"
              type="password"
              isRequired
              variant="filled"
              placeholder="password"
            />
            <Button
              onClick={handleClick}
              rounded="5px"
              border="1px solid #111"
              bg="#111"
              color="#fff"
              _hover={{
                bg: '#fff',
                borderColor: '#000',
                color: '#000'
              }}
              _active={{
                bg: '#fff',
                borderColor: '#000',
                color: '#000'
              }}
            >
              Continue
            </Button>
          </Stack>
        </Box>
      </Box>
    </Layout>
  );
};

export default Login;
