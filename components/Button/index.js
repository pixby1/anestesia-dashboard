import React from 'react';
import PropTypes from 'prop-types';
import { ButttonSucces } from './Succes';
import { ButtonError } from './Error';
import { ButtonDefault } from './Default';

const Button = ({ type, children, action }) => {
  const checkButton = () => {
    if (type === 'succes') {
      return <ButttonSucces action={action}>{children}</ButttonSucces>;
    }
    if (type === 'error') {
      return <ButtonError action={action}>{children}</ButtonError>;
    }
    if (type === 'default') {
      return <ButtonDefault action={action}>{children}</ButtonDefault>;
    }
  };
  return <div type={type}>{checkButton()}</div>;
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired
};

export { Button };
