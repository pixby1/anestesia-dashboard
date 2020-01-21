// Packages
import React from 'react';
import PropTypes from 'prop-types';
import { Tag, TagLabel } from '@chakra-ui/core';

const Badge = ({ children }) => {
  return (
    <Tag
      mt="1em"
      ml="1em"
      size="sm"
      style={{ backgroundColor: '#000', color: '#fff' }}
      rounded="full"
    >
      <TagLabel>{children}</TagLabel>
    </Tag>
  );
};

Badge.propTypes = {
  children: PropTypes.string.isRequired
};

export { Badge };
