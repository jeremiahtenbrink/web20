import React, { useState } from "react";
import { Col, Skeleton, Input, Rate, AutoComplete, Form } from "antd";

interface IProps {
    type: string;
    title: string;
    desc?: string;
    required?: boolean;
    isLoading?: boolean;
    value: any;
    data?: [];
    onChange: ( value: any ) => any;
    name: string;
}

const MakeInput = ( {
                        type, title, desc, required, isLoading, value, data, onChange, name
                    }: IProps ) => {
    let [ valStatus, setStatus ] = useState( "" );
    const validate = type => {
        if ( required ) {
            if ( type === "url" ) {
                var pattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
                if ( pattern.test( value ) ) {
                    setStatus( "success" );
                } else {
                    setStatus( "error" );
                }
            } else {
                if ( value !== "" ) {
                    setStatus( "success" );
                } else {
                    setStatus( "error" );
                }
            }
        }
    };
    
    if ( type === "rate" && !isLoading ) {
        return ( <Col xs={ 24 } style={ { margin: "20px 0" } }>
            <h3>
                { required &&
                <span style={ { color: "#f5222d" } }>*</span> } { title }
            </h3>
            <p>{ desc }</p>
            {/*
            //@ts-ignore */ }
            <Rate
                count={ 3 }
                allowClear={ false }
                value={ value }
                onChange={ onChange }
                name={ name }
            />
        </Col> );
    }
    if ( type === "input" && !isLoading ) {
        return ( <Col xs={ 24 } style={ { margin: "20px 0" } }>
            <h3>
                { required &&
                <span style={ { color: "#f5222d" } }>*</span> } { title }
            </h3>
            <p>{ desc }</p>
            <Form.Item
                validateStatus={ valStatus === "error" ? "error" :
                    valStatus === "success" ? "success" : "" }
                help={ valStatus === "error" ? "Invalid input" : "" }
                hasFeedback
            >
                <Input
                    style={ { width: "100%" } }
                    value={ value }
                    onChange={ onChange }
                    name={ name }
                    onBlur={ () => validate( "input" ) }
                />
            </Form.Item>
        </Col> );
    }
    if ( type === "textarea" && !isLoading ) {
        return ( <Col xs={ 24 } style={ { margin: "20px 0" } }>
            <h3>
                { required &&
                <span style={ { color: "#f5222d" } }>*</span> } { title }
            </h3>
            <p>{ desc }</p>
            <Form.Item
                validateStatus={ valStatus === "error" ? "error" :
                    valStatus === "success" ? "success" : "" }
                help={ valStatus === "error" ? "Add more text" : "" }
                hasFeedback
            >
                <Input.TextArea
                    style={ { width: "100%" } }
                    value={ value }
                    autosize={ { minRows: 2, maxRows: 6 } }
                    onChange={ onChange }
                    onBlur={ () => validate( "text" ) }
                    name={ name }
                />
            </Form.Item>
        </Col> );
    }
    if ( type === "suggest" && !isLoading ) {
        return ( <Col xs={ 24 } style={ { margin: "20px 0" } }>
            <h3>
                { required &&
                <span style={ { color: "#f5222d" } }>*</span> } { title }
            </h3>
            <p>{ desc }</p>
            <Form.Item
                validateStatus={ valStatus === "error" ? "error" :
                    valStatus === "success" ? "success" : "" }
                help={ valStatus === "error" ? "Select Something" : "" }
                hasFeedback
            >
                <AutoComplete
                    value={ value }
                    dataSource={ data }
                    style={ { width: "100%" } }
                    onChange={ onChange }
                    onBlur={ () => validate( "text" ) }
                    filterOption={ ( inputValue,
                                     option ) => typeof option.props.children ===
                    "string" ? option.props.children
                        .toUpperCase()
                        .indexOf( inputValue.toUpperCase() ) !== -1 : '' }
                />
            </Form.Item>
        </Col> );
    }
    if ( type === "disabled" && !isLoading ) {
        return ( <Col xs={ 24 } style={ { margin: "20px 0" } }>
            <h3>
                { required &&
                <span style={ { color: "#f5222d" } }>*</span> } { title }
            </h3>
            <p>{ desc }</p>
            <Input disabled value={ value } style={ { width: "100%" } }/>
        </Col> );
    }
    return ( <Col xs={ 24 }>
        <Skeleton active/>
    </Col> );
};

export default MakeInput;