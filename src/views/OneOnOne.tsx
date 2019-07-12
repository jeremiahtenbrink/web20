import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import { Button, Card, Form, Icon, Row, Select } from "antd";
import { IStudent } from "../types/StudentInterface";
import logger from "../utils/logger";
import {
  subscribeToStudents, subscribe, unsubscribe, subscribeToSprints
} from "../actions/index";
import { ISprint } from "../types/SprintInterface";
import { ILesson } from "../types/LessonInterface";
import { IUser } from "../types/UserInterface";
import moment from 'moment';

const Logger = logger( 'One on One' );

interface IState {
  subscribed?: boolean;
  lessonsLoaded?: boolean;
  sprint?: string | null;
  lessons?: ILesson[] | null;
  selectedLesson?: string;
  
}

class OneOnOne extends Component<IProps, IState> {
  state = {
    subscribed: false,
    lessonsLoaded: false,
    sprint: null,
    lessons: null,
    selectedLesson: '',
  };
  
  componentDidMount(): void {
    this.props.subscribe( "sprints", this.props.subscribeToSprints() );
    if ( this.props.uid ) {
      this.setState( { subscribed: true } );
      this.props.subscribe( "students",
        this.props.subscribeToStudents( this.props.uid ) );
    }
  }
  
  componentDidUpdate( prevProps: Readonly<IProps>, prevState: Readonly<IState>,
                      snapshot?: any ): void {
    if ( this.state.lessonsLoaded && prevProps.lessons !==
      this.props.lessons ) {
      this.setLessons();
    }
    
    if ( !this.state.lessonsLoaded &&
      Object.values( this.props.lessons ).length > 0 ) {
      this.setLessons();
    }
    
    if ( !prevState.subscribed && this.props.uid ) {
      this.setState( { subscribed: true } );
      this.props.subscribe( 'students',
        this.props.subscribeToStudents( this.props.uid ) );
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
  
  componentWillUnmount(): void {
    this.props.unsubscribe( 'students' );
  }
  
  onChangeSelect = ( value: string, name: string ) => {
    debugger;
    this.setState( { [ name ]: value } );
  };
  
  getLessonsForDropDown = (): ILesson[] => {
    
    if ( this.state.sprint !== null ) {
      debugger;
      const lessons = this.state.lessons.filter(
        lesson => {
          debugger;
          return lesson.sprint === this.state.sprint
        } )
      ;
      return lessons;
    }
    return this.state.lessons;
  };
  
  openWindow = ( name ) => {
    let url = "https://airtable.com/shrgktJtyLgBE8pY0?prefill_Project+Manager=" +
      encodeURI(
        `${ this.props.user.firstName } ${ this.props.user.lastName } (${ this.props.user.cohort })` );
    const dateString = moment( new Date() ).subtract( 1, 'day' )
      .format( 'YYYY-MM-DD' );
    url += `&prefill_Daily+Standup=` +
      encodeURI(
        `${ name }  (${ dateString }) ${ this.state.selectedLesson }` );
    window.open( url );
  };
  
  
  render() {
    const { Option } = Select;
    Logger.info( "render", this.state.lessons, "Lessons" );
    return (
      <Row style={ {
        maxWidth: "800px", margin: " 20px auto", marginBottom: "6rem"
      } }>
        
        <Card>
          <div className={ "sprint__top-content" }>
            <h1 className={ "mb-5 mt-5 text-center" }>
              One on One Reports
            </h1>
            <Link to="/">
              <Button type="primary">
                <Icon type="left"/>
                Go Back
              </Button>
            </Link>
            <Form.Item label={ "Sprint" }>
              <Select
                showSearch
                style={ { width: 200 } }
                placeholder="Sprint"
                optionFilterProp="children"
                onChange={ ( value ) => {
                  this.onChangeSelect( value, "sprint" );
                } }
                value={ this.state.sprint }
                filterOption={ ( input,
                                 option ) => typeof option.props.children ===
                "string" ? option.props.children.toLowerCase()
                  .indexOf( input.toLowerCase() ) >= 0 : '' }
              >
                { this.props.sprints &&
                Object.values( this.props.sprints )
                  .filter( sprint => sprint.course === this.props.user.course )
                  .map( sprint => {
                    return <Option key={ sprint.id }
                                   value={ sprint.id }>{ sprint.name }</Option>;
                  } ) }
              </Select>
            </Form.Item>
            
            <Form.Item label={ "Lesson" }>
              <Select
                showSearch
                style={ { width: 200 } }
                placeholder="Lesson"
                optionFilterProp="children"
                onChange={ ( e ) => {
                  this.onChangeSelect( e, "selectedLesson" );
                } }
                value={ this.state.selectedLesson }
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
            
            { this.props.students &&
            Object.values( this.props.students ).map( student => {
              return <h2 onClick={ () => this.openWindow(
                `${ student.firstName.trim() } ${ student.lastName.trim() }` ) }
                         key={ student.id }>{ student.firstName } { student.lastName }</h2>;
            } ) }
          </div>
        </Card>
      </Row>
    );
  }
}

const mstp = state => {
  //Logger.info( "MSTP", state.sprints.lessons, "Lessons" );
  return ( {
    students: state.students.students,
    uid: state.auth.uid,
    sprints: state.sprints.sprints,
    lessons: state.sprints.lessons,
    user: state.auth.user,
  } );
};

interface IProps {
  students: { [ id: string ]: IStudent },
  sprints: { [ id: string ]: ISprint },
  lessons: { [ id: string ]: ILesson },
  user: IUser,
  uid: string,
  subscribeToStudents: typeof subscribeToStudents,
  subscribe: typeof subscribe,
  unsubscribe: typeof unsubscribe,
  subscribeToSprints: typeof subscribeToSprints,
}

export default connect( mstp,
  { subscribeToStudents, subscribe, unsubscribe, subscribeToSprints } )(
  OneOnOne );