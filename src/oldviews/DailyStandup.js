import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Row, Col, Button, Form, Select, Input, Card, Table, Radio, Icon
} from "antd";
import { Link } from "react-router-dom";

class DailyStandup extends Component{
    state = {
        students: null,
        loaded: false,
        module: [],
        wentWell: "",
        concerns: "",
        instructor: "Instructor",
        instructionRating: 3,
        instructorFeedback: "",
        flexTa: "",
        flexTaRating: 3,
        flexTaFeedback: "",
        other: "",
    };
    
    componentDidMount(){
        if( this.props.students && !this.state.loaded ){
            let keys = Object.keys( this.props.students );
            for( let i = 0; i < keys.length; i++ ){
                this.props.students[ keys[ i ] ].isPresent = true;
            }
            this.setState( {
                students: this.props.students, loaded: true,
            } );
        }
        
        this.props.getSections();
        this.props.getInstructors();
    }
    
    componentWillUpdate( nextProps, nextState, nextContext ){
        if( nextProps.students && !nextState.loaded ){
            let keys = Object.keys( nextProps.students );
            for( let i = 0; i < keys.length; i++ ){
                nextProps.students[ keys[ i ] ].isPresent = true;
            }
            this.setState( {
                students: nextProps.students, loaded: true,
            } );
        }
    }
    
    onChangeAttendance = id => {
        
        this.setState( state => {
            let student = state.students.filter( student => student.id === id );
            student[ 0 ].isPresent = !student[ 0 ].isPresent;
            return { students: [ ...state.students ] };
        } );
    };
    
    onChange = e => {
        this.setState( { [ e.target.name ]: e.target.value } );
    };
    
    onChangeSelect = ( value, name ) => {
        
        this.setState( { [ name ]: value } );
    };
    
    getReportLink = () => {
        if( this.props.user ){
            let url = `https://airtable.com/shripCmauVlvxNrAT?prefill_Project+Manager=${ this.props.user.firstName }+${ this.props.user.lastName }+(${ this.props.user.cohort })&prefill_Sections=${ this.props.user.cohort }`;
            
            if( this.state.module !== "" ){
                url += `&prefill_Module=${ encodeURI( this.state.module[ 0 ] ) }`;
            }
            
            if( this.state.students ){
                let afterFirst = false;
                let keys = Object.keys( this.state.students );
                let absentString = "&prefill_Students+(Absent)=";
                for( let i = 0; i < keys.length; i++ ){
                    if( !this.state.students[ keys[ i ] ].isPresent ){
                        if( afterFirst ){
                            absentString += ",";
                        }
                        absentString += `${ this.state.students[ keys[ i ] ].firstName.trim() }+${ this.state.students[ keys[ i ] ].lastName.trim() }`;
                        if( !afterFirst ){
                            afterFirst = true;
                        }
                    }
                }
                
                if( absentString !== "&prefill_Absent+Students=" ){
                    url += absentString;
                }
            }
            
            if( this.state.wentWell !== "" ){
                url += `&prefill_What+went+well=${ encodeURI( this.state.wentWell ) }`;
            }
            
            if( this.state.concerns !== "" ){
                url += `&prefill_Concerns=${ encodeURI( this.state.concerns ) }`;
            }
            
            if( this.state.instructor !== "" ){
                url += `&prefill_Instructor=${ encodeURI( this.state.instructor ) }`;
            }
            
            if( this.state.instructionRating ){
                url += `&prefill_Instruction+Rating=${ this.state.instructionRating }`;
            }
            
            if( this.state.instructorFeedback !== "" ){
                url += `&prefill_Instruction+Feedback=${ encodeURI( this.state.instructorFeedback, ) }`;
            }
            
            if( this.state.flexTa !== "" ){
                url += `&prefill_Who+was+the+Flex+TA?=${ encodeURI( this.state.flexTa ) }`;
            }
            
            if( this.state.flexTaRating ){
                url += `&prefill_Flex+TA+Rating=${ this.state.flexTaRating }`;
            }
            
            if( this.state.flexTaFeedback !== "" ){
                url += `&prefill_Flex+TA+Feedback=${ encodeURI( this.state.flexTaFeedback, ) }`;
            }
            
            if( this.state.other !== "" ){
                url += `&prefill_Other=${ encodeURI( this.state.other ) }`;
            }
            
            return url;
        }
    };
    
