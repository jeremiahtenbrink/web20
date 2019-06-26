import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Row, Col, Button, Form, Select, Input, Card, Table, Radio, Icon
} from "antd";
import { Link } from "react-router-dom";
import {
    subscribeToInstructors, subscribeToStudents, subscribe, unsubscribe,
    subscribeToTas, subscribeToSprints, subscribeToCourses
} from "../actions/index";
import "./dailyStandup.scss";
import { IStudent } from "../types/StudentInterface";
import { ITa } from "../types/TASInterface";
import { IUser } from "../types/UserInterface";
import { ILesson } from "../types/LessonInterface";
import { IInstructor } from "../types/InstructorInterface";
import { ISprint } from "../types/SprintInterface";

interface IState {
    students: { [ id: string ]: IStudent } | {};
    subscribedToStudents: boolean;
    loaded: boolean,
    module: string,
    sprintTopic: string,
    wentWell: string,
    concerns: string,
    instructor: string,
    instructionRating: number,
    instructorFeedback: string,
    flexTa: null | ITa,
    flexTaRating: null | number
    flexTaFeedback: string,
    other: string,
    lessons: ILesson[],
    lessonsLoaded: boolean
    sprint: string;
}

class DailyStandup extends Component<IProps, IState> {
    state = {
        students: {},
        subscribedToStudents: false,
        loaded: false,
        module: "Lesson",
        sprintTopic: "Topic",
        wentWell: "",
        concerns: "",
        instructor: "IInstructor",
        instructionRating: 3,
        instructorFeedback: "",
        flexTa: null,
        flexTaRating: null,
        flexTaFeedback: "",
        other: "",
        lessons: [],
        lessonsLoaded: false,
        sprint: ''
    };
    
    componentDidMount() {
        
        if ( this.props.uid ) {
            this.subscribeToAutoFillData();
        }
        
        if ( this.props.students &&
            Object.values( this.props.students ).length > 0 ) {
            this.setStudents( this.props.students );
        }
    }
    
    subscribeToAutoFillData = () => {
        
        this.props.subscribe( "Students",
            this.props.subscribeToStudents( this.props.uid )
        );
        this.props.subscribe( "Instructors",
            this.props.subscribeToInstructors()
        );
        
        this.props.subscribe( "Tas", this.props.subscribeToTas() );
        
        this.props.subscribe( "Courses", this.props.subscribeToCourses() );
        this.props.subscribe( "Sprints", this.props.subscribeToSprints() );
        
        this.setState( { subscribedToStudents: true } );
        
    };
    
    componentWillUnmount() {
        this.props.unsubscribe( "Students" );
        this.props.unsubscribe( "Instructors" );
        this.props.unsubscribe( "Tas" );
        this.props.unsubscribe( "Courses" );
        this.props.unsubscribe( "Sprints" );
    }
    
    componentDidUpdate( prevProps, prevState, snapshot ) {
        
        if ( this.state.lessonsLoaded && prevProps.lessons !==
            this.props.lessons ) {
            this.setLessons();
        }
        
        if ( !this.state.lessonsLoaded &&
            Object.values( this.props.lessons ).length > 0 ) {
            this.setLessons();
        }
        if ( !this.state.subscribedToStudents && this.props.uid ) {
            this.subscribeToAutoFillData();
        }
        
        if ( this.props.students &&
            Object.values( this.props.students ).length >
            0 && !this.state.loaded ) {
            this.setStudents( this.props.students );
        }
    }
    
    setLessons = () => {
        let lessons: ILesson[] = [];
        Object.values( this.props.lessons ).forEach( sprint => {
            Object.values( sprint ).forEach( ( lesson: ILesson ) => {
                if ( lesson.course === this.props.user.course ) {
                    lessons.push( lesson );
                }
            } );
        } );
        this.setState( { lessons, lessonsLoaded: true } );
    };
    
    setStudents = students => {
        // @ts-ignore
        Object.values( students ).forEach( ( student: IStudent ) => {
            student.isPresent = true;
        } );
        this.setState( {
            students, loaded: true,
        } );
    };
    
    onChangeAttendance = id => {
        this.setState( state => {
            state.students[ id ].isPresent = !state.students[ id ].isPresent;
            return {
                students: state.students
            };
        } );
    };
    
