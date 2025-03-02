import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from "react-icons/fa";
import { Link, Form } from "react-router-dom";
import Wrapper from "../assets/wrappers/Job";
import JobInfo from "./JobInfo";
import day from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import React from "react";
day.extend(advancedFormat);

const job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  jobStatus,
}) => {
  const date = day(createdAt).format("MMM Do, YYYY");
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content-center">
        <JobInfo icon={<FaLocationArrow />} text={jobLocation}></JobInfo>
        <JobInfo icon={<FaCalendarAlt />} text={date}></JobInfo>
        <JobInfo icon={<FaBriefcase />} text={jobType}></JobInfo>
        <div className={`status ${jobStatus}`}>{jobStatus}</div>
      </div>
      <footer className="actions">
        <Link to={`/dashboard/edit-job/${_id}`} className="btn edit-btn">
          Edit
        </Link>
        <Form method="post" action={`/dashboard/delete-job/${_id}`}>
          <button type="submit" className="btn delete-btn">
            Delete
          </button>
        </Form>
      </footer>
    </Wrapper>
  );
};

export default job;
