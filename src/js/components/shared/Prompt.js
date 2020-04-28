/*eslint-disable react/no-multi-comp*/
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import Modal from "./Modal";

const Prompt = ({ text, confirm, children }) => {
  const handleYes = (e) => {
    confirm(e);
    close();
  };
  const footer = (close) => (<div>
    <Button onClick={close}>No</Button>
    <Button bsStyle="primary" onClick={handleYes}>Yes</Button>
  </div>);
  return (
    <Modal
      title="Are you sure?"
      trigger={children}
      footer={footer}
    >
      {text}
    </Modal>
  );
};

Prompt.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.node.isRequired,
  confirm: PropTypes.func.isRequired
};

export default Prompt;
