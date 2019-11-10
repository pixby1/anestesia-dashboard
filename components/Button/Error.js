import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/core';

const ButtonError = ({ children, action }) => {
  return (
    <Button
      onClick={action}
      border="1px solid #FF1A1A"
      bg="#FF1A1A"
      color="#fff"
      _hover={{
        bg: '#fff',
        borderColor: '#FF1A1A',
        color: '#FF1A1A'
      }}
      _active={{
        bg: '#fff',
        borderColor: '#FF1A1A',
        color: '#FF1A1A'
      }}
    >
      {children}
    </Button>
  );
};

ButtonError.propTypes = {
  children: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
};

export { ButtonError };