    render(){
        
        const Option = Select.Option;
        const TextArea = Input;
        const RadioGroup = Radio.Group;
        return ( <Row style={ { maxWidth: "800px", margin: "20px auto" } }>
            <Card>
                <Col span={ 24 }>
                    <Link to="/">
                        <Button className="my-3">Back</Button>
                    </Link>
                    <h1>Daily Standup</h1>
                    
                    <Table
                        dataSource={ this.state.students }
                        style={ { marginTop: "30px" } }
                        bordered
                        loading={ this.props.isLoading }
                        pagination={ false }>
                        <Table.Column
                            title="First Name"
                            dataIndex="firstName"
                            key="firstName"
                        />
                        <Table.Column
                            title="Last Name"
                            dataIndex="lastName"
                            key="lastName"
                        />
                        <Table.Column title="Attendance"
                                      key="attendance"
                                      render={ ( text, record ) => {
                            
                                          return ( <Button.Group
                                              size={ "large" }>
                                              <Button
                                                  onClick={ () => this.onChangeAttendance(
                                                      record.id ) }
                                                  style={ record.isPresent ?
                                                      { backgroundColor: "#91d5ff" } :
                                                      {} }>
                                                  Present
                                              </Button>
                                              <Button
                                                  onClick={ () => this.onChangeAttendance(
                                                      record.id ) }
                                                  type={ "normal" }
                                                  style={ !record.isPresent ?
                                                      { backgroundColor: "#fffb8f" } :
                                                      {} }>
                                                  Not Present
                                              </Button>
                                          </Button.Group> );
                                      } }/>
                    </Table>
                    
                    <Form>
                        <Select
                            showSearch
                            style={ { width: 200 } }
                            placeholder="Instructor"
                            optionFilterProp="children"
                            onChange={ ( e ) => {
                                this.onChangeSelect( e, "instructor" );
                            } }
                            value={ this.state.instructor }
                            filterOption={ ( input,
                                option ) => option.props.children.toLowerCase().
                                indexOf( input.toLowerCase() ) >= 0 }
                        >
                            { this.props.instructors &&
                            this.props.instructors.map( instructor => {
                                
                                return <Option
                                    value={ instructor }>{ `${ instructor }` }</Option>;
                            } ) }
                            <Option value={ "Instructor" }>Instructor</Option>
                        </Select>
                        
                        <Select
                            showSearch
                            style={ { width: 200 } }
                            placeholder="Lesson"
                            optionFilterProp="children"
                            onChange={ ( e ) => {
                                this.onChangeSelect( e, "module" );
                            } }
                            value={ this.state.module }
                            filterOption={ ( input,
                                option ) => option.props.children.toLowerCase().
                                indexOf( input.toLowerCase() ) >= 0 }
                        >
                            { this.props.lessons &&
                            this.props.lessons.map( lesson => {
                                
                                return <Option
                                    value={ lesson }>{ `${ lesson }` }</Option>;
                            } ) }
                            <Option value={ "Lesson" }>Lesson</Option>
                        </Select>
                        <RadioGroup name={ "instructionRating" }
                                    onChange={ this.onChange }
                                    value={ this.state.instructionRating }>
                            <Radio value={ 1 }><Icon type="star"
                                                     theme={ "twoTone" }
                                                     twoToneColor={ "#135200" }/></Radio>
                            <Radio value={ 2 }>
                                <Icon type="star" theme={ "twoTone" }
                                      twoToneColor={ "#135200" }/>
                                <Icon type="star" theme={ "twoTone" }
                                      twoToneColor={ "#135200" }/>
                            </Radio>
                            <Radio value={ 3 }>
                                <Icon type="star" theme={ "twoTone" }
                                      twoToneColor={ "#135200" }/>
                                <Icon type="star" theme={ "twoTone" }
                                      twoToneColor={ "#135200" }/>
                                <Icon type="star" theme={ "twoTone" }
                                      twoToneColor={ "#135200" }/>
                            </Radio>
                        </RadioGroup>
                        <TextArea
                            placeholder="What went well today?"
                            name={ "wentWell" }
                            onChange={ this.onChange }
                            autosize/>
                        
                        <TextArea
                            placeholder="What could have gone better?"
                            name={ "concerns" }
                            onChange={ this.onChange }
                            autosize/>
                        
                        <TextArea
                            placeholder="Instructor Feedback"
                            name={ "instructorFeedback" }
                            onChange={ this.onChange }
                            autosize/>
                        
                        <Select
                            showSearch
                            style={ { width: 200 } }
                            placeholder="Flex Ta"
                            optionFilterProp="children"
                            onChange={ ( e ) => {
                                this.onChangeSelect( e, "flexTa" );
                            } }
                            value={ this.state.flexTa }
                            filterOption={ ( input,
                                option ) => option.props.children.toLowerCase().
                                indexOf( input.toLowerCase() ) >= 0 }
                        >
                            <Option value={ "Flex Ta" }>Flex Ta</Option>
                        </Select>
                    
                    
                    </Form>
                    
                    <a
                        className="btn btn-success mb-3"
                        target="_blank"
                        href={ this.getReportLink() }>
                        Submit Standup
                    </a>
                </Col>
            </Card>
        </Row> );
    }
}

const mpts = state => ( {
    students: state.students.students,
    user: state.auth.user,
    lessons: state.autoFill.lessons,
    instructors: state.autoFill.instructors,
} );

export default connect( mpts,
    {  },
)(
    DailyStandup );