    onChange = e => {
        this.setState(
            state => ( { ...state, [ e.target.name ]: e.target.value } ) );
    };
    
    onChangeSelect = ( value, name ) => {
        this.setState( state => ( { ...state, [ name ]: value } ) );
    };
    
    getLessonsForDropDown = (): ILesson[] => {
        let lessons = this.state.lessons;
        if ( this.state.sprint !== "" ) {
            lessons =
                lessons.filter( lesson => lesson.sprint === this.state.sprint );
        }
        return lessons;
    };
    
    getReportLink = () => {
        
        if ( this.props.user ) {
            let url = `https://airtable.com/shripCmauVlvxNrAT?prefill_Project+Manager=${ this.props.user.firstName }+${ this.props.user.lastName }+(${ this.props.user.cohort })&prefill_Sections=${ this.props.user.cohort }`;
            
            if ( this.state.module !== "" ) {
                url += `&prefill_Module=${ encodeURI( this.state.module ) }`;
            }
            
            if ( this.state.students ) {
                
                let afterFirst = false;
                let absentString = "&prefill_Students+(Absent)=";
                
                
                Object.values( this.state.students )
                //@ts-ignore
                    .forEach( ( student: IStudent ) => {
                        if ( !student.isPresent ) {
                            if ( afterFirst ) {
                                absentString += ",";
                            }
                            // @ts-ignore
                            absentString +=
                                `${ student.firstName.trim() }+${ student.lastName.trim() }`;
                            if ( !afterFirst ) {
                                afterFirst = true;
                            }
                        }
                    } );
                
                if ( absentString !== "&prefill_Absent+Students=" ) {
                    url += absentString;
                }
            }
            
            if ( this.state.wentWell !== "" ) {
                url += `&prefill_What+went+well=${ encodeURI(
                    this.state.wentWell ) }`;
            }
            
            if ( this.state.concerns !== "" ) {
                url +=
                    `&prefill_Concerns=${ encodeURI( this.state.concerns ) }`;
            }
            
            if ( this.state.instructor !== "" ) {
                url += `&prefill_Instructor=${ encodeURI(
                    this.state.instructor ) }`;
            }
            
            if ( this.state.instructionRating ) {
                url +=
                    `&prefill_Instruction+Rating=${ this.state.instructionRating }`;
            }
            
            if ( this.state.instructorFeedback !== "" ) {
                url += `&prefill_Instruction+Feedback=${ encodeURI(
                    this.state.instructorFeedback, ) }`;
            }
            
            if ( this.state.flexTa !== null ) {
                let flexTaName = this.props.flexTas[ this.state.flexTa ].firstName +
                    "+" + this.props.flexTas[ this.state.flexTa ].lastName;
                let flexTaCohort = this.props.flexTas[ this.state.flexTa ].cohort;
                url += `&prefill_Who+was+the+Flex+TA?=${ encodeURI(
                    flexTaName ) }+(${ flexTaCohort })`;
            }
            
            if ( this.state.flexTaRating ) {
                url += `&prefill_Flex+TA+Rating=${ this.state.flexTaRating }`;
            }
            
            if ( this.state.flexTaFeedback !== "" ) {
                url += `&prefill_Flex+TA+Feedback=${ encodeURI(
                    this.state.flexTaFeedback, ) }`;
            }
            
            if ( this.state.other !== "" ) {
                url += `&prefill_Other=${ encodeURI( this.state.other ) }`;
            }
            
            return url;
        }
    };
    
