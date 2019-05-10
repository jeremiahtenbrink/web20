import React from 'react';

import {addStudent, getStudents, delStudent, editStudent} from '../actions';

import {connect} from 'react-redux';

import {
  PageHeader,
  Table,
  Divider,
  Button,
  Modal,
  Row,
  Col,
  Form,
  Input,
  Select,
  Popconfirm,
} from 'antd';

import {Link} from 'react-router-dom';

class ManageStudents extends React.Component {
  state = {
    modalOpen: false,
    modalId: false,
    student: {
      firstName: '',
      lastName: '',
      github: '',
    },
  };

  addHandler = e => {
    e.preventDefault();
    this.props.addStudent({
      student: this.state.student,
      id: this.props.uid,
    });
    this.setState({
      modalOpen: false,
      modalId: false,
      student: {
        firstName: '',
        lastName: '',
        github: '',
      },
    });
  };

  updateStudent = ({id, firstName, lastName, github}) => {
    this.setState({
      modalOpen: true,
      modalId: id,
      student: {
        firstName,
        lastName,
        github,
      },
    });
  };

  updateStudentSubmit = () => {
    this.props.editStudent(
      {...this.state.student, id: this.state.modalId},
      this.props.uid,
    );
    this.setState({
      modalOpen: false,
      modalId: false,
      student: {
        firstName: '',
        lastName: '',
        github: '',
      },
    });
  };

  inputHandler = e => {
    this.setState({
      student: {
        ...this.state.student,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <div style={{maxWidth: '800px', margin: '30px auto'}}>
        <PageHeader
          onBack={() => this.props.history.push('/')}
          title="Manage Students"
          subTitle="Add and Remove Students"
          extra={[
            <Button
              key="1"
              type="primary"
              icon="user"
              loading={this.state.modalOpen}
              onClick={() => this.setState({modalOpen: true})}>
              New Student
            </Button>,
          ]}
        />
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
            <Table.Column
              title="Action"
              key="action"
              render={student => (
                <span>
                  <Button
                    type="primary"
                    onClick={() => this.updateStudent(student)}>
                    Edit
                  </Button>
                  <Divider type="vertical" />
                  <Popconfirm
                    title="Are you sure delete this user?"
                    onConfirm={() =>
                      this.props.delStudent(student.id, this.props.uid)
                    }
                    okText="Yes"
                    okButtonProps={{type: 'danger'}}
                    cancelText="No">
                    <Button type="danger">Delete</Button>
                  </Popconfirm>
                </span>
              )}
            />
          </Table>
        </div>
        <Modal
          title={this.state.modalId ? `Update Student` : 'Create a new student'}
          visible={this.state.modalOpen}
          okText={this.state.modalId ? 'Update Student' : 'Add Student'}
          onOk={this.state.modalId ? this.updateStudentSubmit : this.addHandler}
          onCancel={() => this.setState({modalOpen: false, modalId: false})}>
          <Row type="flex" gutter={24}>
            <Col xs={24} md={12}>
              <h3>
                <span style={{color: '#f5222d'}}>*</span> First Name
              </h3>
              <Form.Item>
                <Input
                  style={{width: '100%'}}
                  value={this.state.student.firstName}
                  onChange={this.inputHandler}
                  name="firstName"
                  required
                />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <h3>
                <span style={{color: '#f5222d'}}>*</span> Last Name
              </h3>
              <Form.Item>
                <Input
                  style={{width: '100%'}}
                  value={this.state.student.lastName}
                  onChange={this.inputHandler}
                  name="lastName"
                  required
                />
              </Form.Item>
            </Col>
            <Col xs={24}>
              <h3>Github</h3>
              <Input
                style={{width: '100%'}}
                value={this.state.student.github}
                onChange={this.inputHandler}
                name="github"
              />
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = ({students, auth}) => ({
  isLoading: students.isLoading,
  uid: auth.uid,
  students: students.students,
  isAdding: students.isAdding,
});

export default connect(
  mapStateToProps,
  {addStudent, editStudent, getStudents, delStudent},
)(ManageStudents);
