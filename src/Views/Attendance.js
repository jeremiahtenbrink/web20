import React from "react";
import PropTypes from "prop-types";
import AttendanceReport from "../oldcomponents/attendanceReport/AttendanceReport";

const Attendance = props => {
  return (
    <div>
      <AttendanceReport />
    </div>
  );
};

Attendance.propTypes = {};

export default Attendance;
