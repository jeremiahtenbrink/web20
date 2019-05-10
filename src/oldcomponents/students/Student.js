import React from 'react';
import PropTypes from 'prop-types';
import './student.scss';
import {Link} from 'react-router-dom';

import {Button} from 'reactstrap';

const Student = ({student, index}) => {
  return (
    <tr key={student.id} className="align-middle">
      <th scope="row" className="align-middle">{index + 1}</th>
      <td className="align-middle">
        {student.firstName} {student.lastName}
      </td>
      <td className="align-middle">
        <a href={`https://github.com/${student.github}`} target="_blank">
          {student.github}
        </a>
      </td>
      <td>
        <Link to={`/student/${student.id}`}>
          <Button color="primary" outline size="sm">
            Manage
          </Button>
        </Link>
      </td>
    </tr>
  );
};

Student.propTypes = {
  id: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  removeStudent: PropTypes.func,
  github: PropTypes.string,
};

export default Student;