    render() {
        
        const { Option } = Select;
        const { TextArea } = Input;
        const RadioGroup = Radio.Group;
        return ( <Row style={ { maxWidth: "800px", margin: "20px auto" } }>
            <Card>
                <Col span={ 24 }>
                    <div className={ "dailyStandUp__topContent" }>
                        <h1>Daily Standup</h1>
                        <Link to="/">
                            <Button type="primary">
                                <Icon type="left"/>
                                Go Back
                            </Button>
                        </Link>
                    </div>
                    {/*
                    //@ts-ignore */ }
                    <Table
                        dataIndex={ "id" }
                        dataSource={ this.state.students &&
                        Object.values( this.state.students )
                            .sort( ( a, b ) => {
                                //@ts-ignore
                                return a.firstName - b.firstName
                            } ) }
                        style={ { marginTop: "30px" } }
                        bordered
                        rowKey={ "id" }
                        loading={ false }
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
                                      render={ ( text: string,
                                                 record: IStudent ) => {
                            
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
                                                  type={ "default" }
                                                  style={ !record.isPresent ?
                                                      { backgroundColor: "#fffb8f" } :
                                                      {} }>
                                                  Not Present
                                              </Button>
                                          </Button.Group> );
                                      } }/>
                    </Table>
                    
                    <Form className={ "dailyStandUp__form" }>
                        <Form.Item label={ "IInstructor" }>
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
                                                 option ) => typeof option.props.children ===
                                "string" ? option.props.children.toLowerCase()
                                    .indexOf( input.toLowerCase() ) >= 0 : '' }
                            >
                                { this.props.instructors &&
                                Object.values( this.props.instructors )
                                    .map( instructor => {
                                        
                                        return <Option key={ instructor.id }
                                                       value={ instructor.name }>{ `${ instructor.name }` }</Option>;
                                    } ) }
                                <Option
                                    value={ "IInstructor" }>Instructor</Option>
                            </Select>
                        </Form.Item>
                        
                        <Form.Item label={ "Sprint" }>
                            <Select
                                showSearch
                                style={ { width: 200 } }
                                placeholder="Sprint"
                                optionFilterProp="children"
                                onChange={ ( e ) => {
                                    this.onChangeSelect( e, "sprint" );
                                } }
                                value={ this.state.sprint }
                                filterOption={ ( input,
                                                 option ) => typeof option.props.children ===
                                "string" ? option.props.children.toLowerCase()
                                    .indexOf( input.toLowerCase() ) >= 0 : '' }
                            >
                                { this.props.sprints &&
                                Object.values( this.props.sprints ).filter(
                                    sprint => sprint.course ===
                                        this.props.user.course )
                                    .sort( ( a, b ) => a.week -
                                        b.week )
                                    .map( ( sprint: ISprint ) => {
                                        return <Option key={ sprint.id }
                                                       value={ sprint.id }>{ `${ sprint.name }` }</Option>;
                                    } ) }
                                <Option value={ "Lesson" }>Lesson</Option>
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
                                                 option ) => typeof option.props.children ===
                                "string" ? option.props.children.toLowerCase()
                                    .indexOf( input.toLowerCase() ) >= 0 : '' }
                            >
                                { this.state.lessons &&
                                this.getLessonsForDropDown()
                                    .map( lesson => {
                                        return <Option key={ lesson.id }
                                                       value={ lesson.name }>{ `${ lesson.name }` }</Option>;
                                    } ) }
                                <Option value={ "Lesson" }>Lesson</Option>
                            </Select>
                        </Form.Item>
                        
                        <Form.Item label={ "IInstructor Rating" }>
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
                                                 option ) => typeof option.props.children ===
                                "string" ? option.props.children.toLowerCase()
                                    .indexOf( input.toLowerCase() ) >= 0 : '' }
                            >{ this.props.flexTas &&
                            Object.values( this.props.flexTas ).map( ta => {
                                
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
                        rel={ "noopener noreferrer" }
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
    lessons: state.sprints.lessons,
    instructors: state.autoFill.instructors,
    flexTas: state.autoFill.tas,
    uid: state.auth.uid,
    sprints: state.sprints.sprints,
} );

interface IProps {
    students: { [ id: string ]: IStudent }
    sprints: { [ id: string ]: ISprint }
    user: IUser;
    lessons: { [ id: string ]: ILesson };
    instructors: { [ id: string ]: IInstructor };
    flexTas: { [ id: string ]: ITa };
    uid: string;
    subscribeToStudents: typeof subscribeToStudents;
    subscribeToInstructors: typeof subscribeToInstructors;
    subscribe: typeof subscribe;
    unsubscribe: typeof unsubscribe;
    subscribeToTas: typeof subscribeToTas;
    subscribeToCourses: typeof subscribeToCourses;
    subscribeToSprints: typeof subscribeToSprints;
}

export default connect( mpts, {
    subscribeToStudents,
    subscribeToInstructors,
    subscribe,
    unsubscribe,
    subscribeToTas,
    subscribeToCourses,
    subscribeToSprints
}, )( DailyStandup );
