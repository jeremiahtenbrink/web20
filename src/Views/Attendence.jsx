import React from 'react';
import {connect} from 'react-redux';

import {Row, Col, Button, Table, Card, Icon, Radio} from 'antd';

import MakeInput from '../Components/MakeInput';

import moment from 'moment';

class Attendence extends React.Component {
  state = {
    notes: '',
    isSubmitting: false,
  };

  onChange = id => {
    this.setState(state => {
      let student = {...state.students[id]};
      student.isPresent = !state.students[id].isPresent;
      state.students[id] = student;
      return {students: {...state.students}};
    });
  };

  openWindow = () => {
    this.setState({isSubmitting: true});
    let url = `https://airtable.com/shrEawWXvMldYbm5Q?`;
    url += `prefill_Project+Manager=${this.props.user.firstName.trim()}+${this.props.user.lastName.trim()}+(${this.props.user.cohort})`;
    url += `&prefill_Section=WEB20`
    url += `&prefill_Present+Students=`
    // if (this.state.students) {
    //   let keys = Object.keys(this.state.students);
    //   let notPresentString = '&prefill_Absent+Students=';
    //   if (keys.length > 0) {
    //     let afterFirstIsPresent = false;
    //     let afterFirstNotPresent = false;
    //     for (let i = 0; i < keys.length; i++) {
    //       if (this.state.students[keys[i]].isPresent) {
    //         if (afterFirstIsPresent) {
    //           url += ',';
    //         }
    //         url += `${this.state.students[
    //           keys[i]
    //         ].firstName.trim()}+${this.state.students[
    //           keys[i]
    //         ].lastName.trim()}`;
    //         if (!afterFirstIsPresent) {
    //           afterFirstIsPresent = true;
    //         }
    //       } else {
    //         if (afterFirstNotPresent) {
    //           notPresentString += ',';
    //         }
    //         notPresentString += `${this.state.students[
    //           keys[i]
    //         ].firstName.trim()}+${this.state.students[
    //           keys[i]
    //         ].lastName.trim()}`;
    //         if (!afterFirstNotPresent) {
    //           afterFirstNotPresent = true;
    //         }
    //       }
    //     }

    //     if (notPresentString !== '&prefill_Absent+Students=') {
    //       url += notPresentString;
    //     }
    //   }
    // }
    url += `&prefill_Date=${moment().format('MM/DD/YYYY')}`;
    if (this.state.notes !== '') {
      let notes = encodeURI(this.state.notes);
      url += `&prefill_Notes=${notes}`;
    }
    window.open(url);
  };

  render() {
    return (
      <div style={{maxWidth: '600px', margin: '20px auto'}}>
        <Card
          title="Attendance Report"
          actions={[
            <Icon
              type="arrow-left"
              onClick={() => this.props.history.push('/')}
            />,
          ]}>
          <p>
            Thank you for taking the time to report attendance for your team.
            Please link both students in attendance, and students who are
            missing today.
          </p>
          <p>
            Please make sure to take attendance every class day at the start of
            class, including Sprint Challenge days, and for PT "A" week Mondays
          </p>
        </Card>
        <div style={{backgroundColor: 'white'}}>
          <Table
            dataSource={this.props.students}
            style={{marginTop: '30px'}}
            bordered
            loading={this.props.loadingStudents}
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
            <Table.Column
              title="Attendence"
              key="action"
              render={() => (
                <span>
                  <Radio.Group defaultValue="present">
                    <Radio.Button value="present">Present</Radio.Button>
                    <Radio.Button value="absent">Absent</Radio.Button>
                  </Radio.Group>
                </span>
              )}
            />
          </Table>
        </div>
        <Row gutter={24}>
          <MakeInput
            type='disabled'
            title="Name"
            required
            value={this.state.fullName}
          />
          <MakeInput
            type='disabled'
            title="Section"
            required
            value={this.state.fullName}
          />
          <MakeInput
            type="disabled"
            title="Date"
            value={moment().format('MM/DD/YYYY')}
            name="notes"
          />
          <MakeInput
            type="textarea"
            title="Notes"
            value={this.state.notes}
            name="notes"
            onChange={e => this.setState({[e.target.name]: e.target.value})}
          />
          <Col xs={24} style={{margin: '20px 0', textAlign: 'center'}}>
            <Button
              type="primary"
              onClick={this.openWindow}
              size="large"
              icon="link"
              loading={this.state.isSubmitting}>
              Submit
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({students, auth}) => ({
  authLoading: auth.isLoading,
  loadingStudents: students.isLoading,
  students: students.students,
  uid: auth.uid,
  user: auth.user,
});

export default connect(
  mapStateToProps,
  {},
)(Attendence);
