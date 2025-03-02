import Job from "./Job";
import Wrapper from "../assets/wrappers/JobsContainer";

import { useAllJobsContext } from "../pages/AllJobs";

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

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>Gösterilecek iş yok...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
    </Wrapper>
  );
};

export default JobsContainer;
