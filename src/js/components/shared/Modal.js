import React from 'react';
import PropTypes from 'prop-types';
import ModalBase from 'react-bootstrap/lib/Modal';

class Modal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleToggle = this.handleToggle.bind(this);
    this.state = {
      open: false
    };
  }

  handleToggle() {
    this.setState(({ open }) => ({ open: !open }));
  }

  renderTrigger() {
    const { trigger } = this.props;
    if (!trigger) {
      return null;
    }
    const triggerProps = { onClick: this.handleToggle };

    if (typeof trigger === 'function')
      return React.cloneElement(trigger(this.state.isOpen), triggerProps);

    return React.cloneElement(trigger, triggerProps);
  }

  render() {
    const { title, children, footer } = this.props;
    const { open } = this.state;
    return (
      <div>
        <ModalBase show={open} onHide={this.handleToggle}>
          {title && <ModalBase.Header closeButton>
            <ModalBase.Title>{title}</ModalBase.Title>
          </ModalBase.Header>}
          <ModalBase.Body>
            {typeof children === 'function' ? children(this.handleToggle) : children}
          </ModalBase.Body>
          {footer && <ModalBase.Footer>
            {typeof footer === 'function' ? footer(this.handleToggle) : footer}
          </ModalBase.Footer>}
        </ModalBase>
        {this.renderTrigger()}
      </div>
    );
  }
}

Modal.propTypes = {
  title: PropTypes.node,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  trigger: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  footer: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

Modal.defaultProps = {
  title: undefined,
  children: PropTypes.node.isRequired,
  footer: undefined,
};

export default Modal;
