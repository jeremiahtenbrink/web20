import React from "react";
import PropTypes from "prop-types";
import { Button, ButtonGroup } from "reactstrap";

const AttendanceStudent = ({ student, present, onChange }) => {
  return (
    <tr key={student.id}>
      <td>
        {student.firstName} {student.lastName}
      </td>
      <td>
        <ButtonGroup>
          <Button
            color="primary"
            onClick={() => onChange(student.id)}
            outline
            active={present}
          >
            Present
          </Button>
          <Button
            color="warning"
            onClick={() => onChange(student.id)}
            outline
            active={!present}
          >
            Absent
          </Button>
        </ButtonGroup>
      </td>
    </tr>
  );
};

AttendanceStudent.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  id: PropTypes.string,
  onChange: PropTypes.func,
  present: PropTypes.bool
};

export default AttendanceStudent;
