import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/core';

const ButtonDefault = ({ children, action }) => {
  return (
    <Button
      onClick={action}
      color="#fff"
      bg="#000"
      border="1px solid #000"
      width="280"
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
      {children}
    </Button>
  );
};

ButtonDefault.propTypes = {
  children: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired
};

export { ButtonDefault };
