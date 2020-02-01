import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/core';

const MessageInfo = ({ children }) => {
  return <Text fontSize="lg">{children}</Text>;
};

MessageInfo.propTypes = {
  children: PropTypes.string.isRequired
};

export { MessageInfo };
