import React, { Component } from "react";
import {
    Row, Col, Form, Input, Button, Select, Radio, Icon, Checkbox
} from "antd";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./sprint.scss";
import { IStudent } from "../types/StudentInterface";
import { ISprints } from "../types/SprintsInterface";
import { IUser } from "../types/UserInterface";

interface IState {
    sprintChallenge: string;
    student: string;
    threeWords: string;
    sprintChallengeRating: number;
    reAttempt: boolean;
    great: string;
    improvements: string;
    questions: string;
    notes: string;
    sprintRating: number;
    generalRating: number;
    completedOneOnOne: boolean;
    postReviewSprintRating: number;
    technicalAbility: number;
    collaborationAbility: number;
    drive: number;
    teachability: number;
    other: string;
    numberArray: number[];
}

class SprintForm extends Component<IProps, IState> {
    
    state = {
        sprintChallenge: "Sprint",
        student: "",
        threeWords: "",
        sprintChallengeRating: 2,
        reAttempt: false,
        great: "",
        improvements: "",
        questions: "",
        notes: "",
        sprintRating: 2,
        generalRating: 2,
        completedOneOnOne: false,
        postReviewSprintRating: 0,
        technicalAbility: 5,
        collaborationAbility: 5,
        drive: 5,
        teachability: 5,
        other: "",
        numberArray: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
    };
    
    onChange = e => {
        // @ts-ignore
        this.setState( { [ e.target.name ]: e.target.value } );
    };
    
    onChangeSelect = ( value, name ) => {
        // @ts-ignore
        this.setState( { [ name ]: value } );
    };
    
    getSubmissionUrl = () => {
        
        let url = "";
        if ( this.props.user ) {
            url =
                `https://airtable.com/shr6wexWV3RM4ITJP?prefill_Project+Manager=${ this.props.user.firstName }+${ this.props.user.lastName }+(${ this.props.user.cohort })`;
        }
        
        if ( this.state.student && this.state.sprintChallenge ) {
            url +=
                `&prefill_Student+Submission=${ this.state.student.trim() }+(${ this.state.sprintChallenge.trim() })`;
        }
        
        if ( this.state.threeWords ) {
            url += `&prefill_3+Words+by+PM=${ encodeURI(
                this.state.threeWords ) }`;
        }
        
        if ( this.state.sprintChallengeRating ) {
            url +=
                `&prefill_Sprint+Challenge+Rating=${ this.state.sprintChallengeRating }`;
        }
        
        if ( this.state.reAttempt ) {
            url += `&prefill_Will+Re-Attempt?=true`;
        } else {
            url += `&prefill_Will+Re-Attempt?=false`;
        }
        
        if ( this.state.great ) {
            url += `&prefill_Great=${ encodeURI( this.state.great ) }`;
        }
        
        if ( this.state.improvements ) {
            url += `&prefill_Requested+Improvements=${ encodeURI(
                this.state.improvements ) }`;
        }
        
        if ( this.state.questions ) {
            url += `&prefill_Questions=${ encodeURI( this.state.questions ) }`;
        }
        
        if ( this.state.notes ) {
            url += `&prefill_General+Notes=${ encodeURI( this.state.notes ) }`;
        }
        
        if ( this.state.sprintRating ) {
            url += `&prefill_Sprint+Rating=${ this.state.sprintRating }`;
        }
        
        if ( this.state.generalRating ) {
            url += `&prefill_General+Rating=${ this.state.generalRating }`;
        }
        
        if ( this.state.completedOneOnOne ) {
            url += `&prefill_Completed+1:1=true`;
        } else {
            url += `&prefill_Completed+1:1=false`;
        }
        
        if ( this.state.postReviewSprintRating !== 0 ) {
            url +=
                `&prefill_Post+Review+Student+Sprint+Rating=${ this.state.postReviewSprintRating }`;
        }
        
        if ( this.state.technicalAbility ) {
            url += `&prefill_Technical+NPS=${ this.state.technicalAbility }`;
        }
        
        if ( this.state.collaborationAbility ) {
            url +=
                `&prefill_Collaboration+NPS=${ this.state.collaborationAbility }`;
        }
        
        if ( this.state.drive ) {
            url += `&prefill_Drive+NPS=${ this.state.drive }`;
        }
        
        if ( this.state.teachability ) {
            url += `&prefill_Teachability+NPS=${ this.state.teachability }`;
        }
        
        if ( this.state.other ) {
            url +=
                `&prefill_Other+(Internal)=${ encodeURI( this.state.other ) }`;
        }
        
        return url;
    };
    
