import React from 'react';
import {connect} from 'react-redux';
import {
  Layout,
  Row,
  Col,
  Card,
  Icon,
  Skeleton,
  Avatar,
  Table,
  Divider,
  Button,
} from 'antd';
import axios from 'axios';
import {getStudents, logout} from '../actions';
import {Link} from 'react-router-dom';

import LambdaLogo from '../assets/logo.png';
import AttendanceImage from '../assets/attendance.jpg';
import Standup from '../assets/standup.jpg';

class Dashboard extends React.Component {
  state = {
    joke: '',
  };

  componentDidMount() {
    this.getJoke();
  }

  getJoke = () => {
    axios
      .get('https://icanhazdadjoke.com/', {
        headers: {Accept: 'application/json'},
      })
      .then(joke => this.setState({joke: joke.data.joke}))
      .catch();
  };

  render() {
    return (
      <div style={{maxWidth: '800px', margin: '20px auto'}}>
        <Card
          actions={[
            <Icon type="reload" onClick={this.getJoke} />,
            <Icon
              type="usergroup-add"
              onClick={() => this.props.history.push('/students')}
            />,
            <Icon type="logout" onClick={this.props.logout} />,
          ]}>
          <Skeleton loading={this.props.isLoading} avatar active>
            <Card.Meta
              avatar={<Avatar src={LambdaLogo} />}
              title={`Welcome ${this.props.displayName}`}
              description={`${this.state.joke}`}
            />
          </Skeleton>
        </Card>
        <div style={{backgroundColor: 'white'}}>
          <Table
            dataSource={this.props.students}
            style={{marginTop: '30px'}}
            bordered
            loading={this.props.isLoading}
            pagination={false}>
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
            <Table.Column title="Github" dataIndex="github" key="github" />
          </Table>
        </div>
        <Row
          type="flex"
          gutter={24}
          style={{maxWidth: '800px', margin: '30px auto'}}>
          <Col xs={24} md={12}>
            <Card
              hoverable
              style={{width: '100%', marginBottom: '10px'}}
              onClick={() => this.props.history.push('/attendance')}
              cover={<img alt="Attendance Report" src={AttendanceImage} />}>
              <Card.Meta
                title="Attendance Report"
                description={`Please make sure to take attendance every class day at the start of class, including Sprint Challenge days, and for PT "A" week Mondays.`}
              />
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card
              hoverable
              style={{width: '100%'}}
              onClick={() => this.props.history.push('/standup')}
              cover={<img alt="Daily Standup" src={Standup} />}>
              <Card.Meta
                title="Daily Standup"
                description="Please make sure to take attendance every class day at the end of class. Make sure to leave feedback for the instructor."
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({students, auth}) => ({
  students: students.students,
  uid: auth.uid,
  user: auth.user,
  isLoading: students.isLoading,
  displayName: auth.displayName,
});

export default connect(
  mapStateToProps,
  {getStudents, logout},
)(Dashboard);
