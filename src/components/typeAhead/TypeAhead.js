import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import { FormGroup } from "reactstrap";

class TypeAhead extends React.Component{
    state = {
        disabled: false,
        dropup: false,
        flip: false,
        highlightOnlyResult: false,
        minLength: 0,
        open: undefined,
        selectHintOnEnter: false,
    };
    
    render(){
        const {
            disabled, dropup, emptyLabel, flip, highlightOnlyResult, minLength, open, selectHintOnEnter,
        } = this.state;
        
        return ( <>
            <Typeahead
                { ...this.state }
                emptyLabel={ emptyLabel ? "" : undefined }
                labelKey="name"
                options={ props.options }
                placeholder="Choose a state..."
            />
            
        </> );
    }
    
}

export default TypeAhead;