    render() {
        const Option = Select.Option;
        const RadioGroup = Radio.Group;
        const TextArea = Input.TextArea;
        return ( <Row style={ { maxWidth: "800px", margin: "20px auto" } }>
            <Col span={ 24 }>
                
                <div className={ "sprint__top-content" }>
                    <h1 className={ "mb-5 mt-5 text-center" }>
                        Sprint Challenge Report
                    </h1>
                    <Link to="/">
                        <Button type="primary">
                            <Icon type="left"/>
                            Go Back
                        </Button>
                    </Link>
                
                </div>
                <Form>
                    <Form.Item label={ "Sprint Challenge" }>
                        <Select
                            showSearch
                            style={ { width: 200 } }
                            placeholder="Sprint"
                            optionFilterProp="children"
                            onChange={ ( e ) => {
                                this.onChangeSelect( e, "sprintChallenge" );
                            } }
                            value={ this.state.sprintChallenge }
                            filterOption={ ( input,
                                             option ) => typeof option.props.children ===
                            "string" ? option.props.children.toLowerCase()
                                .indexOf( input.toLowerCase() ) >= 0 : '' }
                        >
                            { this.props.sprints &&
                            Object.values( this.props.sprints )
                                .sort( ( a, b ) => a.week - b.week )
                                .map( sprint => {
                                    
                                    return <Option key={ sprint.id }
                                                   value={ sprint.name }>{ `${ sprint.name }` }</Option>;
                                } ) }
                            <Option
                                value={ "Sprint" }>Sprint</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label={ "Student" }>
                        <Select
                            showSearch
                            style={ { width: 200 } }
                            placeholder="Student"
                            optionFilterProp="children"
                            onChange={ ( e ) => {
                                
                                this.onChangeSelect( e, "student" );
                            } }
                            value={ this.state.student }
                            filterOption={ ( input,
                                             option ) => typeof option.props.children ===
                            "string" ? option.props.children.toLowerCase()
                                .indexOf( input.toLowerCase() ) >= 0 : '' }
                        >
                            { this.props.students &&
                            Object.values( this.props.students )
                                .map( ( student ) => {
                                    
                                    return <Option key={ student.id }
                                                   value={ `${ student.firstName.trim() }+${ student.lastName.trim() }` }>{ `${ student.firstName } ${ student.lastName }` }</Option>;
                                } ) }
                            <Option
                                value={ "Student" }>Sprint</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label={ "3 words to describe the student." }>
                        <Input type={ "text" }
                               value={ this.state.threeWords }
                               onChange={ this.onChange }
                               name={ "threeWords" }
                        />
                    </Form.Item>
                    <Form.Item label={ "Sprint Challenge Rating" }>
                        <RadioGroup name={ "sprintChallengeRating" }
                                    onChange={ this.onChange }
                                    value={ this.state.sprintChallengeRating }>
                            <Radio value={ 0 }>N/A</Radio>
                            <Radio value={ 1 }>
                                <Icon type="star" theme={ "twoTone" }
                                      twoToneColor={ "#135200" }/>
                            </Radio>
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
                    <Form.Item>
                        <Checkbox onChange={ this.onChange }
                                  checked={ this.state.reAttempt }>
                            Re Attempt
                        </Checkbox>
                    </Form.Item>
                    <Form.Item label={ "What did the student do well." }>
                    <TextArea
                        rows={ 4 }
                        placeholder={ "Did well..." }
                        value={ this.state.great }
                        onChange={ this.onChange }
                        name={ "great" }
                    />
                    </Form.Item>
                    <Form.Item
                        label={ "What can the student improve upon." }>
                    <TextArea
                        rows={ 4 }
                        placeholder={ "Improve..." }
                        value={ this.state.improvements }
                        onChange={ this.onChange }
                        name={ "improvements" }
                    />
                    </Form.Item>
                    <Form.Item
                        label={ "Any questions you have for the student." }>
                    <TextArea
                        placeholder={ "Questions..." }
                        value={ this.state.questions }
                        onChange={ this.onChange }
                        name={ "questions" }
                        rows={ 4 }
                    />
                    </Form.Item>
                    <Form.Item label={ "Any notes." }>
                    <TextArea
                        placeholder={ "..." }
                        value={ this.state.notes }
                        onChange={ this.onChange }
                        name={ "notes" }
                        rows={ 4 }
                    />
                    </Form.Item>
                    
                    <Form.Item label={ "Sprint Rating" }>
                        <RadioGroup name={ "sprintRating" }
                                    onChange={ this.onChange }
                                    value={ this.state.sprintRating }>
                            <Radio value={ 1 }>
                                <Icon type="star" theme={ "twoTone" }
                                      twoToneColor={ "#135200" }/>
                            </Radio>
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
                    
                    <Form.Item label={ "General Rating" }>
                        <RadioGroup name={ "generalRating" }
                                    onChange={ this.onChange }
                                    value={ this.state.generalRating }>
                            <Radio value={ 1 }>
                                <Icon type="star" theme={ "twoTone" }
                                      twoToneColor={ "#135200" }/>
                            </Radio>
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
                    <Form.Item label={ "Completed 1 on 1" }>
                        <Checkbox
                            checked={ this.state.completedOneOnOne }
                            onChange={ () => this.setState(
                                state => ( { completedOneOnOne: !state.completedOneOnOne } ) ) }
                        />
                    </Form.Item>
                    
                    <Form.Item label={ "Post Review Rating" }>
                        <RadioGroup name={ "postReviewSprintRating" }
                                    onChange={ this.onChange }
                                    value={ this.state.postReviewSprintRating }>
                            <Radio value={ 0 }> N/A </Radio>
                            <Radio value={ 1 }>
                                <Icon type="star" theme={ "twoTone" }
                                      twoToneColor={ "#135200" }/>
                            </Radio>
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
                    <Form.Item label={ "Students Technical Ability" }>
                        <Select
                            showSearch
                            style={ { width: 200 } }
                            placeholder="Teachability"
                            optionFilterProp="children"
                            onChange={ ( e ) => {
                                this.onChangeSelect( e, "technicalAbility" );
                            } }
                            value={ this.state.technicalAbility }
                            filterOption={ ( input,
                                             option ) => typeof option.props.children ===
                            "string" ? option.props.children.toLowerCase()
                                .indexOf( input.toLowerCase() ) >= 0 : '' }
                        >
                            { this.state.numberArray.map( number => {
                                
                                return <Option key={ number }
                                               value={ number }>{ number }</Option>;
                            } ) }
                        </Select>
                    </Form.Item>
                    <Form.Item label={ "Collaboration Ability" }>
                        <Select
                            showSearch
                            style={ { width: 200 } }
                            placeholder="Collaboration Ability"
                            optionFilterProp="children"
                            onChange={ ( e ) => {
                                this.onChangeSelect( e,
                                    "collaborationAbility"
                                );
                            } }
                            value={ this.state.collaborationAbility }
                            filterOption={ ( input,
                                             option ) => typeof option.props.children ===
                            "string" ? option.props.children.toLowerCase()
                                .indexOf( input.toLowerCase() ) >= 0 : '' }
                        >
                            { this.state.numberArray.map( number => {
                                
                                return <Option key={ number }
                                               value={ number }>{ number }</Option>;
                            } ) }
                        </Select>
                    </Form.Item>
                    <Form.Item label={ "Students Drive" }>
                        <Select
                            showSearch
                            style={ { width: 200 } }
                            placeholder="Student Drive"
                            optionFilterProp="children"
                            onChange={ ( e ) => {
                                this.onChangeSelect( e, "drive" );
                            } }
                            value={ this.state.drive }
                            filterOption={ ( input,
                                             option ) => typeof option.props.children ===
                            "string" ? option.props.children.toLowerCase()
                                .indexOf( input.toLowerCase() ) >= 0 : '' }
                        >
                            
                            { this.state.numberArray.map( number => {
                                
                                return <Option key={ number }
                                               value={ number }>{ number }</Option>;
                            } ) }
                        </Select>
                    </Form.Item>
                    <Form.Item label={ "Students Teachability" }>
                        <Select
                            showSearch
                            style={ { width: 200 } }
                            placeholder="Student Teachability"
                            optionFilterProp="children"
                            onChange={ ( e ) => {
                                this.onChangeSelect( e, "teachability" );
                            } }
                            value={ this.state.teachability }
                            filterOption={ ( input,
                                             option ) => typeof option.props.children ===
                            "string" ? option.props.children.toLowerCase()
                                .indexOf( input.toLowerCase() ) >= 0 : '' }
                        >
                            { this.state.numberArray.map( number => {
                                
                                return <Option key={ number }
                                               value={ number }>{ number }</Option>;
                            } ) }
                        </Select>
                    </Form.Item>
                    <Form.Item label={ "Anything else we should know about." }>
                    <TextArea
                        rows={ 4 }
                        placeholder={ "..." }
                        value={ this.state.other }
                        onChange={ this.onChange }
                        name={ "other" }
                    />
                    </Form.Item>
                </Form>
                <div className="d-flex justify-content-center">
                    <a className="btn btn-success mb-5 mt-4"
                       target="_blank"
                       rel={ "noopener noreferrer" }
                       href={ this.getSubmissionUrl() }
                    >
                        <Button>
                            <Icon type={ "download" }/>
                            Submit Sprint Retrospect
                        </Button>
                    </a>
                </div>
            
            </Col>
        </Row> );
    }
}

const mstp = state => {
    
    return {
        students: state.students.students,
        user: state.auth.user,
        sprints: state.sprints.sprints,
    };
};

interface IProps {
    students: { [ id: string ]: IStudent };
    user: IUser;
    sprints: ISprints;
}

export default connect( mstp )( SprintForm );