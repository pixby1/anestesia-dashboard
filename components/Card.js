import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Text,
  Stack,
  Button,
  Image,
  Flex,
  Collapse
} from '@chakra-ui/core';

const Card = ({ user, index, children }) => {
  const [isCollapse, setCollapse] = useState(null);
  const toggle = () => {
    // tomara como valor positivo un numero mayor a 0
    // eso se le conoce como el famoso "Truthy"
    if (index) {
      setCollapse(!isCollapse);
    }
    if (index === 0) {
      setCollapse(!isCollapse);
    }
  };
  return (
    <Box
      m={5}
      maxW="sm"
      borderWidth="1px"
      rounded="lg"
      overflow="hidden"
      boxShadow="md"
    >
      <Image
        src="https://guiauniversitaria.mx/wp-content/uploads/2019/10/16-de-octubre-di%CC%81a-mundial-del-anestesio%CC%81logo-1068x623.jpg"
        alt="imagen de naruto"
      />
      <Box p="6">
        <Box>
          <Text fontWeight={600}>
            {user.name} {user.lastName}
          </Text>
          <Box mt={3}>
            <Button onClick={toggle}>
              Mostrar {isCollapse ? 'menos' : 'mas'}
            </Button>
            <Collapse isOpen={isCollapse}>
              <Box d="inline" lignItems="baseline">
                <Stack spacing={1} mt={3}>
                  <Text>
                    <b>email:</b> {user.email}
                  </Text>
                  <Text>
                    <b>rol del trabajo:</b> {user.jobRole}
                  </Text>
                  <Text>
                    <b>dni:</b> {user.dni}
                  </Text>
                  <Text>
                    <b>país:</b> {user.country}
                  </Text>
                  <Text>
                    <b>sociedad:</b> {user.society}
                  </Text>
                  <Text>
                    <b>fecha de creación:</b> {user.date}
                  </Text>
                </Stack>
              </Box>
              <Flex align="center" justify="center" mt={2}>
                {children}
              </Flex>
            </Collapse>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

Card.propTypes = {
  user: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  children: PropTypes.object.isRequired
};

export { Card };
