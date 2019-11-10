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
        src="https://2.bp.blogspot.com/_M4wqSdE62l8/TD-V3gVqBSI/AAAAAAAABPY/SU2yHl3fhLY/s1600/ModoSennin.jpg"
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
                  <Text>edad: {user.age} años</Text>
                  <Text>telefono: {user.phone}</Text>
                  <Text>fecha de nacimiento: {user.birthday}</Text>
                  <Text>genero: {user.gender}</Text>
                  <Text>nacionalidad: {user.nationality}</Text>
                  <Text>direccion: {user.address}</Text>
                  <Text>especialidad: {user.specialty}</Text>
                  <Text>sub-espacialidad: {user.subSpecialty}</Text>
                  <Text>residente: {user.resident}</Text>
                  <Text>sociedad: {user.society}</Text>
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
