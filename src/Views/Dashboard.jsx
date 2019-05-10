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
import LambdaLogo from '../assets/logo.png';
import {Link} from 'react-router-dom';

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
      </div>
    );
  }
}

const mapStateToProps = ({students, auth}) => ({
  students: students.students,
  uid: auth.uid,
  user: auth.user,
  isLoading: students.isLoading,
  displayName: auth.displayName
});

export default connect(
  mapStateToProps,
  {getStudents, logout},
)(Dashboard);
