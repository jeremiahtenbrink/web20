import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Row, Col, Button, Form, Select, Input, Card, Table, Radio, Icon
} from "antd";
import { Link } from "react-router-dom";
import "./dailyStandup.scss";

class DailyStandup extends Component{
    state = {
        students: null,
        loaded: false,
        module: "Lesson",
        wentWell: "",
        concerns: "",
        instructor: "Instructor",
        instructionRating: 3,
        instructorFeedback: "",
        flexTa: null,
        flexTaRating: null,
        flexTaFeedback: "",
        other: "",
    };
    
    componentDidMount(){
        if( this.props.students && this.props.students.length > 0 ){
            this.setStudents( this.props.students );
        }
    }
    
    componentWillUpdate( nextProps, nextState, nextContext ){
        debugger;
        if( nextProps.students && nextProps.students.length > 0 &&
            !nextState.loaded ){
            this.setStudents( nextProps.students );
        }
    }
    
    setStudents = students => {
        for( let i = 0; i < students.length; i++ ){
            students[ i ].isPresent = false;
        }
        this.setState( {
            students: students, loaded: true,
        } );
    };
    
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
        debugger;
        if( this.props.user ){
            let url = `https://airtable.com/shripCmauVlvxNrAT?prefill_Project+Manager=${ this.props.user.firstName }+${ this.props.user.lastName }+(${ this.props.user.cohort })&prefill_Sections=${ this.props.user.cohort }`;
            
            if( this.state.module !== "" ){
                url += `&prefill_Module=${ encodeURI( this.state.module ) }`;
            }
            
            if( this.state.students ){
                debugger;
                let afterFirst = false;
                let absentString = "&prefill_Students+(Absent)=";
                for( let i = 0; i < this.state.students.length; i++ ){
                    if( !this.state.students[ i ].isPresent ){
                        if( afterFirst ){
                            absentString += ",";
                        }
                        absentString += `${ this.state.students[ i ].firstName.trim() }+${ this.state.students[ i ].lastName.trim() }`;
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
            
            if( this.state.flexTa !== null ){
                let flexTaName = "";
                let flexTaCohort = "";
                for( let i = 0; i < this.props.flexTas.length; i++ ){
                    if( this.props.flexTas[ i ].id === this.state.flexTa ){
                        flexTaName = this.props.flexTas[ i ].firstName + " " +
                            this.props.flexTas[ i ].lastName;
                        flexTaCohort = this.props.flexTas[ i ].cohort;
                        break;
                    }
                }
                url += `&prefill_Who+was+the+Flex+TA?=${ encodeURI( flexTaName ) }+(${ flexTaCohort })`;
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
        
        const { Option } = Select;
        const { TextArea } = Input;
        const RadioGroup = Radio.Group;
        return ( <Row style={ { maxWidth: "800px", margin: "20px auto" } }>
            <Card>
                <Col span={ 24 }>
                    <div className={ "dailyStandUp__topContent" }>
                        <Link to="/">
                            <Button type="primary">
                                <Icon type="left"/>
                                Go Back
                            </Button>
                        </Link>
                        <h1>Daily Standup</h1>
                    </div>
                    
                    <Table
                        dataIndex={ "id" }
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
                    
                    <Form className={ "dailyStandUp__form" }>
                        <Form.Item label={ "Instructor" }>
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
                                    option ) => option.props.children.toLowerCase()
                                    .indexOf( input.toLowerCase() ) >= 0 }
                            >
                                { this.props.instructors &&
                                this.props.instructors.map( instructor => {
                                    
                                    return <Option key={ instructor.id }
                                                   value={ instructor.name }>{ `${ instructor.name }` }</Option>;
                                } ) }
                                <Option
                                    value={ "Instructor" }>Instructor</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label={ "Lesson" }>
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
                                    option ) => option.props.children.toLowerCase()
                                    .indexOf( input.toLowerCase() ) >= 0 }
                            >
                                { this.props.lessons &&
                                this.props.lessons.map( lesson => {
                                    
                                    return <Option key={ lesson.id }
                                                   value={ lesson.name }>{ `${ lesson.name }` }</Option>;
                                } ) }
                                <Option value={ "Lesson" }>Lesson</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label={ "Instructor Rating" }>
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
                        </Form.Item>
                        <Form.Item label={ "What went well today?" }>
                        <TextArea
                            autosize={ { minRows: 4, maxRows: 6 } }
                            placeholder="What went well today?"
                            name={ "wentWell" }
                            onChange={ this.onChange }
                        />
                        </Form.Item>
                        <Form.Item label={ "What could have gone better?" }>
                            <TextArea
                                autosize={ { minRows: 4, maxRows: 6 } }
                                placeholder="What could have gone better?"
                                name={ "concerns" }
                                onChange={ this.onChange }
                            />
                        </Form.Item>
                        <Form.Item label={ "Feedback for the instructor." }>
                            <TextArea
                                autosize={ { minRows: 4, maxRows: 6 } }
                                placeholder="Instructor Feedback"
                                name={ "instructorFeedback" }
                                onChange={ this.onChange }
                            />
                        </Form.Item>
                        
                        <Form.Item label={ "Flex TA" }>
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
                                    option ) => option.props.children.toLowerCase()
                                    .indexOf( input.toLowerCase() ) >= 0 }
                            >{ this.props.flexTas &&
                            this.props.flexTas.map( ta => {
                                
                                return <Option key={ ta.id }
                                               value={ `${ ta.id }` }>{ `${ ta.firstName } ${ ta.lastName }` }</Option>;
                            } ) }
                                <Option value={ "Flex Ta" }>Flex Ta</Option>
                            </Select>
                        </Form.Item>
                        <Form.Item label={ "Flex TA Rating" }>
                            <RadioGroup name={ "flexTaRating" }
                                        onChange={ this.onChange }
                                        value={ this.state.flexTaRating }>
                                <Radio value={ 0 }>N/A</Radio>
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
                        </Form.Item>
                        
                        <Form.Item label={ "Flex TA Feedback" }>
                            <TextArea
                                autosize={ { minRows: 4, maxRows: 6 } }
                                placeholder="Flex TA Feedback"
                                name={ "flexTaFeedback" }
                                onChange={ this.onChange }
                            />
                        </Form.Item>
                        <Form.Item
                            label={ "Is there anything else we should know\n" +
                            "about?" }>
                            <TextArea
                                autosize={ { minRows: 4, maxRows: 6 } }
                                placeholder="Anything Else We Should Know...."
                                name={ "other" }
                                onChange={ this.onChange }
                            />
                        </Form.Item>
                    
                    </Form>
                    
                    <a
                        className="btn btn-success mb-3"
                        target="_blank"
                        href={ this.getReportLink() }>
                        <Button type="primary" icon="download"
                                size={ "large" }>
                            Submit
                        </Button>
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
    flexTas: state.autoFill.tas,
} );

export default connect( mpts, {}, )( DailyStandup );
