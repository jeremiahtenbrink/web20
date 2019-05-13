import React from "react";
import PropTypes from "prop-types";
import Input from "reactstrap/es/Input";

class StudentInfo extends React.Component {
  constructor(props) {
    
    super(props);
    let students = props.students;
    if (props.students.length === 0) {
      students = JSON.parse(localStorage.getItem("web20_students"));
    }
    students = students.filter(student => {
      return student.id === props.match.params.id;
    });

    this.state = {
      student: students[0]
    };
  }

  onChange = e => {
    this.setState(state => {
      let student = {
        ...state.student,
        [e.target.name]: e.target.value
      };
      return { student };
    });
  };

  render() {
    const { firstName, lastName, github } = this.state.student;
    return (
      <div>
        <h5>
          <Input
            name={"firstName"}
            value={firstName}
            placeHolder={"First Name..."}
          />
        </h5>
        <h5>
          <Input
            name={"lastName"}
            value={lastName}
            placeHolder={"Last Name..."}
          />
        </h5>
        <h5>
          <Input name={"github"} value={github} placeHolder={"Github Url..."} />
        </h5>
      </div>
    );
  }
}

StudentInfo.propTypes = {
  students: PropTypes.arrayOf({
    id: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string
  })
};

export default StudentInfo;
