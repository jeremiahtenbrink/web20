import { Modal } from "antd";
import React from "react";
import PropTypes from "prop-types";

const ModalComponent = props => {
    
    return ( <Modal
        title={ props.title }
        visible={ props.modalOpen }
        okText={ props.okText }
        onOk={ props.onOk }
        onCancel={ props.onCancel }>
        { props.children }
    </Modal> );
    
};

ModalComponent.propTypes = {
    title: PropTypes.string,
    modalOpen: PropTypes.bool.isRequired,
    okText: PropTypes.string,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    
};

export default ModalComponent;


