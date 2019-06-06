import React, { Component } from "react";
import { Input, Form } from "antd";
import PropTypes from "prop-types";

const InputComponent = ( props ) => {
    
    const nameArray = props.name.split( " " );
    let first = true;
    let variableName = "";
    for( let i = 0; i < nameArray.length; i++ ){
        if( first ){
            variableName = nameArray[ i ].toLowerCase();
            first = false;
        }else{
            variableName += nameArray[ i ].charAt( 0 ).toUpperCase() +
                nameArray[ i ].slice( 1 );
        }
    }
    
    return ( <Form.Item label={ props.name }>
        <Input
            style={ { width: "100%" } }
            value={ props.value }
            onChange={ e => props.onChange( variableName, e.target.value ) }
            required={ props.required ? props.required : false }
        />
    </Form.Item> );
};

InputComponent.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    required: PropTypes.bool,
    value: PropTypes.oneOfType( [
        PropTypes.string, PropTypes.number
    ] ),
};

export default InputComponent;