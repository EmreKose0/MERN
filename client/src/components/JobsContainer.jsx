import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";

import { useAllJobsContext } from "../pages/AllJobs";
import PageBtnContainer from "./PageBtnContainer";

const JobsContainer = () => {
  const { data } = useAllJobsContext();

  // data tanımlı mı diye kontrol edelim
  if (!data || !data.job) {
    return (
      <Wrapper>
        <h2>No Job...</h2>
      </Wrapper>
    );
  }

  // Burada jobs yerine job kullanıyoruz
  const jobs = data.job;

  const { totalJobs, numOfPages } = data;
  console.log(totalJobs);
  console.log(numOfPages);

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} jobs {jobs.length > 1 && ""} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};

export default JobsContainer;
