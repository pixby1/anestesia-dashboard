import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/core';

const ButttonSucces = ({ children, action }) => {
  return (
    <Button
      onClick={action}
      mr={5}
      border="1px solid #0070f3"
      bg="#0070f3"
      color="#fff"
      _hover={{
        bg: '#fff',
        borderColor: '#3291ff',
        color: '#3291ff'
      }}
      _active={{
        bg: '#fff',
        borderColor: '#3291ff',
        color: '#3291ff'
      }}
    >
      {children}
    </Button>
  );
};

ButttonSucces.propTypes = {
  children: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
};

export { ButttonSucces };
