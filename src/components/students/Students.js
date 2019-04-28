import React from "react";
import Student from "./Student";
import PropTypes from "prop-types";
import { Table } from "reactstrap";

const Students = props => {
  return (
    <>
      <h3>My Students</h3>
      <Table bordered>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Github</th>
          </tr>
        </thead>
        <tbody>
          {props.students &&
            Object.values(props.students).map((student, index) => {
              return (
                <Student
                  key={student.id}
                  student={student}
                  index={index}
                  removeStudent={props.removeStudent}
                />
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default Students;
