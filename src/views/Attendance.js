import React from "react";
import PropTypes from "prop-types";
import AttendanceReport from "../components/attendance/AttendanceReport";

const Attendance = props => {
  return (
    <div>
      <AttendanceReport />
    </div>
  );
};

Attendance.propTypes = {};

export default Attendance;
